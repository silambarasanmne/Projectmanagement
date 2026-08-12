import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, Download, Printer, FileText, CheckCircle2, Building, Layers } from 'lucide-react';

export const ReportsPage = () => {
  const { projects, tasks, applications, releases, addToast } = useApp();
  const [reportType, setReportType] = useState('project');

  // CSV Export Generator
  const handleExportCSV = () => {
    let headers = [];
    let rows = [];

    if (reportType === 'project') {
      headers = ['ID', 'Project Name', 'Company', 'Type', 'Manager', 'Status', 'Progress (%)', 'Deadline'];
      rows = projects.map(p => [p.id, `"${p.name}"`, `"${p.companyName}"`, p.type, `"${p.manager}"`, p.status, `${p.progress}%`, p.deadline]);
    } else if (reportType === 'application') {
      headers = ['ID', 'App Name', 'Platform', 'Version', 'Developer', 'Status'];
      rows = applications.map(a => [a.id, `"${a.name}"`, a.platform, a.version, `"${a.developer}"`, a.status]);
    } else {
      headers = ['ID', 'Release App', 'Version', 'Build', 'Platform', 'Date', 'Status'];
      rows = releases.map(r => [r.id, `"${r.appName}"`, r.version, r.buildNumber, r.platform, r.releaseDate, r.status]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Group_${reportType}_report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('success', 'Report Exported', `CSV spreadsheet generated for ${reportType} report.`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 print:p-0">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Executive Audit & Analytics</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Reports & Export Hub</h1>
          <p className="text-xs text-slate-400 mt-1">Export comprehensive reports in PDF, CSV, Excel spreadsheet, or print view.</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV / Excel</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-all"
          >
            <Printer className="w-4 h-4 text-indigo-400" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {/* Report Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs print:hidden">
        {[
          { id: 'project', label: 'Projects Audit Report', icon: FileText },
          { id: 'application', label: 'Application Catalog Report', icon: Layers },
          { id: 'release', label: 'APK Release Deployments Report', icon: CheckCircle2 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
                reportType === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'glass-panel text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Formatted Printable Report Card */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 print:bg-white print:text-slate-900 print:border-none">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-white print:text-slate-900 uppercase">
              Nexus Group — {reportType.toUpperCase()} PERFORMANCE REPORT
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600">Generated on {new Date().toLocaleDateString()}</p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-400 print:text-indigo-600">CONFIDENTIAL</span>
        </div>

        {/* Dynamic Table Preview */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 print:bg-slate-100 border-b border-slate-800 text-slate-400 print:text-slate-700 uppercase text-[10px] font-bold">
              {reportType === 'project' && (
                <tr>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Manager</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Progress</th>
                </tr>
              )}

              {reportType === 'application' && (
                <tr>
                  <th className="py-3 px-4">App Name</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Lead Developer</th>
                </tr>
              )}

              {reportType === 'release' && (
                <tr>
                  <th className="py-3 px-4">Release App</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Build</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
              {reportType === 'project' && projects.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 px-4 font-bold text-white print:text-slate-900">{p.name}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{p.companyName}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{p.type}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{p.manager}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{p.status}</td>
                  <td className="py-3 px-4 font-bold text-indigo-400 print:text-indigo-700">{p.progress}%</td>
                </tr>
              ))}

              {reportType === 'application' && applications.map((a) => (
                <tr key={a.id}>
                  <td className="py-3 px-4 font-bold text-white print:text-slate-900">{a.name}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{a.companyName}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{a.platform}</td>
                  <td className="py-3 px-4 font-mono font-bold text-indigo-400 print:text-indigo-700">{a.version}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{a.developer}</td>
                </tr>
              ))}

              {reportType === 'release' && releases.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 px-4 font-bold text-white print:text-slate-900">{r.appName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-violet-400 print:text-violet-700">{r.version}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">#{r.buildNumber}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{r.platform}</td>
                  <td className="py-3 px-4 text-slate-300 print:text-slate-700">{r.releaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
