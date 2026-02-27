export default function Topbar() {
    return (
        <header className="h-16 flex items-center justify-between px-8 bg-navy-deep border-b border-slate-800 shrink-0">
            <div className="flex-1 max-w-2xl mx-auto">
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-[20px]">search</span>
                    <input className="w-full bg-navy-darker border border-slate-700 rounded-full py-2 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all text-slate-200 placeholder:text-slate-500" placeholder="Search by KRA PIN, Company Name, or Tender Ref..." type="text" />
                </div>
            </div>
            <div className="flex items-center gap-4 ml-8">
                <button className="relative p-2 text-slate-400 hover:text-white bg-slate-800/30 rounded-lg">
                    <span className="material-symbols-outlined text-[24px]">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-navy-deep"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                    <div className="text-right">
                        <p className="text-xs font-bold text-white">Public Oversight</p>
                        <p className="text-[10px] text-primary">Admin Access</p>
                    </div>
                    <img alt="User Profile" className="w-10 h-10 rounded-full border border-primary/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKYvEE6N2eATxb4kvI9Jt-bFpRQeS-F2gXd9X5iOIvdXNl8awsWosPZeQmBYdVqG4Yl63hwL70mUvjUBShMczw8NuIYT-rCDpfvho8t4bXS71Q8A7x0fr0uoSktOYAZBgGqaDQurFiVuTbeCunVP2VkCSnJuTT6IUzzPqV8ayWksOIY_SPCP7NnHufDae5nZKREnfg5Cg6m3QxbcHj5Jo8ZxR1mPFb7Gp6u7vdj2I6ozdcZUEcEFFJ0QTH95U71_PFdN3Ss1PKgSw" />
                </div>
            </div>
        </header>
    );
}
