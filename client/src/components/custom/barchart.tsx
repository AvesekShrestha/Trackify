"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BarChartProps {
    data: Record<string, any>[];
    xKey?: string;
    yKey?: string;
    title?: string;
}

export default function ScrollableBarChart({
    data,
    xKey = "date",
    yKey = "amount",
    title = "Bar Chart",
}: BarChartProps) {
    const barWidth = 70;
    const chartWidth = Math.max(data.length * barWidth, 500);
    const maxYValue = Math.max(...data.map((d) => d[yKey] ?? 0)) || 100;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    };

    return (
        <Card className="shadow-md rounded-2xl bg-white">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 border-b">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div style={{ minWidth: chartWidth }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey={xKey}
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    tickMargin={10}
                                    tickFormatter={formatDate}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    domain={[0, maxYValue * 1.1]}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    labelFormatter={(label) => formatDate(label)}
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Bar dataKey={yKey} fill="#6366f1" barSize={40} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

