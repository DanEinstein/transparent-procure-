import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 flex overflow-hidden bg-background-dark text-slate-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
