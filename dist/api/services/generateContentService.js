"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContentWithImage = void 0;
const generative_ai_1 = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error('API_KEY is not set in the environment variables');
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
function generateContentWithImage(imageUri) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const result = yield model.generateContent([
                {
                    fileData: {
                        mimeType: "image/jpeg",
                        fileUri: imageUri,
                    },
                },
                { text: "Descreva como este produto pode ser fabricado." },
            ]);
            return result.response.text();
        }
        catch (error) {
            console.error("Erro ao gerar conteúdo:", error);
            throw new Error('Failed to generate content');
        }
    });
}
exports.generateContentWithImage = generateContentWithImage;
