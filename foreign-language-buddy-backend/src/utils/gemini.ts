const axios = require("axios");
const { HttpsProxyAgent } = require('https-proxy-agent');

class GEMINI {
    private apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generateTextFromMessage(message: string) {
        const contents = [{
            role: "user",
            content: message
        }]
        const result = await this.generateText({ contents });
        return result
    }

    async generateText({ contents, instruction = "" }: { contents: any[], instruction?: string }) {
        const geminiContents = this._convertToGeminiFormat(contents);
        const geminiInstruction = this._convertToInstructionFormat(instruction);
        const data = { contents: geminiContents, system_instruction: geminiInstruction };
        return this._generateFromGemini(data);
    }

    async _generateFromGemini(data: any) {
        const apiKey = this.apiKey;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;
        const proxyAgent = this.getAgent();
        const response = await axios.post(apiUrl, data, {
            httpsAgent: proxyAgent,
        });
        const generatedContent = response.data.candidates[0].content;
        const resultText = generatedContent.parts[0].text;
        return resultText;
    }
    _convertToGeminiFormat(contents: any) {
        const geminiContents = contents.map((content: any) => ({
            role: content.role,
            parts: [{
                text: content.content
            }]
        }));
        return geminiContents;
    }
    _convertToInstructionFormat(instruction: string) {
        return {
            parts: {
                text: instruction
            }
        };
    }
    getAgent() {
        const proxyHost = process.env.PROXY_HOST;
        const proxyPort = 8888; // Replace with your proxy's port
        const proxyUser = process.env.PROXY_USER; // Optional
        const proxyPass = process.env.PROXY_PASS; // Optional
        // Create a proxy agent
        const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
        const httpAgent = new HttpsProxyAgent(proxyUrl)
        return httpAgent
    }
}
export { GEMINI }