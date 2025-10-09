import { success } from "zod";
import Income from "../models/income.model";
import mongoose, { ObjectId } from "mongoose";
import Expense from "../models/expense.model";

const reportRepository = {

    async recentTransaction(userId: string) {

        const userObjectId = new mongoose.Types.ObjectId(userId)
        const data = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $project: { amount: 1, source: 1, date: 1, type: "income" } },
            {
                $unionWith: {
                    coll: "expenses",
                    pipeline: [
                        { $match: { userId: userObjectId } },
                        { $project: { amount: 1, category: 1, date: 1, type: "expense" } }
                    ]
                }
            },
            { $sort: { date: -1 } },
            { $limit: 10 }
        ]);
        return {
            success: true,
            message: "Recent transaction fetched successfully",
            data: data
        }
    },
    async balanceReport(userId: string) {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const incomeResult = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
        ]);

        const totalIncome = incomeResult[0]?.totalIncome || 0;

        const expenseResult = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
        ]);

        const totalExpense = expenseResult[0]?.totalExpense || 0;

        const totalBalance = totalIncome - totalExpense;

        return {
            success: true,
            message: "Available balance fetched successfully",
            data:[
                {_id : "totalBalance", amount : totalBalance},
                {_id : "totalIncome", amount : totalIncome},
                {_id : "totalExpense", amount : totalExpense}
            ]
        };
    },
    async monthlyIncomeReport(userId: string) {

        const userObjectId = new mongoose.Types.ObjectId(userId)

        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        const currentDate = new Date()

        const data = await Income.aggregate([
            {
                $match: {
                    userId: userObjectId,
                    date: { $gt: thisMonth, $lt: currentDate }
                }
            },
            {
                $group: {
                    _id: "$source",
                    amount: { $sum: "$amount" }
                }
            }
        ])

        return {
            success: true,
            message: "Monthly Income report fetched successfully",
            data
        }
    },
    async monthlyExpenseReport(userId: string) {

        const userObjectId = new mongoose.Types.ObjectId(userId)

        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        const currentDate = new Date()

        const data = await Expense.aggregate([
            {
                $match: {
                    userId: userObjectId,
                    date: { $gt: thisMonth, $lt: currentDate }
                }
            },
            {
                $group: {
                    _id: "$category",
                    amount: { $sum: "$amount" }
                }
            }
        ])

        return {
            success: true,
            message: "Monthly expense report fetched successfully",
            data
        }
    }

}

export default reportRepository
