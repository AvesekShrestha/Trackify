import Income from "../models/income.model";
import mongoose, { ObjectId } from "mongoose";

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
                        { $project: { amount: 1, category : 1, date: 1, type: "expense" } }
                    ]
                }
            },
            { $sort: { date : -1 } },
            { $limit: 10 }
        ]);
        return data
    },
    async availableBalance(userId: string) {

        const userObjectId = new mongoose.Types.ObjectId(userId)

        const balance = await Income.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: "$amount" }
                }
            },
            {
                $unionWith: {
                    coll: "expenses",
                    pipeline: [
                        { $match: { userId: userObjectId } },
                        {
                            $group: {
                                _id: null,
                                totalExpense: { $sum: "$amount" }
                            }
                        }]
                }
            },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: "$totalIncome" },
                    totalExpense: { $sum: "$totalExpense" }
                }
            },
            {
                $project: {
                    _id: 0,
                    balance: { $subtract: ["$totalIncome", "$totalExpense"] }
                }
            }
        ])

        return balance
    }
}

export default reportRepository
