// components/Admin/DriftDashboard/Project.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Plus,
    Filter,
    Download,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    MapPin,
    Calendar,
    TrendingUp,
    X,
} from 'lucide-react';
import { getMockProjects } from '@/lib/data/mockProjectsContactsData';
import Image from 'next/image';
import Link from 'next/link';

type ProjectStatus = 'all' | 'ongoing' | 'completed' | 'planned';
type ProjectCategory = 'all' | 'residential' | 'commercial' | 'institutional' | 'hospitality' | 'government';

export default function Project() {
    // TODO: Replace with real data fetch
    const projects = getMockProjects();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProjectStatus>('all');
    const [categoryFilter, setCategoryFilter] = useState<ProjectCategory>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Filter and search logic
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.location?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
            const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [projects, searchTerm, statusFilter, categoryFilter]);

    // Stats
    const stats = useMemo(() => ({
        total: projects.length,
        ongoing: projects.filter(p => p.status === 'ongoing').length,
        completed: projects.filter(p => p.status === 'completed').length,
        planned: projects.filter(p => p.status === 'planned').length,
    }), [projects]);

    const statusColors = {
        ongoing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        planned: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    };

    const categoryColors = {
        residential: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        commercial: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        institutional: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        hospitality: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        government: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Manage your construction projects
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
                    <Link
                        href="/admin/protected/projects/new"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Project</span>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Projects', value: stats.total, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Ongoing', value: stats.ongoing, color: 'from-amber-500 to-orange-500' },
                    { label: 'Completed', value: stats.completed, color: 'from-green-500 to-emerald-500' },
                    { label: 'Planned', value: stats.planned, color: 'from-purple-500 to-pink-500' },
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
                            placeholder="Search projects, clients, locations..."
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
                                    onChange={(e) => setStatusFilter(e.target.value as ProjectStatus)}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="planned">Planned</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Category
                                </label>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value as ProjectCategory)}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                                >
                                    <option value="all">All Categories</option>
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

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => (
                    <motion.div
                        key={project._id?.toString()}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={project.featuredImage || '/placeholder.jpg'}
                                alt={project.title || 'Project'}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[project.status as keyof typeof statusColors]}`}>
                                    {project.status}
                                </span>
                            </div>
                            <div className="absolute top-3 left-3">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${categoryColors[project.category as keyof typeof categoryColors]}`}>
                                    {project.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                                {project.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <MapPin className="w-4 h-4" />
                                    <span>{project.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>{project.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>{project.value}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                                <Link
                                    href={`/admin/protected/projects/${project._id}/edit`}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-sm"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit</span>
                                </Link>
                                <button className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">No projects found</p>
                </div>
            )}

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={selectedProject.featuredImage || '/placeholder.jpg'}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {selectedProject.description}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Client</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{selectedProject.client}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Value</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{selectedProject.value}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{selectedProject.duration}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                                        <p className="font-semibold text-slate-900 dark:text-white capitalize">{selectedProject.status}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}