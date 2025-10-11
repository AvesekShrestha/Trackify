import BarChartComponent from "@/components/custom/barchart";
import TransactionList from "@/components/custom/transactionList";
import AddDialog from "@/components/custom/addDialog";
import api from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { formatReportData } from "@/utils/dataFormater";

export default function Expense() {

  const { data, isLoading } = useQuery({
    queryKey: ["expense"],
    queryFn: async () => {
      const response = await api.get("/expense/")
      return response.data.data
    }
  })

  if(isLoading) return <div>Loading</div>

  return (
    <>
      <div className="flex flex-col gap-4">
        <BarChartComponent data={formatReportData(data)} title="Expense Trend" />

        <TransactionList data={data} title="Expense">
          <AddDialog type="expense" title="Add New Expense" text="Add Expense" />
        </TransactionList>
      </div>
    </>
  )
}

