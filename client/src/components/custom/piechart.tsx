"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PieChartData {
    _id: string;
    amount: number;
    color?: string;
}

interface Props {
    title?: string;
    data: PieChartData[];
}

const DEFAULT_COLORS = [
    "#9F7AEA",
    "#FB923C",
    "#EF4444",
    "#10B981",
    "#3B82F6",
    "#FACC15",
    "#F472B6",
];

export default function DonutPieChart({
    title = "Financial Overview",
    data,
}: Props) {

    function formatKey(str: string): string {
        const words = str.split(/(?=[A-Z])/);
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(" ");
    }

    const chartData = data.map((item, index) => ({
        ...item,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));

    const totalValue = chartData.reduce((sum, item) => sum + item.amount, 0);

    return (
        <Card className="shadow-md rounded-2xl bg-white">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 border-b">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="amount"
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="80%"
                                paddingAngle={3}
                                startAngle={90}
                                endAngle={-270}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                            ${totalValue}
                        </p>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {chartData.map((item) => (
                        <div key={item._id!} className="flex items-center space-x-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-700 text-sm">{formatKey(item._id!)}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

