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
exports.uploadImageAndGenerateContent = void 0;
const uuid_1 = require("uuid");
const measureService_1 = require("../services/measureService");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const fileUploadService_1 = require("../services/fileUploadService");
const generateContentService_1 = require("../services/generateContentService");
const uploadImageAndGenerateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;
        const validationError = (0, validationMiddleware_1.validateUploadData)(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }
        const measureDate = new Date(measure_datetime);
        if (isNaN(measureDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format.' });
        }
        const existingMeasurement = yield (0, measureService_1.checkExistingMeasurement)(customer_code, measureDate, measure_type);
        if (existingMeasurement) {
            return res.status(400).json({ error: 'Measurement already exists for this month and type.' });
        }
        const uploadedImageUri = yield (0, fileUploadService_1.uploadImage)(image);
        const extracted_value = yield (0, generateContentService_1.generateContentWithImage)(uploadedImageUri);
        const measure_uuid = (0, uuid_1.v4)();
        const image_link = `https://yourstorage.com/images/${measure_uuid}`;
        yield (0, measureService_1.saveMeasurement)({
            measure_uuid,
            customer_code,
            measure_datetime: measureDate,
            measure_type,
            value: extracted_value,
            image_link,
            confirmed: false,
        });
        return res.status(200).json({
            measure_uuid,
            image_link,
            extracted_value,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to process the image.' });
    }
});
exports.uploadImageAndGenerateContent = uploadImageAndGenerateContent;
