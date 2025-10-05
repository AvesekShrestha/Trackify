import BalanceCard from "@/components/custom/balanceCard";
import {
  Wallet,
  CreditCard,
  ShoppingCart,
  Briefcase,
  DollarSign,
  Heart,
  Coffee,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios";
import { IIncome } from "@/types/income.types";
import formatDate from "@/utils/dateFormater";
import { JSX } from "react";

const incomeIconMap: Record<string, JSX.Element> = {
  Salary: <DollarSign className="text-green-600" />,
  Business: <Briefcase className="text-green-600" />,
  Investment: <CreditCard className="text-green-600" />,
  Other: <Wallet className="text-green-600" />,
};

const expenseIconMap: Record<string, JSX.Element> = {
  Food: <Coffee className="text-red-600" />,
  Health: <Heart className="text-red-600" />,
  Shopping: <ShoppingCart className="text-red-600" />,
  Other: <Wallet className="text-red-600" />,
};

export default function Dashboard() {
  const fetchRecent = async () => {
    const response = await api.get("/report/recent");
    return response.data.data;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["recents"],
    queryFn: fetchRecent,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:justify-around gap-7">
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

      <div className="flex flex-col gap-4 md:flex-row lg:flex-row xl:flex-row">
        <div className="shadow-sm w-full flex flex-col md:w-1/2 lg:w-1/2 bg-white rounded-xl p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 border-b pb-2 mb-3">
            Recent Transactions
          </h2>

          {data.map((element: IIncome) => {
            const isIncome = element.type === "income";

            const Icon = isIncome
              ? incomeIconMap[element.source!] || <Wallet className="text-green-600" />
              : expenseIconMap[element.category!] || <Wallet className="text-red-600" />;

            return (
              <div
                key={element._id}
                className="flex justify-between items-center p-4 hover:bg-gray-100 transition-all "
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full flex items-center justify-center ${isIncome ? "bg-green-200" : "bg-red-200"
                      }`}
                  >
                    {Icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {isIncome ? element.source : element.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(element.date)}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full ${isIncome ? "bg-green-100" : "bg-red-100"
                    }`}
                >
                  <span
                    className={`font-semibold ${isIncome ? "text-green-800" : "text-red-800"
                      }`}
                  >
                    {isIncome ? `+ ${element.amount}` : `- ${element.amount}`}
                  </span>
                  {isIncome ? (
                    <TrendingUp className="text-green-600" />
                  ) : (
                    <TrendingDown className="text-red-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="shadow-sm w-[50%]">div 2</div>
      </div>
    </div>
  );
}
