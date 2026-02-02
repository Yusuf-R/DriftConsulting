// components/admin/dashboard/ChartsSection.tsx
"use client";

import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import type { ProjectsByCategory, MonthlyRevenue } from "@/lib/types/dashboard";

interface ChartsSectionProps {
    projectsByCategory: ProjectsByCategory[];
    monthlyRevenue: MonthlyRevenue[];
}

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

export default function ChartsSection({
                                          projectsByCategory,
                                          monthlyRevenue,
                                      }: ChartsSectionProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Revenue Trend (₦M)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="month"
                            stroke="#64748b"
                            style={{ fontSize: "12px" }}
                        />
                        <YAxis
                            stroke="#64748b"
                            style={{ fontSize: "12px" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "none",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={{ fill: "#f59e0b", r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Projects by Category Chart */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Projects by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={projectsByCategory}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(props: any) => `${props.category}: ${props.count}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                        >
                            {projectsByCategory.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "none",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Monthly Projects Bar Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 lg:col-span-2"
            >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Monthly Projects Completed
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="month"
                            stroke="#64748b"
                            style={{ fontSize: "12px" }}
                        />
                        <YAxis
                            stroke="#64748b"
                            style={{ fontSize: "12px" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "none",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                        />
                        <Bar
                            dataKey="projects"
                            fill="url(#colorGradient)"
                            radius={[8, 8, 0, 0]}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}