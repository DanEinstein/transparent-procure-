import { useState, useEffect } from 'react';

export default function Feed() {
    const [wardFilter, setWardFilter] = useState('All Activities');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // DIRECT FETCH APPROACH (Bypassing useApi wrapper)
    useEffect(() => {
        setLoading(true);
        
        // Construct the URL with the query parameter if needed
        const url = wardFilter === 'All Activities' 
            ? `${import.meta.env.VITE_API_BASE_URL}/posts`
            : `${import.meta.env.VITE_API_BASE_URL}/posts?wardId=${encodeURIComponent(wardFilter)}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                // DEFENSIVE PARSING: Handle the data whether it's flat or nested
                if (Array.isArray(data)) {
                    setPosts(data); // If backend returns flat list
                } else if (data?.data?.posts) {
                    setPosts(data.data.posts); // If backend returns nested dict
                } else {
                    console.warn("Unexpected data format:", data);
                    setPosts([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Feed Sync Error:", err);
                setLoading(false);
            });
    }, [wardFilter]); // Re-runs every time you click a filter button

    // Utility to calculate dynamic stats for the sidebar
    const stats = {
        onTrack: posts.filter(p => p.status === 'on_schedule').length,
        atRisk: posts.filter(p => p.status === 'delay_reported').length,
        total: posts.length
    };
    
    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center bg-background-dark">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-400 font-mono text-sm tracking-widest uppercase">Syncing Ward Data...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-background-dark text-slate-200">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Left: Feed Content */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    {/* Dynamic Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                {wardFilter === 'All Activities' ? 'Nationwide Coverage' : wardFilter}
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter text-white mb-2 italic">Ward Activity Feed</h2>
                            <p className="text-slate-500 text-sm max-w-md">Real-time crowdsourced oversight for {wardFilter} projects.</p>
                        </div>

                        {/* Filter Logic: These buttons now update the wardFilter state */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {['All Activities', 'Nairobi Central Ward', 'Infrastructure', 'Health'].map((filter) => (
                                <button 
                                    key={filter}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all duration-300 ${
                                        wardFilter === filter 
                                        ? 'bg-primary text-white shadow-[0_0_15px_rgba(17,82,212,0.4)]' 
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700'
                                    }`}
                                    onClick={() => setWardFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Activity Cards Feed */}
                    <div className="space-y-6">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="bg-surface-dark rounded-xl border border-slate-800/50 overflow-hidden hover:border-slate-700 transition-all duration-300 group">
                                    <div className="p-4 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/30">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full border-2 border-slate-800 overflow-hidden p-0.5">
                                                <img className="size-full rounded-full object-cover" src={post.author?.avatar} alt="author" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white flex items-center gap-1">
                                                    {post.author?.name}
                                                    {post.author?.verified && (
                                                        <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                                                    )}
                                                </p>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                                    {new Date(post.timestamp).toLocaleDateString()} • {post.county || 'Local Update'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-full border ${
                                            post.status === 'on_schedule' 
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                        }`}>
                                            {post.status?.replace('_', ' ')}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-4">{post.content}</p>
                                        
                                        {post.images?.length > 0 && (
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                {post.images.slice(0, 2).map((image, idx) => (
                                                    <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-slate-800 relative group/img">
                                                        <img className="size-full object-cover group-hover/img:scale-105 transition-transform duration-700" src={image} alt="site-evidence" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                                                    <span className="text-xs font-black">{post.likes || 0}</span>
                                                </button>
                                                <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                                    <span className="text-xs font-black">{post.comments || 0}</span>
                                                </button>
                                            </div>
                                            <div className="text-[10px] text-slate-600 font-mono uppercase">REF: {post.referenceId}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                                <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">location_off</span>
                                <p className="text-slate-500 text-lg font-bold">No verified reports for {wardFilter}</p>
                                <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest">Awaiting citizen synchronization...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Ward Map & Dynamic Stats */}
                <div className="xl:col-span-4 flex flex-col gap-8">
                    {/* Map Widget (Static for MVP but with dynamic labels) */}
                    <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                            <h3 className="font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[18px]">explore</span>
                                Surveillance Map
                            </h3>
                        </div>
                        <div className="relative h-64 bg-slate-900 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/36.82,1.29,12/400x300?access_token=YOUR_TOKEN')] bg-cover opacity-80">
                            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-[9px] font-bold">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="size-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-slate-300 uppercase">On Track ({stats.onTrack})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-amber-500"></span>
                                    <span className="text-slate-300 uppercase">Alerts ({stats.atRisk})</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ward Integrity Score (Dynamic Mock) */}
                    <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                            <span className="material-symbols-outlined text-[140px]">verified_user</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Local Integrity Score</p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-5xl font-black text-white">{stats.total > 0 ? 84 : 0}</h4>
                                <span className="text-emerald-500 text-xs font-black uppercase">+2.4%</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
                                {wardFilter} transparency rating based on {stats.total} crowdsourced data points.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}