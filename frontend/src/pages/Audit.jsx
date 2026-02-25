

export default function Audit() {
    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Active Projects</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold dark:text-white">1,284</h3>
                        <span className="text-emerald-500 text-sm font-medium flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                </div>
                <div className="bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Budget Commitment</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-accent-gold leading-none">KSh 4.2B</h3>
                        <span className="text-emerald-500 text-sm font-medium flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">+5%</span>
                    </div>
                </div>
                <div className="bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Avg. Completion Rate</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold dark:text-white">68.4%</h3>
                        <span className="text-rose-500 text-sm font-medium flex items-center bg-rose-500/10 px-2 py-0.5 rounded-full">-2.4%</span>
                    </div>
                </div>
                <div className="bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Risk Exposure</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold dark:text-white">14.2%</h3>
                        <span className="text-amber-500 text-xs font-medium uppercase tracking-wider">Moderate</span>
                    </div>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
                {/* Project Delivery List (60%) */}
                <div className="flex-[1.5] flex flex-col bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold dark:text-white">Project Delivery Audit</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Real-time status tracking of multi-agency projects</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-400">filter_list</span>
                            </button>
                            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-400">download</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10 border-b border-slate-200 dark:border-slate-800">
                                <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                    <th className="px-6 py-4">Project Details</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Value (KSh)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Nairobi Expressway Expansion - Ph 2</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">KeNHA | China Road &amp; Bridge Corp.</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">82%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                            PAID
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-mono font-semibold dark:text-white">840.5M</p>
                                    </td>
                                </tr>

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Kisumu Port Modernization</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">KPA | Southern Marine Services</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">45%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                            PENDING BILL
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-mono font-semibold dark:text-white">212.0M</p>
                                    </td>
                                </tr>

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Wajir North Water Piping Project</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">County Govt | Desert Plains Ltd.</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="bg-rose-500 h-full rounded-full" style={{ width: '15%' }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">15%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                            STALLED
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-mono font-semibold dark:text-white">45.8M</p>
                                    </td>
                                </tr>

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Mombasa Port Relief Road</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">KeNHA | Coast Infra Dev</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '95%' }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">95%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                            PAID
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-mono font-semibold dark:text-white">1.2B</p>
                                    </td>
                                </tr>

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Turkana Wind Farm Grid Link</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">KETRACO | Energy Global</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: '62%' }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">62%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                            PENDING BILL
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-mono font-semibold dark:text-white">75.3M</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Map Widget (40%) */}
                <div className="flex-1 bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden relative shadow-2xl flex flex-col min-h-[400px]">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-10">
                        <h3 className="text-sm font-bold dark:text-white">Project Locations</h3>
                        <div className="flex gap-2">
                            <span className="size-2 bg-emerald-500 rounded-full"></span>
                            <span className="size-2 bg-amber-500 rounded-full"></span>
                            <span className="size-2 bg-rose-500 rounded-full"></span>
                        </div>
                    </div>

                    {/* Map Visual Placeholder */}
                    <div className="flex-1 relative bg-slate-50 dark:bg-slate-900 overflow-hidden">
                        {/* Abstract Map Design */}
                        <div className="absolute inset-0 opacity-40">
                            <svg className="w-full h-full" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50 L300 100 L350 300 L200 450 L50 350 Z" fill="none" stroke="#64748b" strokeWidth="1"></path>
                                <path d="M150 150 L250 150 L250 250 L150 250 Z" fill="none" stroke="#64748b" strokeWidth="0.5"></path>
                                <circle cx="200" cy="200" fill="none" r="100" stroke="#64748b" strokeDasharray="4 4"></circle>
                            </svg>
                        </div>

                        {/* Interactive Pins */}
                        {/* Nairobi */}
                        <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                            <div className="bg-primary/20 p-2 rounded-full animate-pulse group-hover:scale-125 transition-transform">
                                <div className="bg-primary size-4 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-white dark:bg-slate-800 text-xs p-2 rounded shadow-xl border border-slate-200 dark:border-slate-800 z-20">
                                <p className="font-bold dark:text-white">Nairobi HQ Projects</p>
                                <p className="text-slate-500 dark:text-slate-400">12 Active Projects</p>
                            </div>
                        </div>

                        {/* Mombasa */}
                        <div className="absolute top-[80%] left-[85%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                            <div className="bg-primary/20 p-2 rounded-full group-hover:scale-125 transition-transform">
                                <div className="bg-primary size-4 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-white dark:bg-slate-800 text-xs p-2 rounded shadow-xl border border-slate-200 dark:border-slate-800 z-20">
                                <p className="font-bold dark:text-white">Mombasa Port Hub</p>
                                <p className="text-slate-500 dark:text-slate-400">4 Active Projects</p>
                            </div>
                        </div>

                        {/* Wajir (Warning) */}
                        <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                            <div className="bg-rose-500/20 p-2 rounded-full group-hover:scale-125 transition-transform">
                                <div className="bg-rose-500 size-4 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-white dark:bg-slate-800 text-xs p-2 rounded shadow-xl border border-slate-200 dark:border-slate-800 z-20">
                                <p className="font-bold text-rose-600 dark:text-rose-400">Wajir Region</p>
                                <p className="text-slate-500 dark:text-slate-400">1 Stalled Project</p>
                            </div>
                        </div>

                        {/* Kisumu */}
                        <div className="absolute top-[35%] left-[20%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                            <div className="bg-amber-500/20 p-2 rounded-full group-hover:scale-125 transition-transform">
                                <div className="bg-amber-500 size-4 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-white dark:bg-slate-800 text-xs p-2 rounded shadow-xl border border-slate-200 dark:border-slate-800 z-20">
                                <p className="font-bold text-amber-600 dark:text-amber-400">Kisumu Port</p>
                                <p className="text-slate-500 dark:text-slate-400">3 Pending Review</p>
                            </div>
                        </div>

                        {/* Map Legend Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 bg-primary rounded-full"></span> Normal
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-2 bg-amber-500 rounded-full"></span> Delayed
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-2 bg-rose-500 rounded-full"></span> Critical
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute right-4 top-16 flex flex-col gap-2 z-10">
                        <button className="bg-white dark:bg-slate-800 size-8 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transition-colors text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                        <button className="bg-white dark:bg-slate-800 size-8 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transition-colors text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <button className="bg-white dark:bg-slate-800 size-8 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transition-colors text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">layers</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Insight */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6 gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                    </div>
                    <div>
                        <h4 className="font-bold dark:text-white">Automated Risk Insight</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">3 project bottlenecks detected in Northern regions due to logistic delays.</p>
                    </div>
                </div>
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline whitespace-nowrap">
                    View Detailed Analysis <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
