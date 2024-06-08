const { GoogleGenerativeAI } = require("@google/generative-ai");

const summarizeTranscript = async (transcript) => {

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {

        console.log("Generating summary...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `"${transcript}" Summarize the given text concisely and extract important keywords(for skimming) from it and return the response exactly similar to the given example AND DO NOT ADD MARKDOWN IN THE RESPONSE. DO NOT REPEAT THE KEYWORDS. DO NOT USE DOUBLE QUOTES IN THE SUMMARY(THAT'LL BREAK JSON). (Example response:
        {
            "summary":<summary here>,
            "keywords":[
                "keyword1",
                "keyword2", 
                "keyword3",
                and so on.
            ]
        }
    )`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        console.log("Summary generated.")
        return text;
    } catch (error) {
        console.log("Error in googleGeminiService.js: ", error);
        throw error;
    }
}

module.exports = { summarizeTranscript };
