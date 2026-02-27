import { useState, useEffect } from 'react';

export default function Fraud() {
    const [anomalies, setAnomalies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all tenders and filter for the ones our backend flagged
        fetch(`${import.meta.env.VITE_API_BASE_URL}/tenders`)
            .then(res => res.json())
            .then(data => {
                // DEFENSIVE EXTRACTION: Handles both paginated objects and flat arrays
                const parsedData = Array.isArray(data) ? data : (data?.data || []);

                // Find all projects flagged for High Price Anomalies
                const flaggedTenders = parsedData.filter(t => 
                    t.risk_flag?.includes("Price Anomaly") || 
                    (Number(t.value) / (Number(t.benchmark_value) || 1)) > 1.5
                );
                
                // Sort by the highest variance first
                flaggedTenders.sort((a, b) => {
                    const varA = (Number(a.value) / Number(a.benchmark_value)) || 0;
                    const varB = (Number(b.value) / Number(b.benchmark_value)) || 0;
                    return varB - varA;
                });

                setAnomalies(flaggedTenders);
                setLoading(false);
            })
            .catch(err => {
                console.error("Forensic Sync Error:", err);
                setLoading(false);
            });
    }, []);

    // Dynamic Math for the Stats Ribbon
    const totalFlaggedValue = anomalies.reduce((sum, t) => sum + (Number(t.value) || 0), 0);
    
    let avgVariance = 0;
    if (anomalies.length > 0) {
        const totalVar = anomalies.reduce((sum, t) => {
            const val = Number(t.value) || 0;
            const bench = Number(t.benchmark_value) || 1;
            return sum + ((val / bench - 1) * 100);
        }, 0);
        avgVariance = (totalVar / anomalies.length).toFixed(0);
    }

    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-danger mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-background-dark text-slate-200">
            {/* Header Customization for Fraud Page */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-black tracking-tight text-white">Forensic Intelligence Dashboard</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-danger/20 text-danger border border-danger/30 animate-pulse">LIVE OVERSIGHT</span>
                </div>
            </div>

            {/* Dynamic Stats Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Investigations</p>
                        <span className="material-symbols-outlined text-primary">search_insights</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-white">{anomalies.length}</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Flagged Tenders</p>
                </div>
                
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Flagged Amount</p>
                        <span className="material-symbols-outlined text-danger">payments</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-white">{(totalFlaggedValue / 1000000).toFixed(1)}M</h3>
                        <span className="text-danger text-[10px] font-black uppercase tracking-widest flex items-center">
                            KES
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Awaiting verification</p>
                </div>

                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Price Variance Avg</p>
                        <span className="material-symbols-outlined text-accent-gold">analytics</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-white">+{avgVariance}%</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Above market benchmark</p>
                </div>

                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">High-Risk Entities</p>
                        <span className="material-symbols-outlined text-primary">group_work</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        {/* Counting unique contractors from the anomalies list */}
                        <h3 className="text-3xl font-black text-white">{new Set(anomalies.map(a => a.contractor_id)).size}</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Unique Vendors Flagged</p>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-12 gap-8">
                {/* Dynamic Price Anomaly Intelligence Table */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white">Price Anomaly Ledger</h3>
                        </div>
                    </div>
                    
                    <div className="bg-surface-dark border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 border-b border-slate-800">
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Project Name</th>
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Quoted Price</th>
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Market Avg</th>
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Variance</th>
                                    <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {anomalies.length > 0 ? (
                                    anomalies.map((tender, idx) => {
                                        const val = Number(tender.value) || 0;
                                        const bench = Number(tender.benchmark_value) || 1;
                                        const varianceRaw = ((val / bench - 1) * 100);
                                        const varianceStr = varianceRaw.toFixed(0);
                                        // Capping the visual bar width at 100%
                                        const barWidth = Math.min(varianceRaw, 100);

                                        return (
                                            <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-4 py-4">
                                                    <p className="text-xs font-bold text-white">{tender.title || tender.name}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">REF: {tender.id}</p>
                                                </td>
                                                <td className="px-4 py-4 text-xs font-mono font-bold text-slate-300">
                                                    {(val / 1000000).toFixed(1)}M
                                                </td>
                                                <td className="px-4 py-4 text-xs font-mono text-slate-500">
                                                    {(bench / 1000000).toFixed(1)}M
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-black text-danger">+{varianceStr}%</span>
                                                        <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-danger" style={{ width: `${barWidth}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest bg-danger/10 text-danger border border-danger/20">
                                                        CRITICAL
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-12 text-slate-500 text-sm font-bold">
                                            No price anomalies detected in the current procurement cycle.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bid Rigging Graph Sidebar (Remains Static for UI showcase) */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Bid Rigging Network</h3>
                    </div>
                    <div className="bg-surface-dark border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[520px]">
                        {/* Graph Visualization Canvas */}
                        <div className="flex-1 relative bg-[#0a0f1a] overflow-hidden group">
                            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1152d4 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
                            <svg className="w-full h-full absolute inset-0">
                                <line stroke="#ef4444" strokeDasharray="4" strokeWidth="1.5" x1="50%" x2="20%" y1="50%" y2="30%"></line>
                                <line stroke="#ef4444" strokeWidth="1.5" x1="50%" x2="80%" y1="50%" y2="40%"></line>
                                <line stroke="#1152d4" strokeWidth="1" x1="50%" x2="40%" y1="50%" y2="80%"></line>
                                <line stroke="#ef4444" strokeWidth="1.5" x1="80%" x2="70%" y1="40%" y2="10%"></line>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                <div className="w-12 h-12 bg-danger rounded-full border-4 border-danger/20 flex items-center justify-center animate-pulse">
                                    <span className="material-symbols-outlined text-white text-xl">corporate_fare</span>
                                </div>
                                <span className="mt-2 text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">TARGET ENTITY</span>
                            </div>
                            <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2">
                                <div className="w-8 h-8 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">person</span>
                                </div>
                                <span className="mt-1 block text-[8px] text-slate-400 text-center">Dir. J. Kamau</span>
                            </div>
                            <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2">
                                <div className="w-8 h-8 bg-slate-800 rounded-full border-2 border-danger flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-sm">home</span>
                                </div>
                                <span className="mt-1 block text-[8px] text-slate-400 text-center">Shared Address</span>
                            </div>
                            <div className="absolute top-[10%] left-[70%] -translate-x-1/2 -translate-y-1/2">
                                <div className="w-10 h-10 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">corporate_fare</span>
                                </div>
                                <span className="mt-1 block text-[8px] text-slate-400 text-center">Sub-Contractor X</span>
                            </div>
                            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700 p-2 rounded-lg">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Relationship Strength</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-danger w-[85%]"></div>
                                    </div>
                                    <span className="text-[10px] text-danger font-bold">85% Match</span>
                                </div>
                            </div>
                        </div>
                        {/* Legend / Details */}
                        <div className="p-4 bg-surface-dark border-t border-slate-800">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Detected Anomalies</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-danger animate-pulse"></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-slate-200">Shared Postal Address</p>
                                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">P.O. Box 24151-00100, NBO</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent-gold"></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-slate-200">Director Overlap</p>
                                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Appears in 4 bidding entities</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}