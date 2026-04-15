import React, { useEffect, useState } from 'react';
import { Activity, Users, Building2, UserPlus } from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import adminService from '../../services/adminService';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-500' },
        { label: 'Platform Startups', value: stats?.totalCompanies || 0, icon: Building2, color: 'text-[#ff5a00]' },
        { label: 'Active Founders', value: stats?.activeFounders || 0, icon: Activity, color: 'text-emerald-500' },
        { label: 'Active Talent', value: stats?.activeTalent || 0, icon: UserPlus, color: 'text-purple-500' },
    ];

    return (
        <div className="py-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Platform Pulse</h1>
            <p className="text-gray-500 font-medium mb-10">Real-time analytical overview of the Tasyai ecosystem.</p>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="size-10 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {statCards.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between group hover:border-[#ff5a00] transition-colors relative overflow-hidden">
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-2">{stat.label}</p>
                                        <h3 className="text-4xl font-black text-gray-900 leading-none">{stat.value}</h3>
                                    </div>
                                    <div className={`p-4 bg-gray-50 border border-gray-100 rounded-lg ${stat.color} group-hover:scale-110 transition-transform relative z-10`}>
                                        <Icon className="size-6" strokeWidth={2.5} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Growth Analytics Chart */}
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-8">
                        <div className="mb-8">
                            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Ecosystem Growth Pattern</h2>
                            <p className="text-sm font-medium text-gray-500 mt-1">7-Day Trajectory Analysis</p>
                        </div>
                        
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={stats?.graphData || []}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                        dx={-10}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111', borderRadius: '4px', border: 'none', color: '#fff', fontWeight: 'bold' }}
                                        itemStyle={{ fontSize: '13px' }}
                                    />
                                    <Legend 
                                        wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        name="Total Network Nodes (Users)"
                                        dataKey="users" 
                                        stroke="#111111" 
                                        strokeWidth={3} 
                                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                                        activeDot={{ r: 6, stroke: '#ff5a00', strokeWidth: 2 }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        name="Verified Startups"
                                        dataKey="startups" 
                                        stroke="#ff5a00" 
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
