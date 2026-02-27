import { useState, useEffect } from 'react';

export default function Audit() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. ADD STATE FOR THE FILTER
    const [countyFilter, setCountyFilter] = useState(""); 
    const [availableCounties, setAvailableCounties] = useState([]);

    useEffect(() => {
        setLoading(true);
        // 2. DYNAMIC URL: Append the query parameter if a county is selected
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/tenders`;
        const fetchUrl = countyFilter ? `${baseUrl}?county=${encodeURIComponent(countyFilter)}` : baseUrl;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                const parsedData = Array.isArray(data) ? data : (data?.data || []);
                setTenders(parsedData);
                
                // Extract unique counties for the dropdown (only on initial load when fetching all)
                if (!countyFilter && parsedData.length > 0) {
                    const uniqueCounties = [...new Set(parsedData.map(t => t.county).filter(Boolean))].sort();
                    setAvailableCounties(uniqueCounties);
                }
                
                setLoading(false);
            })
            .catch(err => {
                console.error("Infrastructure Sync Error:", err);
                setLoading(false);
            });
    }, [countyFilter]); // Re-run fetch whenever the filter changes

    const getProgress = (status) => {
        const s = status?.toLowerCase() || '';
        if (s.includes('complete')) return 100;
        if (s.includes('ongoing')) return 45;
        if (s.includes('stall')) return 15;
        return 5; 
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-background-dark">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm mb-1 font-medium italic">Total Projects</p>
                    <h3 className="text-2xl font-bold text-white tracking-tighter">{tenders.length}</h3>
                </div>
                <div className="bg-surface-dark border border-slate-800 p-5 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm mb-1 font-medium italic">Audit Risk Alert</p>
                    <h3 className="text-2xl font-bold text-rose-500 tracking-tighter">
                        {tenders.filter(t => t.is_critical || (Number(t.value) / (Number(t.benchmark_value) || 1)) > 1.5).length} Flagged
                    </h3>
                </div>
            </div>

            {/* NEW: Filter Controls */}
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Project Registry</h3>
                <div className="flex items-center gap-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Filter by County:</label>
                    <select 
                        className="bg-slate-900 border border-slate-700 text-white text-xs font-bold py-2 px-4 rounded-lg focus:outline-none focus:border-primary transition-colors cursor-pointer"
                        value={countyFilter}
                        onChange={(e) => setCountyFilter(e.target.value)}
                    >
                        <option value="">ALL COUNTIES</option>
                        {availableCounties.map(county => (
                            <option key={county} value={county}>{county.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Audit Table */}
            <div className="bg-surface-dark border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900 border-b border-slate-800">
                        <tr className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                            <th className="px-6 py-4">Project / County</th>
                            <th className="px-6 py-4">Status & Progress</th>
                            <th className="px-6 py-4">Budget Variance</th>
                            <th className="px-6 py-4 text-right">Value (KSh)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr><td colSpan="4" className="text-center py-20 text-slate-500 font-mono text-xs uppercase tracking-widest">Filtering Infrastructure...</td></tr>
                        ) : tenders.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-20 text-slate-500 font-bold">No projects found for this county.</td></tr>
                        ) : tenders.map((tender) => {
                            const projectTitle = tender.title || tender.name || tender.project_name || "Untitled Project";
                            const val = Number(tender.value) || 0;
                            const bench = Number(tender.benchmark_value) || 1;
                            const varianceRaw = val > 0 ? ((val / bench - 1) * 100) : 0;
                            const variance = Math.abs(varianceRaw).toFixed(0);
                            const sign = varianceRaw > 0 ? "+" : (varianceRaw < 0 ? "-" : "");

                            return (
                                <tr key={tender.id || Math.random()} className="hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-bold text-slate-100 group-hover:text-primary transition-colors">
                                                {projectTitle}
                                            </p>
                                            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">
                                                {tender.county || "Unknown County"} | {tender.category || "General"}
                                            </p>
                                            {tender.is_demo_data && (
                                                <span className="mt-1 w-max px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-primary/20 text-primary border border-primary/30">DEMO DATA</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                                    tender.status === 'Stalled' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                                    tender.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                                                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                }`}>
                                                    {tender.status || 'Awarded'}
                                                </span>
                                                {tender.risk_flag && (
                                                    <span className="bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded animate-pulse">
                                                        {tender.risk_flag}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ${tender.status === 'Stalled' ? 'bg-red-500' : 'bg-primary'}`} 
                                                    style={{ width: `${getProgress(tender.status)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold ${varianceRaw > 50 ? 'text-rose-500' : 'text-slate-300'}`}>
                                                {val > 0 ? `${sign}${variance}%` : "0%"}
                                            </span>
                                            <span className="text-[9px] text-slate-600 uppercase font-black tracking-tighter">vs Benchmark</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-mono font-black text-white">
                                            {(val / 1000000).toFixed(1)}M
                                        </p>
                                        <p className="text-[9px] text-slate-600 italic font-bold">KES</p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}