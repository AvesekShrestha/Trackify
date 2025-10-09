import BalanceCard from "@/components/custom/balanceCard";
import { Wallet, CreditCard, ShoppingCart, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios";
import DonutPieChart from "@/components/custom/piechart";
import ScrollableBarChart from "@/components/custom/barchart";
import TransactionList from "@/components/custom/transactionList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const {
        isLoading: isRecentLoading,
        isError: isRecentError,
        error: recentError,
        data: recent,
    } = useQuery({
        queryKey: ["recents"],
        queryFn: async () => {
            const response = await api.get("/report/recent");
            return response.data.data;
        },
    });

    const {
        isLoading: isIncomeLoading,
        isError: isIncomeError,
        error: incomeError,
        data: income,
    } = useQuery({
        queryKey: ["income"],
        queryFn: async () => {
            const response = await api.get("/income/");
            return response.data.data;
        },
    });
    const {
        isLoading: isExpenseLoading,
        isError: isExpenseError,
        error: expenseError,
        data: expense,
    } = useQuery({
        queryKey: ["expense"],
        queryFn: async () => {
            const response = await api.get("/expense/");
            return response.data.data;
        },
    });

    if (isRecentLoading || isIncomeLoading || isExpenseLoading) return <div>Loading...</div>;
    if (isRecentError) return <div>Error: {recentError.message}</div>;
    if (isIncomeError) return <div>Error: {incomeError.message}</div>;
    if (isExpenseError) return <div>Error: {expenseError.message}</div>;

    const barGraphData = [
        { date: "2025-10-01", amount: 500 },
        { date: "2025-10-02", amount: 750 },
        { date: "2025-10-03", amount: 300 },
        { date: "2025-10-04", amount: 1200 },
    ];

    return (
        <div className="flex flex-col gap-6">

            {/* Balance Cards */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <BalanceCard amount={20000} title="Total Balance">
                    <Wallet />
                </BalanceCard>
                <BalanceCard amount={income?.total ?? 10000} title="Total Income">
                    <CreditCard />
                </BalanceCard>
                <BalanceCard amount={1000} title="Total Expense">
                    <ShoppingCart />
                </BalanceCard>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <TransactionList data={recent} title="Recent Transactions">
                        <Button
                            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                        >
                            <span>See all</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </TransactionList>
                </div>
                <div className="w-full lg:w-1/2">
                    <DonutPieChart
                        title="Financial Overview"
                        data={[
                            { name: "Total Balance", value: 7000 },
                            { name: "Total Income", value: 10000 },
                            { name: "Total Expense", value: 3000 },
                        ]}
                    />
                </div>
            </div>

            {/* Income Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <ScrollableBarChart data={barGraphData} title="Monthly Income" />
                </div>
                <div className="w-full lg:w-1/2">
                    <TransactionList data={income} title="Income">
                        <Button
                            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                            onClick={() => navigate("/income")}
                        >
                            <span>See all</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </TransactionList>
                </div>
            </div>

            {/* Expense Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <TransactionList data={expense} title="Expense">
                        <Button
                            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                            onClick={() => navigate("/expense")}
                        >
                            <span>See all</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </TransactionList>
                </div>
                <div className="w-full lg:w-1/2">
                    <DonutPieChart
                        data={[
                            { name: "Health", value: 5000 },
                            { name: "Education", value: 2000 },
                            { name: "Rent", value: 3000 },
                            { name: "Entertainment", value: 3000 },
                        ]}
                        title="Monthly Expense"
                    />
                </div>
            </div>
        </div>
    );
}

