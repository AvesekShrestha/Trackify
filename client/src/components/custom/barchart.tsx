"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Cell
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReportFormatedData } from "@/types/report.type";

interface BarChartProps {
    data: ReportFormatedData[]
    title?: string;
}

export default function ScrollableBarChart({
    data,
    title = "Bar Chart",
}: BarChartProps) {

    const barWidth = 70;
    const chartWidth = Math.max(data.length * barWidth, 500);

    const maxYValue = Math.max(...data.map(item => item.value));

    const reversedData = [...data].reverse();

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
                            <BarChart
                                data={reversedData}
                                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    tickMargin={10}
                                    tickFormatter={(value) => value.length > 10 ? value.slice(0, 10) + "…" : value}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    domain={[0, maxYValue * 1.1]}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    labelFormatter={(label) => label}
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#6366f1"
                                    barSize={40}
                                    radius={[8, 8, 0, 0]}
                                >
                                    {reversedData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color || "#6366f1"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

