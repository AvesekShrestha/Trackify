import { Card, CardContent } from "../ui/card";
import { ReactNode } from "react";

interface BalanceCardProps {
    children: ReactNode;
    title: string;
    amount: string | number;
}

const colorMapping: Record<string, { bg: string; text: string }> = {
    "Total Balance": { bg: "bg-purple-100", text: "text-purple-600" },
    "Total Income": { bg: "bg-orange-100", text: "text-orange-600" },
    "Total Expense": { bg: "bg-red-100", text: "text-red-600" },
};

export default function BalanceCard({
    children,
    title,
    amount,
}: BalanceCardProps) {
    const colors = colorMapping[title] || { bg: "bg-gray-100", text: "text-gray-600" };

    return (
        <Card className="w-full shadow-sm rounded-lg py-0">
            <CardContent className="p-0">
                <div className="flex items-center gap-4 p-6">
                    <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} ${colors.text}`}
                    >
                        {children}
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-500">{title}</span>
                        <span className="text-xl font-bold text-gray-900">{amount}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
