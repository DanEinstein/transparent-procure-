import { useState, useEffect } from 'react';

export default function Reports() {
    const [blacklisted, setBlacklisted] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the contractors that your reputation.py just scored
        fetch(`${import.meta.env.VITE_API_BASE_URL}/contractors`)
            .then(res => res.json())
            .then(data => {
                // Filter only the contractors that failed the trust score (e.g., score < 50)
                const highRisk = data.filter(c => c.trust_score < 80 || c.risk_level?.includes("High"));
                setBlacklisted(highRisk);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blacklisted records:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-background-dark text-slate-200">
            {/* Page Title Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Blacklisted Contractors Summary</h1>
                    <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Identity Control Module — Active Suspensions based on Civic Feed & Audit Alerts</p>
                </div>
                <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-lg">
                    <span className="material-symbols-outlined text-xl">download</span>
                    <span>Export PDF Report</span>
                </button>
            </div>

            {/* KPI Cards (Now Dynamic) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-dark border border-slate-800 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                            <span className="material-symbols-outlined">group_remove</span>
                        </div>
                    </div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Suspensions</p>
                    <p className="text-4xl font-black mt-1 text-white">{blacklisted.length}</p>
                </div>
                <div className="bg-surface-dark border border-slate-800 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                    </div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Average Trust Score</p>
                    <p className="text-4xl font-black mt-1 text-white">
                        {blacklisted.length > 0 ? (blacklisted.reduce((acc, c) => acc + (c.trust_score || 0), 0) / blacklisted.length).toFixed(0) : 0} / 100
                    </p>
                </div>
                <div className="bg-surface-dark border border-slate-800 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">policy</span>
                        </div>
                    </div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Enforcement Status</p>
                    <p className="text-4xl font-black mt-1 text-white">Active</p>
                </div>
            </div>

            {/* Detailed Suspension Records */}
            <div className="bg-surface-dark border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Detailed Suspension Records</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 border-b border-slate-800">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Contractor Name</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">KRA PIN</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Trust Score</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {blacklisted.length > 0 ? (
                                blacklisted.map((contractor, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">{contractor.name || contractor.title || "Unknown Entity"}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">ID: {contractor.id}</div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-sm text-slate-300">
                                            {contractor.kra_pin || "PENDING"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-rose-500 font-black text-lg">{contractor.trust_score}</span>
                                            <span className="text-xs text-slate-500">/100</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded border bg-rose-500/10 text-rose-500 border-rose-500/20 text-[9px] font-black uppercase tracking-widest animate-pulse">
                                                {contractor.risk_level || "Blacklisted"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-slate-500 text-sm font-bold">
                                        No contractors currently meet the blacklist criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}