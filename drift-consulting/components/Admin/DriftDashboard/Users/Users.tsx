// components/Admin/DriftDashboard/Users.tsx
'use client';

import {useState, useMemo} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {
    Search, Filter, UserPlus, Mail, Shield, Clock,
    Eye, Edit, Trash2, MoreVertical, Check, X, ChevronLeft, ChevronRight,
} from 'lucide-react';
import {useMutation} from '@tanstack/react-query';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import AdminUtils from '@/utils/AdminUtils';
import {toast} from 'sonner';
import type {UsersResult} from '@/app/(admin)/admin/protected/users/actions';
import {useSession} from 'next-auth/react';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import ViewUserModal from './ViewUserModal';
import {queryClient} from "@/lib/queryClient"

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'superAdmin' | 'admin' | 'support';
    provider: 'credentials' | 'google';
    image?: string;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface UsersProps {
    initialData: UsersResult;
}

export default function Users({initialData}: UsersProps) {
    const {data: session} = useSession();

    const [users, setUsers] = useState<User[]>(initialData.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Check if current user can create/edit/delete
    const canManageUsers = ['admin', 'superAdmin'].includes(session?.user?.role || '');

    // Table columns definition
    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'User',
                cell: ({row}) => (
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            {row.original.image ? (
                                <img
                                    src={row.original.image}
                                    alt={row.original.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-white font-semibold text-sm">
                                    {row.original.name?.charAt(0) || row.original.email?.charAt(0)}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {row.original.name || 'No name'}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3"/>
                                {row.original.email}
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'role',
                header: 'Role',
                cell: ({row}) => {
                    const roleConfig = {
                        superAdmin: {
                            color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
                            label: 'Super Admin'
                        },
                        admin: {
                            color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                            label: 'Admin'
                        },
                        support: {
                            color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
                            label: 'Support'
                        },
                    };

                    // Add fallback for undefined role
                    const userRole = row.original.role || 'support';
                    const config = roleConfig[userRole as keyof typeof roleConfig] || roleConfig.support;

                    return (
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                <Shield className="w-3 h-3"/>
                            {config.label}
            </span>
                    );
                },
            },
            {
                accessorKey: 'provider',
                header: 'Provider',
                cell: ({row}) => (
                    <span className="text-sm text-slate-900 dark:text-white capitalize">
                        {row.original.provider}
                    </span>
                ),
            },
            {
                accessorKey: 'isActive',
                header: 'Status',
                cell: ({row}) => (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        row.original.isActive
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                        {row.original.isActive ? <Check className="w-3 h-3"/> : <X className="w-3 h-3"/>}
                        {row.original.isActive ? 'Active' : 'Inactive'}
                    </span>
                ),
            },
            {
                accessorKey: 'lastLogin',
                header: 'Last Login',
                cell: ({row}) => {
                    const formatDate = (date?: Date) => {
                        if (!date) return 'Never';
                        const now = new Date();
                        const loginDate = new Date(date);
                        const diff = now.getTime() - loginDate.getTime();
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                        if (days === 0) return 'Today';
                        if (days === 1) return 'Yesterday';
                        if (days < 7) return `${days} days ago`;
                        return loginDate.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'});
                    };

                    return (
                        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                            <Clock className="w-3 h-3"/>
                            {formatDate(row.original.lastLogin)}
                        </div>
                    );
                },
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({row}) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedUser(row.original)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View details"
                        >
                            <Eye className="w-4 h-4"/>
                        </button>
                        {canManageUsers && (
                            <>
                                <button
                                    onClick={() => {
                                        setSelectedUser(row.original);
                                        setShowEditModal(true);
                                    }}
                                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4"/>
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedUser(row.original);
                                        setShowDeleteModal(true);
                                    }}
                                    disabled={session?.user?.id === row.original._id}
                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-600 dark:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title={session?.user?.id === row.original._id ? "Cannot delete yourself" : "Delete"}
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </button>
                            </>
                        )}
                    </div>
                ),
            },
        ],
        [canManageUsers, session?.user?.id]
    );

    const filteredData = useMemo(() => {
        return users.filter(user => {
            const matchesSearch =
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'active' ? user.isActive : !user.isActive);

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchTerm, roleFilter, statusFilter]);

    // Table setup
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    // Stats
    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter(u => u.isActive).length,
        inactive: users.filter(u => !u.isActive).length,
        admins: users.filter(u => ['admin', 'superAdmin'].includes(u.role)).length,
    }), [users]);

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (userId: string) => AdminUtils.deleteUser(userId),
        onSuccess: async () => {
            toast.success('User deleted successfully');
            setUsers(prev => prev.filter(u => u._id !== selectedUser?._id));
            setShowDeleteModal(false);
            setSelectedUser(null);
            await queryClient.invalidateQueries({queryKey: ['users']});
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete user');
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Users</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Manage system users and permissions
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <Filter className="w-4 h-4"/>
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                    {canManageUsers && (
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <UserPlus className="w-4 h-4"/>
                            <span className="hidden sm:inline">Add User</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    {label: 'Total Users', value: stats.total, color: 'from-blue-500 to-cyan-500'},
                    {label: 'Active', value: stats.active, color: 'from-green-500 to-emerald-500'},
                    {label: 'Inactive', value: stats.inactive, color: 'from-red-500 to-pink-500'},
                    {label: 'Admins', value: stats.admins, color: 'from-purple-500 to-indigo-500'},
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: idx * 0.1}}
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: 'auto'}}
                            exit={{opacity: 0, height: 0}}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Role
                                </label>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="superAdmin">Super Admin</option>
                                    <option value="admin">Admin</option>
                                    <option value="support">Support</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Table */}
            <div
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead
                            className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {table.getRowModel().rows.map((row, idx) => (
                            <motion.tr
                                key={row.id}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: idx * 0.03}}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-4">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Showing {table.getRowModel().rows.length} of {filteredData.length} users
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4"/>
                        </button>
                        <div className="flex items-center gap-2 px-4">
                            <span className="text-sm text-slate-900 dark:text-white">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </span>
                        </div>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {filteredData.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">No users found</p>
                </div>
            )}

            {/* Modals */}
            <CreateUserModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={(newUser) => {
                    setUsers(prev => [newUser, ...prev]);
                    queryClient.invalidateQueries({queryKey: ['users']});
                }}
            />

            <EditUserModal
                isOpen={showEditModal}
                user={selectedUser}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                }}
                onSuccess={(updatedUser) => {
                    setUsers(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u));
                    queryClient.invalidateQueries({queryKey: ['users']});
                }}
            />

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                user={selectedUser}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                }}
                onConfirm={() => {
                    if (selectedUser) {
                        deleteMutation.mutate(selectedUser._id);
                    }
                }}
                isDeleting={deleteMutation.isPending}
            />

            {/* View User Detail Modal */}
            <ViewUserModal
                isOpen={!!selectedUser && !showEditModal && !showDeleteModal}
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
            />
        </div>
    );
}