import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, AlertCircle, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useOrgStore } from '../../store/orgStore';
import { useUIStore } from '../../store/uiStore';

const REQUIRED_FIELDS = [
  { key: 'name', label: 'Employee Name' },
  { key: 'email', label: 'Email Address' }
];

const OPTIONAL_FIELDS = [
  { key: 'designation', label: 'Designation' },
  { key: 'department', label: 'Department' },
  { key: 'managerId', label: 'Manager ID / Reporting Manager' },
  { key: 'phone', label: 'Phone' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
];

const ExcelImportModal = ({ isOpen, onClose }) => {
  const { importFromExcel } = useOrgStore();
  const { addToast } = useUIStore();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Upload, 2: Mapping & Preview, 3: Success
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [rawRows, setRawRows] = useState([]);
  const [mappings, setMappings] = useState({});
  const [parsedData, setParsedData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert to array of arrays (including empty cells)
        const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
        const rows = [];
        for (let r = range.s.r; r <= range.e.r; r++) {
          const row = [];
          for (let c = range.s.c; c <= range.e.c; c++) {
            const cellRef = XLSX.utils.encode_cell({ r, c });
            const cell = sheet[cellRef];
            row.push(cell ? cell.v : '');
          }
          rows.push(row);
        }

        if (rows.length < 2) {
          addToast('The file must contain at least a header row and one data row.', 'error');
          return;
        }

        const fileHeaders = rows[0].map(h => String(h || '').trim()).filter(Boolean);
        if (fileHeaders.length === 0) {
          addToast('Could not find any headers in the first row.', 'error');
          return;
        }

        setFile(selectedFile);
        setHeaders(fileHeaders);
        // Exclude header row from raw data rows
        setRawRows(rows.slice(1));
        
        // Try auto-mapping based on name matches
        const autoMappings = {};
        const allFields = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];
        fileHeaders.forEach(header => {
          const hLower = header.toLowerCase();
          allFields.forEach(field => {
            const fLower = field.label.toLowerCase();
            const keyLower = field.key.toLowerCase();
            if (hLower.includes(fLower) || hLower.includes(keyLower) || fLower.includes(hLower)) {
              autoMappings[field.key] = header;
            }
          });
        });
        setMappings(autoMappings);
        setStep(2);
      } catch (err) {
        console.error(err);
        addToast('Failed to parse Excel file. Ensure it is a valid format.', 'error');
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleMappingChange = (fieldKey, headerValue) => {
    setMappings(prev => ({
      ...prev,
      [fieldKey]: headerValue
    }));
  };

  const handleValidate = () => {
    // Check required mappings
    const missingRequired = REQUIRED_FIELDS.filter(f => !mappings[f.key]);
    if (missingRequired.length > 0) {
      addToast(`Please map all required fields: ${missingRequired.map(f => f.label).join(', ')}`, 'error');
      return;
    }

    const headerIndexes = {};
    headers.forEach((h, idx) => {
      headerIndexes[h] = idx;
    });

    const parsed = [];
    const validationErrors = [];

    rawRows.forEach((row, rowIdx) => {
      const item = {};
      const rowErrors = [];

      // Extract required fields
      REQUIRED_FIELDS.forEach(f => {
        const header = mappings[f.key];
        const val = row[headerIndexes[header]];
        if (!val || String(val).trim() === '') {
          rowErrors.push(`Row ${rowIdx + 2}: ${f.label} is required.`);
        }
        item[f.key] = val ? String(val).trim() : '';
      });

      // Extract optional fields
      OPTIONAL_FIELDS.forEach(f => {
        const header = mappings[f.key];
        if (header) {
          const val = row[headerIndexes[header]];
          item[f.key] = val ? String(val).trim() : '';
        } else {
          item[f.key] = '';
        }
      });

      if (rowErrors.length > 0) {
        validationErrors.push(...rowErrors);
      }
      parsed.push(item);
    });

    setParsedData(parsed);
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      addToast('Import data contains validation errors. Please check the highlights.', 'warning');
    }
  };

  const handleImport = async () => {
    if (parsedData.length === 0) {
      handleValidate();
    }
    if (errors.length > 0) {
      addToast('Cannot import data containing validation errors.', 'error');
      return;
    }

    setIsImporting(true);
    try {
      await importFromExcel(parsedData);
      setImportResult({
        total: parsedData.length,
        imported: parsedData.length
      });
      setStep(3);
      addToast('Organization import completed successfully.', 'success');
    } catch (err) {
      addToast(err.message || 'Import failed. Check console.', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFile(null);
    setHeaders([]);
    setRawRows([]);
    setMappings({});
    setParsedData([]);
    setErrors([]);
    setImportResult(null);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <motion.div 
          className="modal-content card"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          style={{ width: 800, padding: 0, overflow: 'hidden' }}
        >
          <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <FileSpreadsheet size={24} color="var(--color-success)" />
              Import Organization Data
            </h2>
            <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}><X size={20} /></button>
          </div>

          <div style={{ padding: '32px', maxHeight: '70vh', overflowY: 'auto' }}>
            {step === 1 && (
              <div 
                style={{
                  border: '2px dashed var(--color-border)', borderRadius: 12, padding: '48px 24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                  backgroundColor: 'var(--color-surface-alt)'
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files[0]) {
                    processFile(e.dataTransfer.files[0]);
                  }
                }}
              >
                <Upload size={48} color="var(--color-text-muted)" style={{ marginBottom: 16 }} />
                <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 8 }}>
                  Drag & Drop Excel or CSV file
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 24 }}>
                  Supports .xlsx, .xls, .csv formats
                </p>
                <button type="button" className="btn-primary">Browse Files</button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".xlsx,.xls,.csv" 
                  style={{ display: 'none' }} 
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 16 }}>Map Excel Columns to Org Fields</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                  {REQUIRED_FIELDS.map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 8 }}>
                        {f.label} <span style={{ color: 'var(--color-danger)' }}>*</span>
                      </label>
                      <select 
                        className="input-field" 
                        value={mappings[f.key] || ''} 
                        onChange={(e) => handleMappingChange(f.key, e.target.value)}
                        required
                      >
                        <option value="">-- Select Header --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  ))}
                  {OPTIONAL_FIELDS.map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 8 }}>
                        {f.label}
                      </label>
                      <select 
                        className="input-field" 
                        value={mappings[f.key] || ''} 
                        onChange={(e) => handleMappingChange(f.key, e.target.value)}
                      >
                        <option value="">-- Select Header (Optional) --</option>
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <button type="button" className="btn-secondary" onClick={handleValidate}>Validate Data</button>
                </div>

                {errors.length > 0 && (
                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid var(--color-danger)', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-danger)', fontWeight: 600, marginBottom: 8 }}>
                      <AlertCircle size={18} />
                      Validation Errors Found
                    </div>
                    <ul style={{ paddingLeft: 20, margin: 0, fontSize: '0.8rem', color: 'var(--color-danger)' }}>
                      {errors.slice(0, 5).map((err, i) => <li key={i}>{err}</li>)}
                      {errors.length > 5 && <li>...and {errors.length - 5} more errors.</li>}
                    </ul>
                  </div>
                )}

                {rawRows.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 12 }}>Preview (First 5 Rows)</h4>
                    <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 8 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                          <tr style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                            {headers.map((h, i) => (
                              <th key={i} style={{ borderBottom: '1px solid var(--color-border)', padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rawRows.slice(0, 5).map((row, rowIdx) => (
                            <tr key={rowIdx}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{ borderBottom: '1px solid var(--color-border)', padding: '10px 16px' }}>{String(cell || '')}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && importResult && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', marginBottom: 20 }}>
                  <Check size={36} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 8 }}>Import Complete!</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24, textAlign: 'center' }}>
                  Successfully imported or updated {importResult.imported} employees into the database.
                </p>
                <div style={{ width: '100%', maxWidth: 300, border: '1px solid var(--color-border)', borderRadius: 8, padding: 16, backgroundColor: 'var(--color-surface-alt)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                    <span>Total Rows Processed</span>
                    <span style={{ fontWeight: 600 }}>{importResult.total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>Successful Upserts</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{importResult.imported}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '24px 32px', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {step === 2 && (
              <button type="button" className="btn-secondary" onClick={handleReset}>Back</button>
            )}
            <button type="button" onClick={onClose} className="btn-secondary">Close</button>
            {step === 2 && (
              <button 
                type="button" 
                className="btn-primary" 
                onClick={handleImport}
                disabled={isImporting}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                {isImporting ? 'Importing...' : 'Start Import'}
              </button>
            )}
            {step === 3 && (
              <button type="button" className="btn-primary" onClick={handleReset}>Import Another File</button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExcelImportModal;
