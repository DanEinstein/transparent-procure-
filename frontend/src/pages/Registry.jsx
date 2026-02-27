import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { registryAPI } from '../api/apiService';

export default function Registry() {
    const { data: registryData, loading, error } = useApi(() => registryAPI.getContractors());

    // Extract contractors from the response envelope
    const contractors = registryData?.data?.contractors || [];

    // Derive status badge color
    const getStatusClass = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'flagged':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'under_review':
                return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'blacklisted':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Contractor Registry</h2>
                        <p className="text-slate-500 dark:text-slate-400">Official repository of KRA-registered entities. Source: Backend API.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-white transition-all">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4">Contractor Name</th>
                                    <th className="px-6 py-4">KRA PIN</th>
                                    <th className="px-6 py-4">Category / Region</th>
                                    <th className="px-6 py-4">Compliance Score</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-slate-500">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                                Loading records from backend...
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-red-500">
                                            Failed to load data: {error}
                                        </td>
                                    </tr>
                                ) : contractors.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-slate-500">
                                            No contractors found.
                                        </td>
                                    </tr>
                                ) : (
                                    contractors.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                        {item.name?.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{item.name}</p>
                                                        <p className="text-[10px] text-slate-500 mt-1 uppercase">
                                                            Reg: {item.registrationDate ? new Date(item.registrationDate).toLocaleDateString() : 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">{item.kraPin}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.category}</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5">{item.region}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${item.complianceScore < 40 ? 'bg-red-500' : 'bg-primary'}`}
                                                            style={{ width: `${item.complianceScore}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className={`text-xs font-bold ${item.complianceScore < 40 ? 'text-red-500' : 'text-primary'}`}>
                                                        {item.complianceScore}/100
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${getStatusClass(item.status)}`}>
                                                    {item.status?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                                                    <span className="material-symbols-outlined">visibility</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}