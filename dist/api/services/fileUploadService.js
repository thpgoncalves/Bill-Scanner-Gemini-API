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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const server_1 = require("@google/generative-ai/server");
const path_1 = __importDefault(require("path"));
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in the environment variables');
}
const fileManager = new server_1.GoogleAIFileManager(apiKey);
function uploadImage(imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resolvedImagePath = path_1.default.resolve(imagePath);
            const uploadResponse = yield fileManager.uploadFile(resolvedImagePath, {
                mimeType: "image/jpeg",
                displayName: "Uploaded Image",
            });
            console.log(`Arquivo enviado com sucesso: ${uploadResponse.file.displayName}`);
            console.log(`URI do arquivo: ${uploadResponse.file.uri}`);
            return uploadResponse.file.uri;
        }
        catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            throw new Error('Failed to upload image');
        }
    });
}
exports.uploadImage = uploadImage;
