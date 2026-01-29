// components/Admin/DriftDashboard/Contact.tsx
'use client';

import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    Mail,
    Phone,
    MapPin,
    Calendar,
    MessageSquare,
    ChevronRight,
    X,
    CheckCircle,
    Clock,
    Eye,
    Edit,
    Trash2,
} from 'lucide-react';
import { getMockContacts } from '@/lib/data/mockProjectsContactsData';
import { ContactsResult } from '@/lib/types';

type ContactStatus = 'all' | 'new' | 'contacted' | 'in-discussion' | 'converted' | 'closed';
type ProjectType = 'all' | 'residential' | 'commercial' | 'institutional' | 'hospitality' | 'government';

interface ContactProps {
    initialData: ContactsResult;
}

export default function Contact({ initialData }: ContactProps) {
    const [contacts, setContacts] = useState(initialData.contacts);
    const [pagination, setPagination] = useState({
        page: initialData.page,
        total: initialData.total,
        hasMore: initialData.hasMore,
    });
    const [usedMockData] = useState(initialData.usedMockData);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ContactStatus>('all');
    const [projectTypeFilter, setProjectTypeFilter] = useState<ProjectType>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    // Load more contacts
    const loadMoreContacts = async () => {
        if (!pagination.hasMore || isPending) return;

        startTransition(async () => {
            try {
                const response = await fetch(
                    `/api/v1/contacts?page=${pagination.page + 1}&limit=100&status=${statusFilter}&projectType=${projectTypeFilter}&search=${searchTerm}`
                );
                const data = await response.json();

                if (data.success) {
                    setContacts(prev => [...prev, ...data.contacts]);
                    setPagination({
                        page: data.pagination.page,
                        total: data.pagination.total,
                        hasMore: data.pagination.hasMore,
                    });
                }
            } catch (error) {
                console.error('Error loading more contacts:', error);
            }
        });
    };

    // Filter contacts client-side
    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => {
            const matchesSearch =
                contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.scope?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
            const matchesProjectType = projectTypeFilter === 'all' || contact.projectType === projectTypeFilter;

            return matchesSearch && matchesStatus && matchesProjectType;
        });
    }, [contacts, searchTerm, statusFilter, projectTypeFilter]);

    // Stats
    const stats = useMemo(() => ({
        total: contacts.length,
        new: contacts.filter(c => c.status === 'new').length,
        contacted: contacts.filter(c => c.status === 'contacted').length,
        inDiscussion: contacts.filter(c => c.status === 'in-discussion').length,
        converted: contacts.filter(c => c.status === 'converted').length,
    }), [contacts]);

    const statusConfig = {
        new: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Mail },
        contacted: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Phone },
        'in-discussion': { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: MessageSquare },
        converted: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle },
        closed: { color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400', icon: X },
    };

    const formatDate = (date?: Date) => {
        if (!date) return 'N/A';
        const now = new Date();
        const contactDate = new Date(date);
        const diff = now.getTime() - contactDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return contactDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contacts</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Manage client inquiries and leads
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: 'Total', value: stats.total, color: 'from-blue-500 to-cyan-500' },
                    { label: 'New', value: stats.new, color: 'from-green-500 to-emerald-500' },
                    { label: 'Contacted', value: stats.contacted, color: 'from-yellow-500 to-amber-500' },
                    { label: 'In Discussion', value: stats.inDiscussion, color: 'from-purple-500 to-pink-500' },
                    { label: 'Converted', value: stats.converted, color: 'from-indigo-500 to-purple-500' },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
                    >
                        <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search contacts by name, email, location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as ContactStatus)}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="in-discussion">In Discussion</option>
                                    <option value="converted">Converted</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Project Type
                                </label>
                                <select
                                    value={projectTypeFilter}
                                    onChange={(e) => setProjectTypeFilter(e.target.value as ProjectType)}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Types</option>
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="institutional">Institutional</option>
                                    <option value="hospitality">Hospitality</option>
                                    <option value="government">Government</option>
                                </select>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Contacts Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Project Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Budget
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredContacts.map((contact, idx) => {
                            const StatusIcon = statusConfig[contact.status as keyof typeof statusConfig]?.icon;

                            return (
                                <motion.tr
                                    key={contact._id?.toString()}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white font-semibold text-sm">
                                                        {contact.name?.charAt(0)}
                                                    </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                    {contact.name}
                                                </p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {contact.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className="text-sm text-slate-900 dark:text-white capitalize">
                                                {contact.projectType}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                                            <MapPin className="w-3 h-3" />
                                            <span className="line-clamp-1">{contact.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                {contact.budget || 'Not specified'}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusConfig[contact.status as keyof typeof statusConfig]?.color}`}>
                                                {StatusIcon && <StatusIcon className="w-3 h-3" />}
                                                {contact.status?.replace('-', ' ')}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(contact.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedContact(contact)}
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                title="View details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors text-amber-600 dark:text-amber-400"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-600 dark:text-red-400"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination.hasMore && !usedMockData && (
                <div className="flex justify-center pt-6">
                    <button
                        onClick={loadMoreContacts}
                        disabled={isPending}
                        className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                Load More
                                <ChevronRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Empty State */}
            {filteredContacts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">No contacts found</p>
                </div>
            )}

            {/* Contact Detail Modal */}
            <AnimatePresence>
                {selectedContact && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedContact(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {selectedContact.name}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                                        {selectedContact.email}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedContact(null)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Project Type</p>
                                        <p className="font-semibold text-slate-900 dark:text-white capitalize">
                                            {selectedContact.projectType}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                                        <p className="font-semibold text-slate-900 dark:text-white capitalize">
                                            {selectedContact.status?.replace('-', ' ')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {selectedContact.phone || 'Not provided'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Budget</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {selectedContact.budget || 'Not specified'}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Location</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {selectedContact.location}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Timeline</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {selectedContact.timeline || 'Not specified'}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Project Scope</p>
                                    <p className="text-slate-900 dark:text-white text-sm leading-relaxed">
                                        {selectedContact.scope}
                                    </p>
                                </div>

                                {selectedContact.notes && (
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Notes</p>
                                        <p className="text-slate-900 dark:text-white text-sm leading-relaxed">
                                            {selectedContact.notes}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                                    Update Status
                                </button>
                                <button className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                    Add Notes
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}