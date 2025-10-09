"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
    Bus,
    Tv,
    Laptop,
    Receipt
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode, useState } from "react";

interface TransactionListProps {
    title: string;
    data: IIncome[];
    limit?: number;
    pages : number 
    children: ReactNode
}


const incomeIconMap = {
    salary: <DollarSign className="text-green-600" />,
    freelance: <Laptop className="text-green-600" />,
    investment: <CreditCard className="text-green-600" />,
    business: <Briefcase className="text-green-600" />,
    other: <Wallet className="text-green-600" />,
};

const expenseIconMap = {
    food: <Coffee className="text-red-600" />,
    transport: <Bus className="text-red-600" />,
    entertainment: <Tv className="text-red-600" />,
    health: <Heart className="text-red-600" />,
    shopping: <ShoppingCart className="text-red-600" />,
    bills: <Receipt className="text-red-600" />,
    other: <Wallet className="text-red-600" />,
};

export default function TransactionList({
    title,
    data,
    limit = 8,
    pages = 1,
    children
}: TransactionListProps) {
    
    const [page ,setPage] = useState<number>(1)

    const visibleData = data?.slice(0, limit) || [];
    const totalPages = pages || 1;


    return (
        <Card className={`shadow-md rounded-2xl bg-white h-[100%]`}>
            <CardHeader>
                <CardTitle className="flex flex row justify-between">
                    <div className="text-lg md:text-xl font-semibold text-gray-800 border-b">
                        {title}
                    </div>
                    <div>
                        {children}
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                {visibleData.length === 0 ? (
                    <p className="text-gray-500 text-sm">No records found.</p>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                        {visibleData.map((element: IIncome) => {
                            const isIncome = element.type.toLowerCase() === "income";
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
                                            className={`p-2 rounded-full flex items-center justify-center ${isIncome ? "bg-green-200" : "bg-red-200"
                                                }`}
                                        >
                                            {Icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-800">
                                                {isIncome ? element.source?.charAt(0).toUpperCase() + element.source?.slice(1) : element.category?.charAt(0).toUpperCase() + element.category?.slice(1)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(element.date!)}
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
                )}

                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            onClick={() => setPage(i + 1)}
                                            isActive={page === i + 1}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            setPage((p) => Math.min(totalPages, p + 1))
                                        }
                                        className={
                                            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}

            </CardContent>
        </Card>
    );
}

