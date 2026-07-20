import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0 to 23

// Generate mock data for a 7x24 grid
const generateData = () => {
  const data = {};
  DAYS.forEach(day => {
    data[day] = {};
    HOURS.forEach(hour => {
      // Weekdays business hours (9-17) have higher intensity
      let baseIntensity = 0;
      if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day)) {
        if (hour >= 9 && hour <= 17) {
          baseIntensity = Math.floor(Math.random() * 60) + 40; // 40-100
        } else {
          baseIntensity = Math.floor(Math.random() * 30); // 0-30
        }
      } else {
        baseIntensity = Math.floor(Math.random() * 20); // 0-20
      }
      data[day][hour] = baseIntensity;
    });
  });
  return data;
};

const HEATMAP_DATA = generateData();

const getIntensityColor = (value) => {
  if (value === 0) return 'var(--color-surface)';
  if (value < 20) return 'rgba(99, 102, 241, 0.2)'; // Lightest primary
  if (value < 50) return 'rgba(99, 102, 241, 0.5)';
  if (value < 80) return 'rgba(99, 102, 241, 0.8)';
  return 'var(--color-primary)'; // Darkest primary
};

const ActivityHeatmapWidget = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarDays size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Activity Heatmap</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>System engagement intensity over a typical week.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Y-axis Labels (Days) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '20px' }}>
            {DAYS.map(day => (
              <div key={day} style={{ height: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px', width: '30px' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Grid Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* X-axis Labels (Hours - every 3 hours) */}
            <div style={{ display: 'flex', gap: '4px', height: '16px', marginBottom: '4px' }}>
              {HOURS.map(hour => (
                <div key={hour} style={{ width: '16px', fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'center' }}>
                  {hour % 3 === 0 ? hour : ''}
                </div>
              ))}
            </div>

            {/* Cells */}
            {DAYS.map(day => (
              <div key={day} style={{ display: 'flex', gap: '4px' }}>
                {HOURS.map(hour => {
                  const value = HEATMAP_DATA[day][hour];
                  const isHovered = hoveredCell && hoveredCell.day === day && hoveredCell.hour === hour;

                  return (
                    <div 
                      key={`${day}-${hour}`}
                      onMouseEnter={() => setHoveredCell({ day, hour, value })}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '4px', 
                        backgroundColor: getIntensityColor(value),
                        cursor: 'pointer',
                        border: isHovered ? '1px solid var(--color-text-main)' : '1px solid transparent',
                        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                        transition: 'all 0.1s',
                        zIndex: isHovered ? 10 : 1,
                        position: 'relative'
                      }}
                    >
                      {isHovered && (
                        <div style={{ 
                          position: 'absolute', 
                          bottom: '100%', 
                          left: '50%', 
                          transform: 'translateX(-50%)', 
                          marginBottom: '8px',
                          backgroundColor: 'white',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          padding: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          width: '160px',
                          zIndex: 20,
                          pointerEvents: 'none'
                        }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px' }}>
                            {day}, {formatHour(hour)}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Active Users</span>
                            <span style={{ fontWeight: 800, color: 'var(--color-text-main)' }}>{value * 42}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Requests</span>
                            <span style={{ fontWeight: 800, color: 'var(--color-text-main)' }}>{(value * 12.5).toFixed(0)}k</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Avg Duration</span>
                            <span style={{ fontWeight: 800, color: 'var(--color-text-main)' }}>{(value * 0.4).toFixed(1)}m</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Less</span>
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: getIntensityColor(0) }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: getIntensityColor(15) }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: getIntensityColor(40) }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: getIntensityColor(70) }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: getIntensityColor(100) }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)' }}>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmapWidget;
