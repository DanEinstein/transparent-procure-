

export default function Fraud() {
    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {/* Header Customization for Fraud Page */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Forensic Intelligence Dashboard</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-danger/20 text-danger border border-danger/30">LIVE OVERSIGHT</span>
                </div>
            </div>

            {/* Stats Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Investigations</p>
                        <span className="material-symbols-outlined text-primary">search_insights</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold dark:text-white">124</h3>
                        <span className="text-emerald-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-xs">trending_up</span> 12%
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">From previous 30 days</p>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Flagged Amount</p>
                        <span className="material-symbols-outlined text-danger">payments</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold dark:text-white">KES 4.2B</h3>
                        <span className="text-danger text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-xs">warning</span> High Risk
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Awaiting verification</p>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price Variance Avg</p>
                        <span className="material-symbols-outlined text-accent-gold">analytics</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold dark:text-white">312%</h3>
                        <span className="text-emerald-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-xs">arrow_upward</span> 18%
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Above market benchmark</p>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">High-Risk Entities</p>
                        <span className="material-symbols-outlined text-primary">group_work</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold dark:text-white">48</h3>
                        <span className="text-emerald-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-xs">add</span> 2
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Identified via network analysis</p>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-12 gap-8">
                {/* Price Anomaly Intelligence Table */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold dark:text-white">Price Anomaly Intelligence</h3>
                            <div className="group relative inline-block">
                                <span className="material-symbols-outlined text-slate-500 text-sm cursor-help">info</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
                                <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-700 rounded shadow-sm">Table View</button>
                                <button className="px-3 py-1 text-xs font-medium text-slate-500">Timeline</button>
                            </div>
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-sm">filter_list</span>
                                Filter Categories
                            </button>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Tender ID</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Entity / Vendor</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Quoted Price</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Market Avg</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Variance</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Risk</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                    <td className="px-4 py-4 text-xs font-mono font-bold text-primary">#TR-2023-0941</td>
                                    <td className="px-4 py-4">
                                        <p className="text-xs font-bold dark:text-white">Avenue Construction Ltd</p>
                                        <p className="text-[10px] text-slate-500">Ministry of Infrastructure</p>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono">KES 142.5M</td>
                                    <td className="px-4 py-4 text-xs font-mono text-slate-500">KES 32.1M</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-danger">443%</span>
                                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-danger w-[90%]"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-danger text-white">CRITICAL</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors bg-danger/5">
                                    <td className="px-4 py-4 text-xs font-mono font-bold text-primary">#TR-2023-1108</td>
                                    <td className="px-4 py-4">
                                        <p className="text-xs font-bold dark:text-white">FastTrack IT Solutions</p>
                                        <p className="text-[10px] text-slate-500">Dept. of Education</p>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono">KES 88.0M</td>
                                    <td className="px-4 py-4 text-xs font-mono text-slate-500">KES 19.5M</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-danger">451%</span>
                                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-danger w-full"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-danger text-white">CRITICAL</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-4 text-xs font-mono font-bold text-primary">#TR-2024-0012</td>
                                    <td className="px-4 py-4">
                                        <p className="text-xs font-bold dark:text-white">Global Supplies Kenya</p>
                                        <p className="text-[10px] text-slate-500">County of Nairobi</p>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono">KES 45.2M</td>
                                    <td className="px-4 py-4 text-xs font-mono text-slate-500">KES 14.8M</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-accent-gold">305%</span>
                                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-accent-gold w-[60%]"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-accent-gold text-slate-900">HIGH RISK</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-4 text-xs font-mono font-bold text-primary">#TR-2023-0882</td>
                                    <td className="px-4 py-4">
                                        <p className="text-xs font-bold dark:text-white">Apex Logistics</p>
                                        <p className="text-[10px] text-slate-500">Ministry of Health</p>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono">KES 210.5M</td>
                                    <td className="px-4 py-4 text-xs font-mono text-slate-500">KES 72.0M</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-accent-gold">292%</span>
                                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-accent-gold w-[55%]"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-accent-gold text-slate-900">HIGH RISK</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-4 text-xs font-mono font-bold text-primary">#TR-2023-1250</td>
                                    <td className="px-4 py-4">
                                        <p className="text-xs font-bold dark:text-white">Prime Power Ltd</p>
                                        <p className="text-[10px] text-slate-500">Kenya Power</p>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono">KES 12.4M</td>
                                    <td className="px-4 py-4 text-xs font-mono text-slate-500">KES 4.8M</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-500">258%</span>
                                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-slate-400 w-[45%]"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">MEDIUM</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <p className="text-[10px] text-slate-500">Showing 5 of 1,284 flagged entries</p>
                            <div className="flex gap-2">
                                <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bid Rigging Graph Sidebar */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold dark:text-white">Bid Rigging Network</h3>
                        <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
                            <span className="material-symbols-outlined text-sm">open_in_full</span>
                        </button>
                    </div>
                    <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[520px]">
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
                            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                                <button className="w-8 h-8 bg-slate-900/80 backdrop-blur border border-slate-700 text-white rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                                <button className="w-8 h-8 bg-slate-900/80 backdrop-blur border border-slate-700 text-white rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
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
                        <div className="p-4 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800">
                            <h4 className="text-xs font-bold mb-3 dark:text-white">Detected Anomalies</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-danger"></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold dark:text-slate-200">Shared Postal Address</p>
                                        <p className="text-[9px] text-slate-500">P.O. Box 24151-00100, Nairobi</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent-gold"></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold dark:text-slate-200">Director Overlap</p>
                                        <p className="text-[9px] text-slate-500">John M. (Appears in 4 bidding entities)</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
                                </div>
                                <button className="w-full mt-2 py-2 border border-primary/30 text-primary text-[10px] font-bold rounded-lg hover:bg-primary hover:text-white transition-all uppercase tracking-widest">
                                    Export Conflict Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Summary / Action Bar */}
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                        <img className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB83OIdIS5e1DidqB-RKjBzGCOqOqxuuwdkHCUpGG1XbR2P-xtRyALZeOyqNmr7hkPKGo6WaPe5ydtx7WngH4uGOkIN5B0O2YCKJ1TicmuCXCdK1988FW16N-7a7e8_LlI84nCPqrN6pW4zUyH-OSizelTadzKvrCj4gwzPP_WbDvMGNmku7o7ifp3kC1OR1A6w4hjmmR49sXX2_Ce6he_VXGpyZnGU-38q7sSGCJJtxT3sJvNgkYlxP73yz4smRwoxf0YZU-6rXV4" />
                        <img className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqVY10VwpkBkeYC68hQ5ozrphQPnnZL3FHmi7WblmMWny8aczByohBizl3RjyPy10x3CGSbL5cY5M3zUzsAkox63qHjs1bm_g5CzfpgHiGWH4bsUQ3K-QaD05yCkJW_xmQALB_SYTtdSkXZYVCu2hB_8FApQCidmWmDoXEKZ9xNJ8A82rL_qw2RY8aTALFMh-AWjgUqYrVq4Q4a4zK2b_u0AFSy88FH-nV-ILqnWEad77P2EqVww_lsb_EMAOS0--9U1nAwllTz4I" />
                        <img className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3V4LqUPkzD9fFap9XVrHK62sJ_0StDUthAw2P75vKsNS-GrJgA9kiGEDfOkUvJiHoSi8biHrx7bGKI4sOYiD3pxDA3V305v0iBcYku2k-2Snfqa1RTlmXnmYWAJnCkHcwgu4ET-zoP55DsYc09ae7A2ZALv9pZUhOeP_MiuZAadVz_v-x5X_roK9SzkV0FI1tVi0_2PnugUudMUy_02xyvePg52bPCedYSKgTWZRLYfFX8dazhYlgygfFUy_qv1mvYtEEDw7Sx2w" />
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-500">+4</div>
                    </div>
                    <div>
                        <p className="text-xs font-bold dark:text-white">Review Team Assigned</p>
                        <p className="text-[10px] text-slate-500">Senior Auditors currently monitoring these anomalies.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2.5 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">Save Session</button>
                    <button className="px-6 py-2.5 rounded-lg text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Submit Forensic Case</button>
                </div>
            </div>
        </div>
    );
}
