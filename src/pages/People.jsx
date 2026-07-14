import React from 'react';
import { Users, MoreHorizontal, MessageSquare } from 'lucide-react';
import { PEOPLE_DIRECTORY } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';

const People = () => {
  const columns = [
    { 
      header: 'Employee', 
      field: 'name',
      render: (person) => (
        <div className="flex items-center gap-3">
          <div style={{width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.8rem'}}>
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span style={{fontWeight: 600, color: 'var(--color-text-main)'}}>{person.name}</span>
            <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>{person.id}</span>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      field: 'role',
      render: (person) => <span style={{ fontWeight: 500 }}>{person.role}</span>
    },
    { 
      header: 'Department', 
      field: 'department',
      render: (person) => (
        <span style={{padding: '4px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)'}}>
          {person.department}
        </span>
      )
    },
    { header: 'Location', field: 'location' },
    { 
      header: 'Status', 
      field: 'status',
      render: (person) => (
        <div className="flex items-center gap-2">
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: person.status === 'Online' ? 'var(--color-success)' : person.status === 'Busy' ? 'var(--color-warning)' : 'var(--color-text-muted)'
          }}></span>
          <span style={{fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500}}>{person.status}</span>
        </div>
      )
    },
    {
      header: 'Actions',
      field: 'actions',
      render: (person) => (
        <div className="flex gap-2">
          <button className="icon-btn hover:bg-slate-100" style={{ padding: 6, borderRadius: 6, color: 'var(--color-text-secondary)' }}><MessageSquare size={16} /></button>
          <button className="icon-btn hover:bg-slate-100" style={{ padding: 6, borderRadius: 6, color: 'var(--color-text-secondary)' }}><MoreHorizontal size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: 'var(--space-4)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader 
        title="People Directory" 
        subtitle="Browse and manage 14,205 organization members."
        icon={Users}
      />
      <div style={{ flex: 1, minHeight: 0 }}>
        <DataTable columns={columns} data={PEOPLE_DIRECTORY} />
      </div>
    </div>
  );
};

export default People;
