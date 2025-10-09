import ai from "../config/gemini"

const geminiService = {

    async extractEntity(message: string) {
        const prompt = `
            You are a financial email analyzer.

            ### Task:
            Analyze the Gmail email content and extract structured financial transaction data.

            ### Output format:
            Return ONLY a single JSON object (no markdown fences, no explanations) with the exact structure:
            {
              "category": "income" | "expense" | "neutral",
              "source_type": "salary" | "business" | "investment" | "health" | "education" | "food" | "travel" | "entertainment" | "utilities" | "shopping" | "transport" | "other",
              "date": "YYYY-MM-DD" | null,
              "amount": number | null,
              "description": string | null
            }

            ---

            ### Rules:

            #### 1. Determine if it’s a financial transaction
            - If the email involves **money being sent, received, paid, or charged**, it is a financial transaction.
            - Otherwise, return:
              {
                "category": "neutral",
                "source_type": null,
                "date": null,
                "amount": null,
                "description": null
              }
              and stop.

            #### 2. Categorize the transaction
            - If money is **received**, set \`category = "income"\`.
            - If money is **spent or paid**, set \`category = "expense"\`.

            #### 3. Identify the source_type (context + keyword cues)
            - First, try to infer the most relevant source or reason **based on the context of the message**.
            - If unclear, refer to these keyword hints:
              - **"salary"** → wage, paycheck, stipend, payment from company
              - **"business"** → client, invoice, order payment, freelance, service fee
              - **"investment"** → stocks, crypto, mutual fund, dividend, portfolio, trading
              - **"health"** → doctor, hospital, clinic, medicine, pharmacy, medical bill
              - **"education"** → school, college, tuition, course, learning, training
              - **"food"** → restaurant, cafe, meal, dining, delivery, grocery, eatery
              - **"travel"** → flight, ticket, hotel, booking, trip, journey
              - **"transport"** → taxi, cab, fuel, ride, bus, train, commute
              - **"entertainment"** → movie, concert, game, streaming, event, show
              - **"utilities"** → electricity, water, gas, internet, phone, subscription
              - **"shopping"** → clothing, store, purchase, online order, marketplace
            - If none match the context or keywords, set \`source_type = "other"\`.

            #### 4. Extract the date
            - Detect a valid date (prefer YYYY-MM-DD format).
            - If not found, set \`date = null\`.

            #### 5. Extract the amount
            - Extract the numeric transaction amount (ignore currency symbols).

            #### 6. Description
            - Write a short, natural-language summary of what the transaction is about.

            ---

            ### Important:
            - Output must be **strict JSON only** (no markdown, no commentary).
            - Do not include explanations or text outside the JSON object.
            - Do not invent details not present in the email.
            - If unsure, set fields to null or "other".

            ---

            Email content:
            ${message}
            `

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        const rawText = response.text!
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()

        const data = JSON.parse(rawText)
        return data
    }
}

export default geminiService

