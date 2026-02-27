import { useEffect, useState } from 'react';

export default function Dashboard() {
    // State for our actual infrastructure endpoints
    const [tenders, setTenders] = useState([]);
    const [contractors, setContractors] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch everything simultaneously using Promise.all
        const fetchData = async () => {
            try {
                const [tendersRes, contractorsRes, postsRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/tenders`).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/contractors`).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`).then(res => res.json())
                ]);

                // Defensively parse the data (handling paginated vs flat arrays)
                setTenders(Array.isArray(tendersRes) ? tendersRes : (tendersRes.data || []));
                setContractors(Array.isArray(contractorsRes) ? contractorsRes : (contractorsRes.data || []));
                setPosts(Array.isArray(postsRes) ? postsRes : (postsRes.data || []));
                
                setLoading(false);
            } catch (err) {
                console.error("Dashboard Sync Error:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- DYNAMIC CALCULATIONS ---
    const flaggedAnomalies = tenders.filter(t => t.is_critical || (Number(t.value) / (Number(t.benchmark_value) || 1)) > 1.5);
    
    let avgVariance = 0;
    if (flaggedAnomalies.length > 0) {
        const totalVar = flaggedAnomalies.reduce((sum, t) => {
            const val = Number(t.value) || 0;
            const bench = Number(t.benchmark_value) || 1;
            return sum + ((val / bench - 1) * 100);
        }, 0);
        avgVariance = (totalVar / flaggedAnomalies.length).toFixed(1);
    }

    // Sort contractors by worst score first for the "High Risk" widget
    const highRiskContractors = [...contractors].sort((a, b) => (a.trust_score || 0) - (b.trust_score || 0)).slice(0, 3);

    // Get the latest 5 civic posts
    const recentPosts = [...posts].reverse().slice(0, 5);

    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex items-center justify-center bg-background-dark">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-400 uppercase tracking-widest text-xs font-bold">Aggregating Infrastructure...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-background-dark">
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-white mb-1">Main Overview Dashboard</h2>
                        <p className="text-slate-400 text-sm">Real-time procurement oversight and contractor reputation tracking across Kenya.</p>
                    </div>
                </div>

                {/* Dynamic Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-surface-dark p-6 rounded-xl border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Avg Bid Deviation</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-black text-white">+{avgVariance}%</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-bold">Among flagged tenders</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Tenders</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-black text-white">{tenders.length}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-bold">Across all monitored counties</p>
                    </div>
                    <div className="bg-surface-dark p-6 rounded-xl border border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest">Flagged Anomalies</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">warning</span>
                        </div>
                        <div className="flex items-end gap-3 relative z-10">
                            <span className="text-4xl font-black text-white">{flaggedAnomalies.length}</span>
                        </div>
                        <p className="text-[10px] text-primary/70 mt-2 font-bold uppercase tracking-widest relative z-10">Requiring immediate audit</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Dynamic Contractor Reputation Card */}
                    <div className="bg-surface-dark rounded-xl border border-slate-800 p-6">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
                            Highest Risk Contractors
                        </h3>
                        <div className="space-y-6">
                            {highRiskContractors.map((contractor, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-bold text-slate-300">{contractor.name || contractor.title}</span>
                                            <span className={`text-sm font-black ${contractor.trust_score >= 80 ? 'text-primary' : contractor.trust_score >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                                                {contractor.trust_score}/100
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">PIN: {contractor.kra_pin || "PENDING"}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${contractor.trust_score >= 80 ? 'bg-primary' : contractor.trust_score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                                style={{ width: `${contractor.trust_score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Static Bid Rigging Widget (UI Showcase) */}
                    <div className="bg-slate-900 rounded-xl border border-rose-500/20 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <span className="material-symbols-outlined text-[100px] text-rose-500">security</span>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                                <h3 className="text-rose-500 font-black text-[10px] uppercase tracking-widest">Bid-Rigging Alert</h3>
                            </div>
                            <div className="bg-rose-500/5 p-4 rounded-lg border border-rose-500/10 mb-4">
                                <p className="text-2xl font-black text-white">Cluster Detection</p>
                                <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">Multiple bids from different KRA PINs originating from the same IP block detected in Nairobi region.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Price Anomalies Table */}
                <div className="mt-8 bg-surface-dark rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                    <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <h3 className="text-white font-black text-xs uppercase tracking-widest">Recent Price Anomalies</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-900 border-b border-slate-800 text-slate-500 text-[9px] uppercase font-black tracking-widest">
                                    <th className="px-6 py-4">Project Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Quoted (KES)</th>
                                    <th className="px-6 py-4">Market Avg</th>
                                    <th className="px-6 py-4">Variance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-sm">
                                {flaggedAnomalies.slice(0, 4).map((anomaly, index) => {
                                    const val = Number(anomaly.value) || 0;
                                    const bench = Number(anomaly.benchmark_value) || 1;
                                    const varianceRaw = ((val / bench - 1) * 100);
                                    
                                    return (
                                        <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-white text-xs">{anomaly.title || anomaly.name}</td>
                                            <td className="px-6 py-4 text-slate-400 text-xs">{anomaly.category}</td>
                                            <td className="px-6 py-4 font-mono font-bold text-xs">{(val / 1000000).toFixed(1)}M</td>
                                            <td className="px-6 py-4 font-mono text-slate-500 text-xs">{(bench / 1000000).toFixed(1)}M</td>
                                            <td className="px-6 py-4">
                                                <span className="font-black text-xs text-rose-500">
                                                    +{varianceRaw.toFixed(0)}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Dynamic Right Side Panel - Ward Level Feed */}
            <aside className="w-80 flex flex-col bg-surface-dark border-l border-slate-800 shrink-0">
                <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        <h3 className="text-white font-black text-[10px] uppercase tracking-widest">Live Ward Feed</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Crowdsourced Updates</p>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    {recentPosts.length > 0 ? recentPosts.map((item, index) => (
                        <div key={index} className="relative pl-6 border-l-2 border-slate-800">
                            <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${item.status === 'delay_reported' ? 'bg-amber-500' : 'bg-primary'} shadow-[0_0_8px_rgba(0,0,0,0.8)]`}></div>
                            <p className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'delay_reported' ? 'text-amber-500' : 'text-primary'} mb-1`}>{item.wardId || item.county}</p>
                            <p className="text-xs text-white font-bold leading-tight mb-2">{item.title}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{new Date(item.timestamp || Date.now()).toLocaleDateString()}</span>
                                <span className="text-[8px] font-black text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded uppercase tracking-widest">{item.status?.replace('_', ' ')}</span>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-8">
                            <p className="text-slate-500 text-xs font-bold">No recent activity</p>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}