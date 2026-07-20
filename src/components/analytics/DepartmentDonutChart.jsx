import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Users, ChevronRight } from 'lucide-react';

const DEPT_DATA = [
  { name: 'Engineering', value: 32, count: 793, color: 'var(--color-primary)' },
  { name: 'Operations', value: 20, count: 495, color: '#3B82F6' },
  { name: 'Sales', value: 18, count: 446, color: 'var(--color-success)' },
  { name: 'Finance', value: 8, count: 198, color: 'var(--color-warning)' },
  { name: 'HR', value: 5, count: 124, color: '#8B5CF6' },
  { name: 'Legal', value: 2, count: 50, color: 'var(--color-text-muted)' },
  { name: 'Other', value: 15, count: 372, color: '#CBD5E1' }
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const DepartmentDonutChart = ({ onDepartmentClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const totalEmployees = DEPT_DATA.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="card" style={{ padding: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>Department Analytics</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>Headcount distribution and growth.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px', gap: '32px' }}>
        
        {/* Donut Chart */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                data={DEPT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={(data, index) => onDepartmentClick && onDepartmentClick(DEPT_DATA[index].name)}
                style={{ cursor: 'pointer' }}
                animationDuration={1000}
              >
                {DEPT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Metric */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Total Emp</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-main)' }}>{totalEmployees.toLocaleString()}</div>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {DEPT_DATA.map((dept, idx) => (
            <div 
              key={idx}
              className="hover-lift"
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => onDepartmentClick && onDepartmentClick(dept.name)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                border: '1px solid',
                borderColor: activeIndex === idx ? dept.color : 'transparent',
                backgroundColor: activeIndex === idx ? `${dept.color}10` : 'var(--color-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: dept.color }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-main)' }}>{dept.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{dept.count} Employees</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-main)' }}>{dept.value}%</span>
                <ChevronRight size={16} color="var(--color-text-muted)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDonutChart;
