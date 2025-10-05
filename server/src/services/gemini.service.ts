import ai from "../config/gemini"

const geminiService = {

    async extractEntity(message: string) {
        const prompt = `
        You are a financial email analyzer.

        Task:
        Analyze the Gmail email content and extract structured financial transaction data.
        
        Rules:
        - Return ONLY raw JSON.
        - Do not include markdown fences (like \`\`\`json).
        - Do not include any explanation.
        
        
        1. First, classify if the email is about a financial transaction.
        - If unrelated, category = "neutral".
        - If related, category = "income" or "expense".
        
        2. If income:
        - source_type must be one of:
            ["salary", "business", "investment", "other"]
        
        3. If expense:
        - source_type must be one of:
            ["health", "education", "food", "travel", "entertainment", "utilities", "shopping", "other"]
        
        4. Extract the following fields:
        - category: "income" | "expense" | "neutral"
        - source_type: one of the lists above, or null if neutral
        - date: transaction date in ISO 8601 (YYYY-MM-DD) if found
        - amount: numeric value (integer or float)
        - description: short free-text description of the transaction
        
        Return strictly in JSON format only:
        {
        "category": "...",
        "source_type": "...",
        "date": "...",
        "amount": ...,
        "description": "..."
        }
        
        If any field is missing, set it to null. Do not include explanations outside JSON.
        
        Email content:
        """
        ${message}
        """
        `

        const response = await ai.models.generateContent({
            model : "gemini-2.5-flash",
            contents : prompt
        })
        const data = JSON.parse(response.text!)
        return data
    }
}


export default geminiService
