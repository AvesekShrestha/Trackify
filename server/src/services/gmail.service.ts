import { IExpensePayload } from "../types/expense.types";
import { IIncomePayload } from "../types/income.types";
import createMessage from "../utils/createMail";
import expenseService from "./expense.service";
import { getGmailClient } from "../config/oauth";
import geminiService from "./gemini.service";
import incomeService from "./income.service";
import userService from "./user.service";
import ErrorHandler from "../utils/errorHandler";
import { getSocketClient } from "../config/socket";

const gmailService = {

    async watchGmail(gmail: any) {
        const response = await gmail.users.watch({
            userId: "me",
            requestBody: {
                labelIds: ["INBOX", "CATEGORY_PERSONAL"],
                topicName: "projects/trackify-473603/topics/gmail-push",
            },
        })

        return response.data.historyId
    },
    async sendMail(userId: string, from: string, to: string, subject: string, message: string) {

        const gmail = await getGmailClient(userId)

        const mail = createMessage(from, to, subject, message)
        await gmail.users.messages.send({
            userId: "me",
            requestBody: { raw: mail },
        })
    },
    async fetchNewMessage(userId: string) {
        const gmail = await getGmailClient(userId);
        const user = await userService.getById(userId);

        const response = await gmail.users.history.list({
            userId: "me",
            startHistoryId: user.gmail?.historyId,
            historyTypes: ["messageAdded"]
        });

        const historyItems = response.data.history || [];
        if (!historyItems.length) {
            console.log("No new messages");
            return;
        }

        for (const item of historyItems) {
            const messagesAdded = item.messagesAdded || [];
            for (const msg of messagesAdded) {
                const messageId = msg.message?.id;
                if (!messageId) continue;

                const messageRes = await gmail.users.messages.get({
                    userId: "me",
                    id: messageId,
                    format: "full"
                });

                const message = messageRes.data;

                let body = "";

                if (message.payload?.parts?.length) {
                    for (const part of message.payload.parts) {
                        if (part.mimeType === "text/plain" && part.body?.data) {
                            body = Buffer.from(part.body.data, "base64").toString("utf-8");
                        }
                    }
                } else if (message.payload?.body?.data) {
                    body = Buffer.from(message.payload.body.data, "base64").toString("utf-8");
                }

                const subject = message.payload?.headers?.find(h => h.name === "Subject")?.value
                return `${subject}\n${body}`
            }
        }
    },
    async handleCallback(connectedEmail: string, historyId : string) {

        const user = await userService.getByConnectedEmail(connectedEmail)
        if (!user) throw new ErrorHandler("No user exists this email address", 400)
        const userId = user._id as string

        if (user.gmail?.historyId && Number(historyId) <= Number(user.gmail.historyId)) {
            return;
        }

        const message = await this.fetchNewMessage(userId) as string
        await userService.updateHistoryId(userId, historyId)
        
        if (message === undefined) return

        const { category, amount, source_type, description, date } = await geminiService.extractEntity(message)

        console.log(category , amount , source_type , description, date)
        const io = getSocketClient()

        if (category == "neutral") return
        else if (category == "income") {
            const payload: IIncomePayload = {
                source: source_type,
                amount,
                description,
                date: new Date(date)
            }
            await incomeService.create(payload, userId)

            io.emit("income")
        }
        else {
            const payload: IExpensePayload = {
                amount,
                category: source_type,
                description,
                date: new Date(date),
            }
            await expenseService.create(payload, userId)
            io.emit("expense")
        }

    }
}

export default gmailService
