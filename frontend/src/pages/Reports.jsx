import useApi from '../hooks/useApi';
import { registryAPI } from '../api/apiService';

export default function Reports() {
    const { data: blacklistData, loading, error } = useApi(() => registryAPI.getBlacklistedContractors());

    // Extract blacklisted contractors from the response envelope
    const blacklisted = blacklistData?.data || [];

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {/* Page Title Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Blacklisted Contractors Summary Report</h1>
                    <p className="text-slate-500 dark:text-primary/60 font-medium mt-1">Identity Control Module — Official Kenyan Public Procurement Oversight suspension records</p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-navy-darker font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-primary/10">
                    <span className="material-symbols-outlined text-xl">download</span>
                    <span>Export PDF Report</span>
                </button>
            </div>

            {/* KPI Cards — derived from backend data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-primary/40 text-sm font-semibold uppercase tracking-wider">Total Blacklisted</p>
                    <p className="text-4xl font-black mt-1 dark:text-white">{loading ? '—' : blacklisted.length}</p>
                </div>
                <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">block</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-primary/40 text-sm font-semibold uppercase tracking-wider">Active Suspensions</p>
                    <p className="text-4xl font-black mt-1 dark:text-white">{loading ? '—' : blacklisted.filter(c => c.status === 'blacklisted').length}</p>
                </div>
                <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">verified_user</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-primary/40 text-sm font-semibold uppercase tracking-wider">Data Source</p>
                    <p className="text-lg font-black mt-1 dark:text-white">Live Backend</p>
                </div>
            </div>

            {/* Suspension Records Table */}
            <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-primary/20 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white">Suspension Records</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-primary/10 border-b border-slate-200 dark:border-primary/20">
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Contractor Name</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">KRA PIN</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Compliance Score</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-primary/10">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-slate-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                            Loading from backend...
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-red-500">Failed to load: {error}</td>
                                </tr>
                            ) : blacklisted.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-slate-500">No blacklisted contractors found.</td>
                                </tr>
                            ) : blacklisted.map((contractor) => (
                                <tr key={contractor.id} className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold dark:text-white">{contractor.name}</div>
                                        <div className="text-xs text-slate-500 dark:text-primary/40">{contractor.region}, Kenya</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm dark:text-slate-300">{contractor.kraPin}</td>
                                    <td className="px-6 py-4 text-sm dark:text-slate-300 max-w-xs">
                                        {contractor.blacklistReason || '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-red-500 font-bold text-sm">{contractor.complianceScore}/100</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 uppercase">
                                            Blacklisted
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-slate-50 dark:bg-primary/5 p-6 rounded-xl border border-dashed border-slate-300 dark:border-primary/20">
                <div className="max-w-2xl">
                    <h3 className="font-bold flex items-center gap-2 mb-2 dark:text-white">
                        <span className="material-symbols-outlined text-primary">verified_user</span> Oversight Confirmation
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-primary/60 italic leading-relaxed">
                        Records displayed above are sourced directly from the TransparentProcure backend registry. Contractors listed are strictly prohibited from participating in any public procurement proceedings during their suspension period.
                    </p>
                </div>
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <p className="text-xs uppercase font-bold text-slate-500 dark:text-primary/40 tracking-widest">Last Verified</p>
                    <p className="text-lg font-black text-primary">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </div>
        </div>
    );
}
