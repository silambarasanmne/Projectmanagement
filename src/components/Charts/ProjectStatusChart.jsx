import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ProjectStatusChart = ({ projects = [] }) => {
  const devCount = projects.filter(p => p.status === 'Development' || p.status === 'In Process').length;
  const testingCount = projects.filter(p => p.status === 'Testing Assigned' || p.status === 'Testing In Progress' || p.status === 'Testing').length;
  const releasePendingCount = projects.filter(p => p.status === 'Release Pending' || p.status === 'Testing Passed' || p.status === 'Testing Completed').length;
  const releasedCount = projects.filter(p => p.status === 'Released' || p.status === 'Production' || p.status === 'Release' || p.status === 'Completed').length;

  const total = devCount + testingCount + releasePendingCount + releasedCount;

  const data = {
    labels: ['Development', 'Testing In Progress', 'Release Pending', 'Released to Production'],
    datasets: [
      {
        data: total > 0 ? [devCount, testingCount, releasePendingCount, releasedCount] : [0, 0, 0, 0],
        backgroundColor: [
          'rgba(99, 102, 241, 0.85)', // Indigo
          'rgba(245, 158, 11, 0.85)', // Amber
          'rgba(20, 184, 166, 0.85)', // Teal
          'rgba(16, 185, 129, 0.85)'  // Emerald
        ],
        borderColor: [
          '#6366f1',
          '#f59e0b',
          '#14b8a6',
          '#10b981'
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
