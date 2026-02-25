
import { useState } from 'react';
import useApi from '../hooks/useApi';
import { feedAPI } from '../api/apiService';

export default function Feed() {
    const [wardFilter, setWardFilter] = useState('Nairobi Central Ward');
    const { data: postsData, loading, error } = useApi(() => feedAPI.getPosts({ wardId: wardFilter }));
    
    const posts = postsData?.data?.posts || [];
    
    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-400">Loading feed...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left: Feed Content */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    {/* Feed Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                {wardFilter}
                            </div>
                            <h2 className="text-3xl font-black tracking-tight text-white mb-2">Ward Activity Feed</h2>
                            <p className="text-slate-400 mt-1">Real-time crowdsourced oversight for local infrastructure projects.</p>
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                            <button 
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${wardFilter === 'All Activities' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors'}`}
                                onClick={() => setWardFilter('All Activities')}
                            >
                                All Activities
                            </button>
                            <button 
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${wardFilter === 'Verified Only' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors'}`}
                                onClick={() => setWardFilter('Verified Only')}
                            >
                                Verified Only
                            </button>
                            <button 
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${wardFilter === 'Infrastructure' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors'}`}
                                onClick={() => setWardFilter('Infrastructure')}
                            >
                                Infrastructure
                            </button>
                            <button 
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${wardFilter === 'Health' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors'}`}
                                onClick={() => setWardFilter('Health')}
                            >
                                Health
                            </button>
                        </div>
                    </div>

                    {/* Activity Cards Feed */}
                    <div className="space-y-6">
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <div key={index} className="bg-navy-deep rounded-xl border border-slate-800 overflow-hidden shadow-lg shadow-black/20">
                                    <div className="p-4 flex items-center justify-between border-b border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-slate-700 overflow-hidden">
                                                <img className="size-full object-cover" src={post.author.avatar} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white flex items-center gap-1">
                                                    {post.author.name}
                                                    {post.author.verified && (
                                                        <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                                    )}
                                                </p>
                                                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                                                    {new Date(post.timestamp).toLocaleDateString()} • {post.author.verified ? 'Verified Contributor' : 'Citizen'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`px-2.5 py-1 text-[10px] font-black uppercase rounded border ${post.status === 'on_schedule' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                            {post.status === 'on_schedule' ? 'On Schedule' : 'Delay Reported'}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                                            {post.content}
                                        </p>
                                        {post.images && post.images.length > 0 && (
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                {post.images.slice(0, 2).map((image, imgIndex) => (
                                                    <div key={imgIndex} className="aspect-video rounded-lg overflow-hidden relative group">
                                                        <img className="size-full object-cover transition-transform duration-500 group-hover:scale-110" src={image} />
                                                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px]">push_pin</span> Geo-tagged
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                                                    <span className="text-xs font-bold">{post.likes}</span>
                                                </button>
                                                <button className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                                    <span className="text-xs font-bold">{post.comments}</span>
                                                </button>
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-medium">Ref ID: {post.referenceId}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-4xl text-slate-600 mb-4">feed</span>
                                <p className="text-slate-500 text-lg">No posts found for this ward</p>
                                <p className="text-slate-400 mt-2">Be the first to share an update from this area</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Ward Map & Stats */}
                <div className="xl:col-span-4 flex flex-col gap-8">
                    {/* Ward Map Widget */}
                    <div className="bg-navy-deep rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-lg shadow-black/20">
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">map</span>
                                Ward Heatmap
                            </h3>
                            <button className="text-primary text-xs font-bold hover:underline">Expand</button>
                        </div>
                        <div className="relative h-64 bg-slate-900 overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center grayscale opacity-50" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBohPvxySYpEzIvuICxgsRk6fMmPfDjo41Mg6gotitmXNT0_m2zD7WU5V4whykAuKW2JIN-dlcKy-71iupj6azBY5YSMsr0K7oLrZj53yUcn3-RYfYwHO1bvVi-sf4a8DLohEmnX4XeLmd7uzgYPqM-eJHyJ27j-pRS1Mb6MQas5_Mo4Zi820RbDRZrXehNlZV4mDBoxvGJERCs2_JNcWslJdyHGDtmhxt8qmk425ZeIZLhK-UpNOK3DLcCiE6oLuo6O77h1RCy1U')" }}>
                            </div>
                            <div className="absolute top-1/2 left-1/3 size-6 bg-primary/30 rounded-full flex items-center justify-center animate-pulse">
                                <div className="size-2 bg-primary rounded-full shadow-[0_0_10px_#1152d4]"></div>
                            </div>
                            <div className="absolute top-1/4 right-1/4 size-6 bg-green-500/30 rounded-full flex items-center justify-center">
                                <div className="size-2 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="absolute bottom-1/3 left-1/2 size-6 bg-amber-500/30 rounded-full flex items-center justify-center">
                                <div className="size-2 bg-amber-500 rounded-full"></div>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-background-dark/90 backdrop-blur-md p-2 rounded-lg border border-slate-700 text-[10px]">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="size-2 rounded-full bg-green-500"></span><span className="text-slate-300">On Track (12)</span>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="size-2 rounded-full bg-amber-500"></span><span className="text-slate-300">At Risk (3)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-red-500"></span><span className="text-slate-300">Stalled (1)</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/50">
                            <p className="text-xs text-slate-400 italic">Showing active procurement sites in Central Ward. Click pins for site-specific media.</p>
                        </div>
                    </div>

                    {/* Community Leaders Section */}
                    <div className="bg-navy-deep rounded-xl border border-slate-800 p-5 shadow-lg shadow-black/20">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                            Active Ward Leaders
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-slate-700"></div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white">Alice Wanjiru</p>
                                        <p className="text-[10px] text-slate-500">Verified Oversight Official</p>
                                    </div>
                                </div>
                                <button className="text-primary text-[10px] font-black uppercase tracking-wider border border-primary/30 px-2 py-1 rounded">Message</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-slate-700"></div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white">Omondi Otieno</p>
                                        <p className="text-[10px] text-slate-500">Community Auditor</p>
                                    </div>
                                </div>
                                <button className="text-primary text-[10px] font-black uppercase tracking-wider border border-primary/30 px-2 py-1 rounded">Message</button>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors">
                            View All Officials
                        </button>
                    </div>

                    {/* Ward Impact Card */}
                    <div className="bg-primary/10 rounded-xl border border-primary/30 p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <span className="material-symbols-outlined text-[120px]">trending_up</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Ward Integrity Score</p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-4xl font-black text-white">84</h4>
                                <span className="text-green-500 text-sm font-bold">+2.4% this month</span>
                            </div>
                            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                                Nairobi Central currently ranks #3 in project transparency nationwide. Keep uploading photos to maintain accountability!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
