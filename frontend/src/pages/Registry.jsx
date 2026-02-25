

export default function Registry() {
    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="flex flex-col gap-8">
                {/* Top Bar Actions */}
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Contractor Registry</h2>
                        <p className="text-slate-500 dark:text-slate-400">Official repository of KRA-registered entities authorized for public bidding.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-surface-dark transition-all">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export Registry (CSV)
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-gold text-white text-sm font-bold hover:bg-accent-gold/90 transition-all shadow-lg shadow-accent-gold/20">
                            <span className="material-symbols-outlined text-lg">verified_user</span>
                            Bulk Verify PINs
                        </button>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">corporate_fare</span>
                            </div>
                            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">+12%</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Registered</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">14,295</h3>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Alert</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">High Risk Newcomers</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">284</h3>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-primary">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <span className="material-symbols-outlined">assignment_turned_in</span>
                            </div>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Compliance Rate</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">92.4%</h3>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                                <span className="material-symbols-outlined">report</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">Critical</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Flagged for Audit</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">42</h3>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    {/* Table Filter Header */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                                <button className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 rounded-md shadow-sm dark:text-white">All Contractors</button>
                                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Risk Flags</button>
                                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Verified Only</button>
                            </div>
                            <div className="h-6 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
                            <button className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                Advanced Filters
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Showing 1-10 of 14,295 results</p>
                    </div>

                    {/* Main Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4">Entity Details</th>
                                    <th className="px-6 py-4">KRA PIN</th>
                                    <th className="px-6 py-4">Risk Status</th>
                                    <th className="px-6 py-4">Reputation Score</th>
                                    <th className="px-6 py-4">Verification</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {/* Row 1 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">NL</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Nairobi Logistics Ltd</p>
                                                <p className="text-xs text-slate-500 mt-1">Reg: Jan 12, 2024</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">P051029384Z</span></td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-tighter border border-amber-500/20">
                                            <span className="size-1 rounded-full bg-amber-500"></span> High Risk Newcomer
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-red-500 h-full rounded-full" style={{ width: '28%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-red-500">28/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-sm">schedule</span> Under Investigation
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>

                                {/* Row 2 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-accent-gold/5 flex items-center justify-center text-accent-gold font-bold text-xs">SC</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Safari Construction Co.</p>
                                                <p className="text-xs text-slate-500 mt-1">Reg: Mar 05, 2018</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">A002394857X</span></td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-tighter border border-green-500/20">
                                            <span className="size-1 rounded-full bg-green-500"></span> Established
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '89%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-primary">89/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined text-sm">verified</span> Verified Entity
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>

                                {/* Row 3 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-slate-500/5 flex items-center justify-center text-slate-500 font-bold text-xs">TK</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Tana River Kibarua Gp</p>
                                                <p className="text-xs text-slate-500 mt-1">Reg: Nov 30, 2023</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">P011223344M</span></td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-tighter border border-amber-500/20">
                                            <span className="size-1 rounded-full bg-amber-500"></span> High Risk Newcomer
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-amber-500">45/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-sm">schedule</span> Under Investigation
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>

                                {/* Row 4 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors bg-red-500/5">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xs">SE</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Summit Elite Ventures</p>
                                                <p className="text-xs text-slate-500 mt-1">Reg: May 20, 2020</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">C019283746B</span></td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-tighter border border-red-500/20">
                                            <span className="size-1 rounded-full bg-red-500"></span> Critical Flag
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-red-600 h-full rounded-full" style={{ width: '12%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-red-600">12/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-red-500 text-white">
                                            <span className="material-symbols-outlined text-sm">block</span> Verification Revoked
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>

                                {/* Row 5 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">KU</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Kenya Universal Traders</p>
                                                <p className="text-xs text-slate-500 mt-1">Reg: Oct 14, 2021</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">P098765432W</span></td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-tighter border border-green-500/20">
                                            <span className="size-1 rounded-full bg-green-500"></span> Established
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '76%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-primary">76/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined text-sm">verified</span> Verified Entity
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
                        <button className="px-3 py-1.5 text-xs font-bold text-slate-400 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded disabled:opacity-50" disabled>Previous</button>
                        <div className="flex items-center gap-1">
                            <button className="size-8 text-xs font-bold bg-primary text-white rounded">1</button>
                            <button className="size-8 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded transition-colors">2</button>
                            <button className="size-8 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded transition-colors">3</button>
                            <span className="px-1 text-slate-400">...</span>
                            <button className="size-8 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded transition-colors">143</button>
                        </div>
                        <button className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">Next</button>
                    </div>
                </div>

                {/* Risk Analysis Drawer Placeholder */}
                <div className="bg-gradient-to-r from-primary to-primary/80 p-8 rounded-xl text-white shadow-xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-xl font-black">Identity Linkage Analytics</h4>
                        <p className="text-white/80 max-w-xl text-sm leading-relaxed">Our AI monitors shared directors, linked phone numbers, and IP addresses between &quot;High Risk Newcomers&quot; to prevent cartel bidding networks.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-bold text-sm shadow-lg shadow-black/10 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined">hub</span>
                        View Connection Map
                    </button>
                </div>
            </div>
        </div>
    );
}
