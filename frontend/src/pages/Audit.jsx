import { useState } from 'react';
import useApi from '../hooks/useApi';
import { auditAPI } from '../api/apiService';

export default function Audit() {
    const { data: auditsData, loading, error } = useApi(() => auditAPI.getAudits());

    // Extract audits from the response envelope
    const audits = auditsData?.data?.audits || [];

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'in_progress':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'pending':
                return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getTypeClass = (type) => {
        switch (type) {
            case 'routine':
                return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
            case 'special':
                return 'bg-red-500/10 text-red-500';
            case 'compliance':
                return 'bg-primary/10 text-primary';
            default:
                return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm mb-1 font-medium">Total Audits</p>
                    <h3 className="text-2xl font-bold text-white">{audits.length}</h3>
                </div>
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm mb-1 font-medium">In Progress</p>
                    <h3 className="text-2xl font-bold text-blue-500">
                        {audits.filter(a => a.status === 'in_progress').length}
                    </h3>
                </div>
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm mb-1 font-medium">Completed</p>
                    <h3 className="text-2xl font-bold text-emerald-500">
                        {audits.filter(a => a.status === 'completed').length}
                    </h3>
                </div>
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm mb-1 font-medium">Total Findings</p>
                    <h3 className="text-2xl font-bold text-amber-500">
                        {audits.reduce((acc, a) => acc + (a.findings?.length || 0), 0)}
                    </h3>
                </div>
            </div>

            <div className="bg-surface-dark border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900 border-b border-slate-800">
                        <tr className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                            <th className="px-6 py-4">Audit Title</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Period</th>
                            <th className="px-6 py-4">Findings</th>
                            <th className="px-6 py-4 text-right">Assigned To</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-slate-500">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                        Loading audits from backend...
                                    </div>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-red-500">
                                    Failed to load audits: {error}
                                </td>
                            </tr>
                        ) : audits.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-slate-500">
                                    No audits found.
                                </td>
                            </tr>
                        ) : audits.map((audit) => (
                            <tr key={audit.id} className="hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-100 group-hover:text-primary transition-colors">
                                        {audit.title}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                        {audit.description}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border w-max ${getTypeClass(audit.type)}`}>
                                        {audit.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border w-max ${getStatusClass(audit.status)}`}>
                                        {audit.status?.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs text-slate-400">
                                        {audit.startDate ? new Date(audit.startDate).toLocaleDateString() : '—'}
                                    </div>
                                    <div className="text-[10px] text-slate-600">
                                        to {audit.endDate ? new Date(audit.endDate).toLocaleDateString() : '—'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        {audit.findings?.length > 0 ? (
                                            audit.findings.slice(0, 2).map((finding, idx) => (
                                                <p key={idx} className="text-[10px] text-slate-400 line-clamp-1">• {finding}</p>
                                            ))
                                        ) : (
                                            <p className="text-[10px] text-slate-600 italic">None yet</p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-xs text-slate-300">
                                        {Array.isArray(audit.assignedTo) ? audit.assignedTo.join(', ') : audit.assignedTo || '—'}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}