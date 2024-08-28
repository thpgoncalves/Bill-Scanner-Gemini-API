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
exports.confirmMeasurement = void 0;
const measureService_1 = require("../services/measureService");
const confirmMeasurement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { measure_uuid, confirmed_value } = req.body;
        const existingMeasurement = yield (0, measureService_1.checkExistingMeasurementByUUID)(measure_uuid);
        if (!existingMeasurement) {
            return res.status(404).json({ error: 'Measurement not found.' });
        }
        if (existingMeasurement.confirmed) {
            return res.status(400).json({ error: 'Measurement is already confirmed.' });
        }
        existingMeasurement.value = confirmed_value;
        existingMeasurement.confirmed = true;
        yield (0, measureService_1.saveMeasurement)(existingMeasurement);
        return res.status(200).json({ message: 'Measurement confirmed successfully.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to confirm the measurement.' });
    }
});
exports.confirmMeasurement = confirmMeasurement;
