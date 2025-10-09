import BarChartComponent from "@/components/custom/barchart";
import TransactionList from "@/components/custom/transactionList";
import AddDialog from "@/components/custom/addDialog";
import api from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function Income() {

    const {data , isLoading} = useQuery({
        queryKey : ["income"],
        queryFn : async()=>{
            const response = await api.get("/income/")
            return response.data.data
        }
    })

    if(isLoading) return <div>Loading</div>

    return (
        <>
            <div className="flex flex-col gap-4">
                <BarChartComponent data={data} title="Income Trend" />

                <TransactionList data={data} title="Income">
                    <AddDialog type="income" title="Add New Income" text="Add Income" />
                </TransactionList>
            </div>
        </>
    )
}

