import BalanceCard from "@/components/custom/balanceCard";
import { Wallet, CreditCard, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios";
import DonutPieChart from "@/components/custom/piechart";
import ScrollableBarChart from "@/components/custom/barchart";
import TransactionList from "@/components/custom/transactionList";

export default function Dashboard() {
    const fetchRecent = async () => {
        const response = await api.get("/report/recent");
        return response.data.data;
    };

    const { isLoading, isError, error, data: recent } = useQuery({
        queryKey: ["recents"],
        queryFn: fetchRecent,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

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
                <BalanceCard amount={10000} title="Total Income">
                    <CreditCard />
                </BalanceCard>
                <BalanceCard amount={1000} title="Total Expense">
                    <ShoppingCart />
                </BalanceCard>
            </div>

            {/* Transactions + Pie Chart */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <TransactionList data={recent} title="Recent Transactions" />
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

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <ScrollableBarChart data={barGraphData} title="Income Summary" />
                </div>
                <div className="w-full lg:w-1/2">
                    <TransactionList data={barGraphData} title="Monthly Income" />
                </div>
            </div>


            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <TransactionList data={recent} title="Expense" />
                </div>
                <div className="w-full lg:w-1/2">
                    <DonutPieChart
                        data={[
                            { name: "Health", value: 5000 },
                            { name: "Eduction", value: 2000 },
                            { name: "Rent", value: 3000 },
                            { name: "Enterinment", value: 3000 },
                        ]}
                        title="Montly Expending" />
                </div>
            </div>
        </div>
    );
}

