// import DonutPieChart from "@/components/custom/piechart"
import BarChartComponent from "@/components/custom/barchart";
import TransactionList from "@/components/custom/transactionList";

export default function Income() {

    const sampleData = [
        { date: "2025-10-01", amount: 400 },
        { date: "2025-10-01", amount: 500 },
        { date: "2025-10-02", amount: 750 },
        { date: "2025-10-03", amount: 300 },
        { date: "2025-10-04", amount: 1200 },
        { date: "2025-10-05", amount: 950 },
        { date: "2025-10-06", amount: 400 },
        { date: "2025-10-07", amount: 1100 },
        { date: "2025-10-08", amount: 850 },
        { date: "2025-10-09", amount: 650 },
        { date: "2025-10-10", amount: 900 },
        { date: "2025-10-01", amount: 500 },
        { date: "2025-10-02", amount: 750 },
        { date: "2025-10-03", amount: 300 },
        { date: "2025-10-04", amount: 1200 },
        { date: "2025-10-05", amount: 950 },
        { date: "2025-10-06", amount: 400 },
        { date: "2025-10-07", amount: 1100 },
        { date: "2025-10-08", amount: 850 },
        { date: "2025-10-09", amount: 650 },
        { date: "2025-10-10", amount: 900 },
        { date: "2025-10-01", amount: 500 },
        { date: "2025-10-02", amount: 750 },
        { date: "2025-10-03", amount: 300 },
        { date: "2025-10-04", amount: 1200 },
        { date: "2025-10-05", amount: 950 },
        { date: "2025-10-06", amount: 400 },
        { date: "2025-10-07", amount: 1100 },
        { date: "2025-10-08", amount: 850 },
        { date: "2025-10-09", amount: 650 },
        { date: "2025-10-10", amount: 900 },
    ];

    return (
        <>
            <div className="flex flex-col gap-4">
                <BarChartComponent data={sampleData} title="Income Trend" />
                <TransactionList data={sampleData} title="Income"/>
            </div>
        </>
    )
}
