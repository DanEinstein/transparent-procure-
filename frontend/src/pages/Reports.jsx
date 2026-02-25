

export default function Reports() {
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

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <span className="text-emerald-500 text-sm font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-primary/40 text-sm font-semibold uppercase tracking-wider">Total Blacklisted Firms</p>
                    <p className="text-4xl font-black mt-1 dark:text-white">1,284</p>
                </div>
                <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">history</span>
                        </div>
                        <span className="text-emerald-500 text-sm font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 5%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-primary/40 text-sm font-semibold uppercase tracking-wider">Current Suspensions</p>
                    <p className="text-4xl font-black mt-1 dark:text-white">452</p>
                </div>
                <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="text-red-500 text-sm font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_down</span> 2%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-primary/40 text-sm font-semibold uppercase tracking-wider">Debarment Value</p>
                    <p className="text-4xl font-black mt-1 dark:text-white">KES 8.4B</p>
                </div>
            </div>

            {/* Detailed Suspension Records */}
            <div className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-primary/20 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white">Detailed Suspension Records</h2>
                    <div className="flex gap-2">
                        <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-primary/20 text-sm font-medium hover:bg-slate-50 dark:hover:bg-primary/10 text-slate-700 dark:text-slate-300">Filter by Reason</button>
                        <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-primary/20 text-sm font-medium hover:bg-slate-50 dark:hover:bg-primary/10 text-slate-700 dark:text-slate-300">Date Range</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-primary/10 border-b border-slate-200 dark:border-primary/20">
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Contractor Name</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">KRA PIN</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Reason for Blacklisting</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-primary uppercase tracking-wider text-right">Evidence</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-primary/10">
                            <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold dark:text-white">Summit Civil Engineering Ltd</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">Nairobi, Kenya</div>
                                </td>
                                <td className="px-6 py-4 font-mono text-sm dark:text-slate-300">P051239485Z</td>
                                <td className="px-6 py-4 text-sm dark:text-slate-300">Falsification of financial records and procurement fraud.</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm dark:text-slate-300">01 Jan 2024</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">to 01 Jan 2029</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 uppercase">Blacklisted</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="inline-flex items-center text-primary hover:underline font-bold text-sm" href="#">
                                        <span className="material-symbols-outlined text-lg mr-1">attach_file</span> View Dossier
                                    </a>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold dark:text-white">Savannah Infra-Tech Solutions</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">Mombasa, Kenya</div>
                                </td>
                                <td className="px-6 py-4 font-mono text-sm dark:text-slate-300">P068822314R</td>
                                <td className="px-6 py-4 text-sm dark:text-slate-300">Chronic non-performance on 3 separate Ministry of Water tenders.</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm dark:text-slate-300">15 Mar 2023</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">to 15 Mar 2026</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 uppercase">Blacklisted</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="inline-flex items-center text-primary hover:underline font-bold text-sm" href="#">
                                        <span className="material-symbols-outlined text-lg mr-1">attach_file</span> View Dossier
                                    </a>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold dark:text-white">Apex Global Logistics Group</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">Kisumu, Kenya</div>
                                </td>
                                <td className="px-6 py-4 font-mono text-sm dark:text-slate-300">P023344556K</td>
                                <td className="px-6 py-4 text-sm dark:text-slate-300">Collusive bidding and price fixing during pandemic response.</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm dark:text-slate-300">20 Aug 2021</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">to 20 Aug 2031</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 uppercase">Blacklisted</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="inline-flex items-center text-primary hover:underline font-bold text-sm" href="#">
                                        <span className="material-symbols-outlined text-lg mr-1">attach_file</span> View Dossier
                                    </a>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold dark:text-white">Rift Valley Construction Partners</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">Nakuru, Kenya</div>
                                </td>
                                <td className="px-6 py-4 font-mono text-sm dark:text-slate-300">P011002299M</td>
                                <td className="px-6 py-4 text-sm dark:text-slate-300">Conflict of interest violations involving county officials.</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm dark:text-slate-300">05 Nov 2023</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">to 05 Nov 2025</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 uppercase">Blacklisted</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="inline-flex items-center text-primary hover:underline font-bold text-sm" href="#">
                                        <span className="material-symbols-outlined text-lg mr-1">attach_file</span> View Dossier
                                    </a>
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold dark:text-white">Northern Frontier Supplies</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">Garissa, Kenya</div>
                                </td>
                                <td className="px-6 py-4 font-mono text-sm dark:text-slate-300">P099887766T</td>
                                <td className="px-6 py-4 text-sm dark:text-slate-300">Submission of counterfeit regulatory certifications.</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm dark:text-slate-300">12 Feb 2024</div>
                                    <div className="text-xs text-slate-500 dark:text-primary/40">to 12 Feb 2029</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 uppercase">Blacklisted</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="inline-flex items-center text-primary hover:underline font-bold text-sm" href="#">
                                        <span className="material-symbols-outlined text-lg mr-1">attach_file</span> View Dossier
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-slate-200 dark:border-primary/20 flex justify-between items-center text-sm text-slate-500 dark:text-primary/60">
                    <p>Showing 1-5 of 1,284 blacklisted entities</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-primary/20 hover:bg-slate-50 dark:hover:bg-primary/10 disabled:opacity-50" disabled>
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="px-3 py-1.5 rounded border border-primary text-primary font-bold bg-primary/10">1</button>
                        <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-primary/20 hover:bg-slate-50 dark:hover:bg-primary/10">2</button>
                        <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-primary/20 hover:bg-slate-50 dark:hover:bg-primary/10">3</button>
                        <span className="px-2">...</span>
                        <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-primary/20 hover:bg-slate-50 dark:hover:bg-primary/10">257</button>
                        <button className="px-3 py-1.5 rounded border border-slate-200 dark:border-primary/20 hover:bg-slate-50 dark:hover:bg-primary/10">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Summary */}
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-slate-50 dark:bg-primary/5 p-6 rounded-xl border border-dashed border-slate-300 dark:border-primary/20">
                <div className="max-w-2xl">
                    <h3 className="font-bold flex items-center gap-2 mb-2 dark:text-white">
                        <span className="material-symbols-outlined text-primary">verified_user</span> Oversight Confirmation
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-primary/60 italic leading-relaxed">
                        The records displayed above are pulled directly from the PPRA (Public Procurement Regulatory Authority) central database. Contractors listed are strictly prohibited from participating in any public procurement proceedings within the Republic of Kenya during their suspension period.
                    </p>
                </div>
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <p className="text-xs uppercase font-bold text-slate-500 dark:text-primary/40 tracking-widest">Last Verified Date</p>
                    <p className="text-lg font-black text-primary">Today, 09:42 AM</p>
                </div>
            </div>
        </div>
    );
}
