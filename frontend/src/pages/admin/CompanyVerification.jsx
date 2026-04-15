import React, { useEffect, useState } from 'react';
import { Search, Building2, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import adminService from '../../services/adminService';

const CompanyVerification = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const data = await adminService.getCompanies();
            setCompanies(data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (id) => {
        try {
            await adminService.verifyCompany(id);
            fetchCompanies();
            alert('Verification request processed');
        } catch (error) {
            alert(error.response?.data?.message || 'Error verifying company');
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("WARNING: This will permanently delete this startup from the platform. Proceed?");
        if (confirmed) {
            try {
                await adminService.deleteCompany(id);
                fetchCompanies();
            } catch (error) {
                alert(error.response?.data?.message || 'Error executing delete');
            }
        }
    };

    const filteredCompanies = companies.filter(company => 
        company.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Startup Verification</h1>
                    <p className="text-gray-500 font-medium">Review and verify network entries to maintain high conviction.</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input 
                        type="text" 
                        placeholder="Search by name or industry..." 
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanies.map(company => (
                        <div key={company._id} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col group hover:border-[#ff5a00] transition-colors">
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="size-12 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center shrink-0 overflow-hidden">
                                        {company.logo ? (
                                            <img src={company.logo} alt="Logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <Building2 className="text-gray-400 size-6" />
                                        )}
                                    </div>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-sm border border-gray-200">
                                        {company.industry}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">{company.name}</h3>
                                <p className="text-sm font-bold text-[#ff5a00] mb-4">{company.tagline}</p>
                                
                                <div className="space-y-2 mb-6">
                                    <p className="text-xs text-gray-500 font-medium line-clamp-2">
                                        {company.description}
                                    </p>
                                    <p className="text-xs text-gray-400 font-bold">
                                        Founder: {company.creator?.name || 'Unknown'}
                                    </p>
                                    <p className="text-xs text-gray-400 font-bold">
                                        Stage: {company.fundingStage}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                                <button 
                                    onClick={() => handleVerify(company._id)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-[#e04e00] text-white px-4 py-2 rounded-sm font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                                >
                                    <CheckCircle2 className="size-4" strokeWidth={3} /> Verify Node
                                </button>
                                
                                <button 
                                    onClick={() => handleDelete(company._id)}
                                    className="px-4 py-2 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-400 rounded-sm transition-all focus:outline-none flex items-center justify-center group"
                                    title="Eradicate Startup"
                                >
                                    <Trash2 className="size-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {filteredCompanies.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-500 font-medium text-sm border-2 border-dashed border-gray-200 rounded-sm">
                            No startups requiring action.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompanyVerification;
