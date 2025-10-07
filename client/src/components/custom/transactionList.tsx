"use client";

import { IIncome } from "@/types/income.types";
import formatDate from "@/utils/dateFormater";
import {
  Wallet,
  CreditCard,
  ShoppingCart,
  Briefcase,
  DollarSign,
  Heart,
  Coffee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TransactionListProps {
  title: string;
  data: IIncome[];
  limit?: number;
  className?: string;
}

const incomeIconMap = {
  Salary: <DollarSign className="text-green-600" />,
  Business: <Briefcase className="text-green-600" />,
  Investment: <CreditCard className="text-green-600" />,
  Other: <Wallet className="text-green-600" />,
};

const expenseIconMap = {
  Food: <Coffee className="text-red-600" />,
  Health: <Heart className="text-red-600" />,
  Shopping: <ShoppingCart className="text-red-600" />,
  Other: <Wallet className="text-red-600" />,
};

export default function TransactionList({
  title,
  data,
  limit = 6,
  className = "",
}: TransactionListProps) {
  const visibleData = data?.slice(0, limit) || [];

  return (
    <Card className={`shadow-md rounded-2xl bg-white h-[100%] ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 border-b">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {visibleData.length === 0 ? (
          <p className="text-gray-500 text-sm">No records found.</p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            {visibleData.map((element) => {
              const isIncome = element.type === "income";
              const Icon = isIncome
                ? incomeIconMap[element.source!] || (
                    <Wallet className="text-green-600" />
                  )
                : expenseIconMap[element.category!] || (
                    <Wallet className="text-red-600" />
                  );

              return (
                <div
                  key={element._id}
                  className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full flex items-center justify-center ${
                        isIncome ? "bg-green-200" : "bg-red-200"
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
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      isIncome ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        isIncome ? "text-green-800" : "text-red-800"
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
        )}
      </CardContent>
    </Card>
  );
}

