"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const confirmRoutes_1 = __importDefault(require("./routes/confirmRoutes"));
const database_1 = __importDefault(require("./models/database"));
console.log('Antes de carregar .env');
dotenv_1.default.config();
console.log('Depois de carregar .env');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, database_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/api', uploadRoutes_1.default);
app.use('/api', confirmRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
