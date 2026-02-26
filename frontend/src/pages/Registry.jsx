import { useState, useEffect } from 'react';

export default function Registry() {
    const [contractors, setContractors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistry = async () => {
            try {
                // Ensure your .env has VITE_API_BASE_URL=http://localhost:3001/api
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contractors`);
                const data = await response.json();
                setContractors(data);
                setLoading(false);
            } catch (error) {
                console.error("Infrastructure Sync Error:", error);
                setLoading(false);
            }
        };
        fetchRegistry();
    }, []);

    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Contractor Registry</h2>
                        <p className="text-slate-500 dark:text-slate-400">Official repository of KRA-registered entities. Source: JSON Infrastructure.</p>
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
                                    <th className="px-6 py-4">Risk Intelligence</th>
                                    <th className="px-6 py-4">Reputation Score</th>
                                    <th className="px-6 py-4">Data Source</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-slate-500">Loading records from backend...</td>
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
                                                        <p className="text-[10px] text-slate-500 mt-1 uppercase">Reg: {item.reg_date}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">{item.kra_pin}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.risk_flags?.map((flag, idx) => (
                                                        <span key={idx} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                                                            flag === 'Clean' 
                                                            ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                                            : flag.includes('Alert') || flag.includes('Critical') 
                                                            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                                                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                        }`}>
                                                            {flag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${item.reputation_score < 40 ? 'bg-red-500' : 'bg-primary'}`} 
                                                            style={{ width: `${item.reputation_score}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className={`text-xs font-bold ${item.reputation_score < 40 ? 'text-red-500' : 'text-primary'}`}>
                                                        {item.reputation_score}/100
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold">
                                                    <span className="material-symbols-outlined text-[12px]">database</span>
                                                    {item.is_demo_data ? "MOCK" : "LIVE"}
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