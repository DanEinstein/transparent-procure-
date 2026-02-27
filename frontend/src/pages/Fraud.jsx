import useApi from '../hooks/useApi';
import { fraudAPI } from '../api/apiService';

export default function Fraud() {
    const { data: alertsData, loading, error } = useApi(() => fraudAPI.getAlerts());

    // Extract alerts from the response envelope
    const alerts = alertsData?.data?.alerts || [];

    const getSeverityClass = (severity) => {
        switch (severity) {
            case 'high': return 'bg-danger text-white';
            case 'medium': return 'bg-accent-gold text-slate-900';
            default: return 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'resolved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'investigating': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default: return 'bg-red-500/10 text-red-500 border-red-500/20';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Forensic Intelligence Dashboard</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-danger/20 text-danger border border-danger/30">LIVE OVERSIGHT</span>
                </div>
            </div>

            {/* Stats Ribbon — derived from backend data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Alerts</p>
                        <span className="material-symbols-outlined text-primary">search_insights</span>
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">{alerts.length}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">All severity levels</p>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Open Alerts</p>
                        <span className="material-symbols-outlined text-danger">warning</span>
                    </div>
                    <h3 className="text-2xl font-bold text-danger">{alerts.filter(a => a.status === 'open').length}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Require action</p>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Investigating</p>
                        <span className="material-symbols-outlined text-blue-500">manage_search</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-500">{alerts.filter(a => a.status === 'investigating').length}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Active investigations</p>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resolved</p>
                        <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-500">{alerts.filter(a => a.status === 'resolved').length}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Successfully closed</p>
                </div>
            </div>

            {/* Alerts Table */}
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold dark:text-white">Fraud Alerts</h3>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Alert</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Severity</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Affected Tenders</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Detected</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Assigned To</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-slate-500">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                        Loading fraud alerts from backend...
                                    </div>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-red-500">Failed to load alerts: {error}</td>
                            </tr>
                        ) : alerts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-slate-500">No alerts found.</td>
                            </tr>
                        ) : alerts.map((alert) => (
                            <tr key={alert.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                                <td className="px-4 py-4 max-w-xs">
                                    <p className="text-xs font-bold dark:text-white">{alert.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{alert.description}</p>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${getSeverityClass(alert.severity)}`}>
                                        {alert.severity}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getStatusClass(alert.status)}`}>
                                        {alert.status?.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-0.5">
                                        {alert.affectedTenders?.slice(0, 2).map((t, i) => (
                                            <span key={i} className="text-[10px] font-mono text-primary">{t}</span>
                                        ))}
                                        {alert.affectedTenders?.length > 2 && (
                                            <span className="text-[9px] text-slate-500">+{alert.affectedTenders.length - 2} more</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-[10px] text-slate-400">
                                    {alert.detectedAt ? new Date(alert.detectedAt).toLocaleDateString() : '—'}
                                </td>
                                <td className="px-4 py-4 text-[10px] text-slate-400">
                                    {alert.assignedTo || 'Unassigned'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {alerts.length > 0 && (
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] text-slate-500">Showing {alerts.length} alert{alerts.length !== 1 ? 's' : ''}</p>
                    </div>
                )}
            </div>

            {/* Footer Action Bar */}
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold dark:text-white">Forensic Review</p>
                    <p className="text-[10px] text-slate-500">Senior auditors monitoring {alerts.filter(a => a.status !== 'resolved').length} open case{alerts.filter(a => a.status !== 'resolved').length !== 1 ? 's' : ''}.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2.5 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">Save Session</button>
                    <button className="px-6 py-2.5 rounded-lg text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Submit Forensic Case</button>
                </div>
            </div>
        </div>
    );
}
