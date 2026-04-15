import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    Building2, 
    LogOut,
    ShieldCheck,
    BarChart2
} from 'lucide-react';
import authService from '../../services/authService';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        authService.logout();
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Pulse Overview' },
        { path: '/admin/analytics', icon: BarChart2, label: 'Analytics Hub' },
        { path: '/admin/users', icon: Users, label: 'User Operations' },
        { path: '/admin/companies', icon: Building2, label: 'Startup Hub' }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex font-sans antialiased text-gray-900">
            {/* Sidebar - Light Theme */}
            <aside className="w-64 bg-white flex flex-col border-r border-gray-200 fixed h-full z-20 shadow-sm">
                <div className="h-20 flex items-center px-8 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-[#ff5a00]/10 rounded-md">
                            <ShieldCheck className="size-5 text-[#ff5a00]" strokeWidth={2.5} />
                        </div>
                        <span className="text-lg font-black tracking-widest uppercase text-gray-900">Admin</span>
                    </div>
                </div>

                <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-bold text-sm transition-all ${
                                    isActive 
                                        ? 'bg-[#ff5a00] text-white shadow-md shadow-orange-500/20' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <Icon className="size-5" strokeWidth={2.5} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm font-bold text-sm transition-all shadow-sm border border-transparent hover:border-red-100"
                    >
                        <LogOut className="size-5" strokeWidth={2.5} />
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-10 min-h-screen relative">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
