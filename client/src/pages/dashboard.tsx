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
    const {
        isLoading: isBalanceLoading,
        isError: isBalanceError,
        error: balanceError,
        data: balance,
    } = useQuery({
        queryKey: ["balance"],
        queryFn: async () => {
            const response = await api.get("/report/balance");
            return response.data.data;
        },
    });
    const {
        isLoading: isMonthlyIncomeLoading,
        isError: isMonthlyIncomeError,
        error: monthlyIncomeError,
        data: monthlyIncome,
    } = useQuery({
        queryKey: ["monthlyIncome"],
        queryFn: async () => {
            const response = await api.get("/report/monthlyIncome");
            return response.data.data;
        },
    });

    const {
        isLoading: isMonthlyExpenseLoading,
        isError: isMonthlyExpenseError,
        error: monthlyExpenseError,
        data: monthlyExpense,
    } = useQuery({
        queryKey: ["monthlyExpense"],
        queryFn: async () => {
            const response = await api.get("/report/monthlyExpense");
            return response.data.data;
        },
    });

    if (isRecentLoading || isIncomeLoading || isExpenseLoading || isBalanceError || isMonthlyExpenseError || isMonthlyIncomeError) return <div>Loading...</div>;
    if (isRecentError) return <div>Error: {recentError.message}</div>;
    if (isIncomeError) return <div>Error: {incomeError.message}</div>;
    if (isExpenseError) return <div>Error: {expenseError.message}</div>;
    if (isBalanceError) return <div>Error: {balanceError.message}</div>;
    if (isMonthlyExpenseError) return <div>Error: {monthlyIncomeError.message}</div>;
    if (isMonthlyExpenseError) return <div>Error: {monthlyExpenseError.message}</div>;

    function formatKey(str: string): string {
        const words = str.split(/(?=[A-Z])/);
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(" ");
    }

    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-col md:flex-row justify-between gap-4">
                {
                    balance.map((b: any) => {
                        return (
                            <BalanceCard amount={b.amount} title={formatKey(b._id!)} key={b._id!}>
                                <Wallet />
                            </BalanceCard>
                        )
                    })
                }
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
                        data={balance}
                    />
                </div>
            </div>

            {/* Income Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <ScrollableBarChart data={monthlyIncome} title="Monthly Income" />
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
                        data={monthlyExpense}
                        title="Monthly Expense"
                    />
                </div>
            </div>
        </div>
    );
}

