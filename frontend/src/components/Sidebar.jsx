import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="w-64 flex flex-col bg-navy-darker border-r border-slate-800 shrink-0 h-screen">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary rounded-lg p-1">
                    <span className="material-symbols-outlined text-navy-darker font-bold">shield_with_heart</span>
                </div>
                <div>
                    <h1 className="text-white text-sm font-black leading-tight tracking-tight">TRANSPARENT</h1>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest leading-none">Procure Kenya</p>
                </div>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
                <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px] fill-1">dashboard</span>
                    <span className="text-sm font-semibold">Dashboard</span>
                </NavLink>
                <NavLink to="/feed" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    <span className="text-sm font-medium">Community Feed</span>
                </NavLink>
                <NavLink to="/registry" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">business_center</span>
                    <span className="text-sm font-medium">Contractors</span>
                </NavLink>
                <NavLink to="/fraud" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">analytics</span>
                    <span className="text-sm font-medium">Fraud Monitoring</span>
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">summarize</span>
                    <span className="text-sm font-medium">Reports</span>
                </NavLink>
                <NavLink to="/audit" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">fact_check</span>
                    <span className="text-sm font-medium">Audit</span>
                </NavLink>
                <div className="pt-6 pb-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase px-3 tracking-widest">Settings</p>
                </div>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                    <span className="text-sm font-medium">Configuration</span>
                </a>
            </nav>
            <div className="p-4 border-t border-slate-800">
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-navy-darker font-bold py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">ios_share</span>
                    Export Report
                </button>
            </div>
        </aside>
    );
}
