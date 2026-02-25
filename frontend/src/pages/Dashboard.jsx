
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { dashboardAPI } from '../api/apiService';

export default function Dashboard() {
    const { data: stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useApi(dashboardAPI.getStats);
    const { data: contractorScores, loading: scoresLoading, error: scoresError } = useApi(dashboardAPI.getContractorScores);
    const { data: anomalies, loading: anomaliesLoading, error: anomaliesError } = useApi(dashboardAPI.getAnomalies);
    const { data: wardFeed, loading: feedLoading, error: feedError } = useApi(dashboardAPI.getWardFeed);
    
    // Fallback data in case of errors
    const statsData = stats?.data || {
        avgBidDeviation: 14.2,
        avgBidDeviationChange: 2.1,
        activeTenders: 1284,
        activeTendersChange: -5.2,
        flaggedAnomalies: 42,
        flaggedAnomaliesChange: 12
    };
    
    const scoresData = contractorScores?.data || [];
    const anomaliesData = anomalies?.data || [];
    const feedData = wardFeed?.data || [];
    
    if (statsLoading || scoresLoading || anomaliesLoading || feedLoading) {
        return (
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }
    
    return (
        <>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-white mb-1">Main Overview Dashboard</h2>
                        <p className="text-slate-400 text-sm">Real-time procurement oversight and contractor reputation tracking across Kenya.</p>
                    </div>
                    <button className="bg-navy-muted hover:bg-navy-muted/80 text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-slate-700">
                        <span className="material-symbols-outlined text-[18px] text-primary">flag</span>
                        Flag Entry
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-navy-deep p-6 rounded-xl border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Avg Bid Deviation</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-black text-white">{statsData.avgBidDeviation}%</span>
                            <span className={`text-sm font-bold pb-1 ${statsData.avgBidDeviationChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {statsData.avgBidDeviationChange >= 0 ? '+' : ''}{statsData.avgBidDeviationChange}%
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 italic">Relative to historical ward averages</p>
                    </div>
                    <div className="bg-navy-deep p-6 rounded-xl border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Tenders</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-black text-white">{statsData.activeTenders.toLocaleString()}</span>
                            <span className={`text-sm font-bold pb-1 ${statsData.activeTendersChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {statsData.activeTendersChange >= 0 ? '+' : ''}{statsData.activeTendersChange}%
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 italic">Across 47 Kenyan Counties</p>
                    </div>
                    <div className="bg-navy-deep p-6 rounded-xl border border-primary/20 shadow-xl shadow-primary/5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">Flagged Anomalies</span>
                            <span className="material-symbols-outlined text-primary text-[20px] fill-1">warning</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-black text-white">{statsData.flaggedAnomalies}</span>
                            <span className={`text-sm font-bold pb-1 ${statsData.flaggedAnomaliesChange >= 0 ? 'text-primary' : 'text-red-500'}`}>
                                {statsData.flaggedAnomaliesChange >= 0 ? '+' : ''}{statsData.flaggedAnomaliesChange}
                            </span>
                        </div>
                        <p className="text-[10px] text-primary/70 mt-2 italic font-medium">Requiring immediate audit review</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contractor Reputation Card */}
                    <div className="bg-navy-deep rounded-xl border border-slate-800 p-6">
                        <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified_user</span>
                            Contractor Reputation Scores
                        </h3>
                        <div className="space-y-6">
                            {scoresData.slice(0, 3).map((contractor, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-navy-muted flex items-center justify-center border border-slate-700 font-bold text-white">{contractor.licenseNumber}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-bold text-slate-300">{contractor.name}</span>
                                            <span className={`text-sm font-black ${contractor.score >= 70 ? 'text-primary' : 'text-red-500'}`}>
                                                {contractor.score}/100
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-navy-muted rounded-full">
                                            <div 
                                                className={`h-full rounded-full ${contractor.score >= 70 ? 'bg-primary' : 'bg-red-500'}`} 
                                                style={{ width: `${contractor.score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bid Rigging Widget */}
                    <div className="bg-gradient-to-br from-navy-deep to-navy-darker rounded-xl border-2 border-primary/40 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-[100px] text-primary">security</span>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex h-3 w-3 rounded-full bg-primary animate-pulse"></span>
                                <h3 className="text-primary font-black text-lg uppercase tracking-tighter">Bid-Rigging Alert System</h3>
                            </div>
                            <div className="bg-navy-muted/50 p-4 rounded-lg border border-slate-700 mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-xs font-bold text-slate-400">Current Risk Level</p>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-500 text-navy-darker">HIGH RISK</span>
                                </div>
                                <p className="text-2xl font-black text-white">Cluster Detection</p>
                                <p className="text-xs text-slate-400 mt-2">Multiple bids from different KRA PINs originating from the same IP block detected.</p>
                            </div>
                            <button className="w-full bg-primary py-3 rounded-lg font-black text-navy-darker uppercase tracking-widest text-xs hover:bg-white hover:text-navy-darker transition-all">
                                Review Flagged Cluster
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Price Anomalies Table */}
                <div className="mt-8 bg-navy-deep rounded-xl border border-slate-800 overflow-hidden shadow-xl">
                    <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="text-white font-black text-lg">Recent Price Anomalies</h3>
                        <button className="text-primary text-xs font-bold hover:underline">View Full Report</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-navy-darker/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                                    <th className="px-6 py-4">Tender ID</th>
                                    <th className="px-6 py-4">Item Category</th>
                                    <th className="px-6 py-4">Quoted Price (KES)</th>
                                    <th className="px-6 py-4">Market Avg</th>
                                    <th className="px-6 py-4">Variance</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-sm">
                                {anomaliesData.slice(0, 3).map((anomaly, index) => (
                                    <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-white">{anomaly.tenderId}</td>
                                        <td className="px-6 py-4 text-slate-400">{anomaly.itemCategory}</td>
                                        <td className="px-6 py-4 font-mono font-bold">{anomaly.quotedPrice?.toLocaleString()}</td>
                                        <td className="px-6 py-4 font-mono">{anomaly.marketAverage?.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${anomaly.variance > 50 ? 'text-red-500' : anomaly.variance > 20 ? 'text-amber-500' : 'text-green-500'}`}>
                                                +{anomaly.variance}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="material-symbols-outlined text-slate-500 hover:text-primary">
                                                visibility
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {anomaliesData.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-slate-500">No anomalies detected</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Side Panel - Ward Level Feed */}
            <aside className="w-80 flex flex-col bg-navy-deep border-l border-slate-800 shrink-0">
                <div className="p-6 border-b border-slate-800 bg-navy-darker/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                        <h3 className="text-white font-black text-sm uppercase tracking-tighter">Live Ward-Level Feed</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-500 text-[10px] font-bold">Updates across 1,450 Wards</p>
                        <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 rounded">LIVE</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    {feedData.map((item, index) => (
                        <div key={index} className="relative pl-6 border-l-2 border-slate-700">
                            <div className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full ${item.color === 'red' ? 'bg-red-500' : 'bg-primary'} border-4 border-navy-deep`}></div>
                            <p className={`text-[10px] font-black ${item.color === 'red' ? 'text-red-500' : 'text-primary'} mb-1`}>{item.ward}</p>
                            <p className="text-xs text-white font-bold leading-tight">{item.title}</p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-[10px] text-slate-500">{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                {item.amount && (
                                    <span className="text-[10px] text-slate-400 font-mono">KES {(item.amount / 1000000).toFixed(1)}M</span>
                                )}
                            </div>
                        </div>
                    ))}
                    {feedData.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-slate-500 text-sm">No recent activity</p>
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <div className="bg-navy-muted rounded-lg p-4 text-center">
                        <p className="text-slate-500 text-[10px] mb-2 font-bold uppercase">Ward-Level Activity Map</p>
                        <div className="w-full h-32 bg-navy-darker rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
                            <img alt="Kenya Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6vQy619o0EkyfPoXosvuPuJ_ahYC0RhuqLLpNwZv1yUgQvr32cXH529kzgiHgQPKy7wXJGU4ceKsaWgnufewhiSitoWs_n4WcbDb538L_yiINg9OKA-Sz2QGUYcHKwmyvu4ogbMJA5uwESTJcAQswMJwP7OaQdF3HrYUzk78UPPkFZcOz8t3c2jkwobzHzmeDVU5Hqc9LXbtGxoRIscd75HD5MOLeXuSN3ocwwoSHrIRhjvLl7WvDvu4v8n240Vu-bhsshoNpbwQ" />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
