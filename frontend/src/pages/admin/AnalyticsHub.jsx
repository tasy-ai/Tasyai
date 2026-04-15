import React, { useEffect, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import adminService from '../../services/adminService';

const COLORS = ['#ff5a00', '#111111', '#6f42c1', '#10b981', '#f59e0b', '#3b82f6'];

const AnalyticsHub = () => {
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-40">
                <div className="size-10 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { usersByRole = [], companiesByIndustry = [] } = stats || {};

    return (
        <div className="py-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Analytics Hub</h1>
            <p className="text-gray-500 font-medium mb-10">Advanced demographic and industry breakdowns.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Users by Role Graph */}
                <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-8 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Network Demographics</h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">Users Segmented by Selected Role</p>
                    </div>
                    
                    <div className="h-[350px] w-full flex-1">
                        {usersByRole.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={usersByRole} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
                                        allowDecimals={false}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111', borderRadius: '4px', border: 'none', color: '#fff', fontWeight: 'bold' }}
                                        itemStyle={{ fontSize: '13px' }}
                                        cursor={{ fill: '#F3F4F6' }}
                                    />
                                    <Bar dataKey="value" name="Total Users" radius={[4, 4, 0, 0]}>
                                        {usersByRole.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                Insufficient Data for Demographics
                            </div>
                        )}
                    </div>
                </div>

                {/* Companies by Industry Graph */}
                <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-8 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Market Distribution</h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">Startups Segmented by Industry Sector</p>
                    </div>
                    
                    <div className="h-[350px] w-full flex items-center justify-center flex-1">
                        {companiesByIndustry.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={companiesByIndustry}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {companiesByIndustry.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111', borderRadius: '4px', border: 'none', color: '#fff', fontWeight: 'bold' }}
                                        itemStyle={{ fontSize: '13px', color: '#fff' }}
                                    />
                                    <Legend 
                                        layout="vertical" 
                                        verticalAlign="middle" 
                                        align="right"
                                        wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', tracking: 'widest' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                Insufficient Data for Markets
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsHub;
