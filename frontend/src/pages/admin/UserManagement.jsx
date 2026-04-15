import React, { useEffect, useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, Mail, Activity, Trash2 } from 'lucide-react';
import adminService from '../../services/adminService';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBan = async (id) => {
        try {
            await adminService.banUser(id);
            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating user');
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("WARNING: Operating a hard cascade delete. This will permanently destroy the user and all startups they created. Proceed?");
        if (confirmed) {
            try {
                await adminService.deleteUser(id);
                fetchUsers();
            } catch (error) {
                alert(error.response?.data?.message || 'Error executing hard delete');
            }
        }
    };

    const filteredUsers = users.filter(user =>  
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">User Operations</h1>
                    <p className="text-gray-500 font-medium">Manage platform access and monitor ecosystem actors.</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-[#ff5a00] transition-colors shadow-sm font-medium"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-20">
                    <div className="size-8 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-5 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">Identity</th>
                                    <th className="p-5 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">Role</th>
                                    <th className="p-5 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">Status</th>
                                    <th className="p-5 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 uppercase overflow-hidden border border-gray-200 shrink-0">
                                                    {user.profilePicture ? (
                                                        <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        user.name?.charAt(0) || '?'
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{user.name}</p>
                                                    <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                                        <Mail className="size-3" /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-sm">
                                                {user.role || 'Unassigned'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            {user.role === 'admin' ? (
                                                <span className="flex items-center gap-2 text-[#ff5a00] font-bold text-sm">
                                                    <ShieldCheck className="size-4" /> Admin
                                                </span>
                                            ) : user.role === 'banned' ? (
                                                <span className="flex items-center gap-2 text-red-500 font-bold text-sm">
                                                    <ShieldAlert className="size-4" /> Banned
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                                                    <Activity className="size-4" /> Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5 text-right w-64">
                                            {user.role !== 'admin' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleBan(user._id)}
                                                        className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all ${
                                                            user.role === 'banned' 
                                                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                                                            : 'bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200'
                                                        }`}
                                                    >
                                                        {user.role === 'banned' ? 'Restore' : 'Suspend'}
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => handleDelete(user._id)}
                                                        className="flex items-center justify-center size-8 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-100 rounded-sm transition-all group"
                                                        title="Hard Delete"
                                                    >
                                                        <Trash2 className="size-4" strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-10 text-center text-gray-500 font-medium text-sm">
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
