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
exports.extractValueFromImage = void 0;
const axios_1 = __importDefault(require("axios"));
const extractValueFromImage = (base64Image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post('https://api.gemini.com/llm/extract', {
            image: base64Image
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.extracted_value;
    }
    catch (error) {
        console.error('Error contacting Gemini API:', error);
        throw new Error('Failed to process the image.');
    }
});
exports.extractValueFromImage = extractValueFromImage;
