"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measurement = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MeasurementSchema = new mongoose_1.Schema({
    measure_uuid: { type: String, required: true, unique: true },
    customer_code: { type: String, required: true },
    measure_datetime: { type: Date, required: true },
    measure_type: { type: String, required: true, enum: ['WATER', 'GAS'] },
    value: { type: Number, required: true },
    image_link: { type: String, required: true },
    confirmed: { type: Boolean, default: false }
});
exports.Measurement = mongoose_1.default.model('Measurement', MeasurementSchema);
