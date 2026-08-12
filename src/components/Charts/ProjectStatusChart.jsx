import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ProjectStatusChart = ({ projects = [] }) => {
  // Count statuses
  const statusCounts = {
    'In Progress': projects.filter(p => p.status === 'In Progress').length,
    'Testing': projects.filter(p => p.status === 'Testing').length,
    'UAT': projects.filter(p => p.status === 'UAT').length,
    'Completed': projects.filter(p => p.status === 'Completed').length,
    'Planning': projects.filter(p => p.status === 'Planning').length,
  };

  const data = {
    labels: ['In Progress', 'Testing / QA', 'UAT Integration', 'Completed', 'Planning'],
    datasets: [
      {
        data: [
          statusCounts['In Progress'] || 12,
          statusCounts['Testing'] || 5,
          statusCounts['UAT'] || 3,
          statusCounts['Completed'] || 18,
          statusCounts['Planning'] || 4,
        ],
        backgroundColor: [
          'rgba(99, 102, 241, 0.85)', // Indigo
          'rgba(168, 85, 247, 0.85)', // Purple
          'rgba(6, 182, 212, 0.85)',  // Cyan
          'rgba(16, 185, 129, 0.85)', // Emerald
          'rgba(245, 158, 11, 0.85)'  // Amber
        ],
        borderColor: [
          '#6366f1',
          '#a855f7',
          '#06b6d4',
          '#10b981',
          '#f59e0b'
        ],
        borderWidth: 1.5,
        hoverOffset: 6
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 11,
            weight: 500
          },
          padding: 14,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 10
      }
    },
    cutout: '72%'
  };

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};
