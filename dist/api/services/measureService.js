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
exports.checkExistingMeasurementByUUID = exports.checkExistingMeasurement = exports.saveMeasurement = void 0;
const measureModel_1 = require("../models/measureModel");
const saveMeasurement = (measurementData) => __awaiter(void 0, void 0, void 0, function* () {
    const measurement = new measureModel_1.Measurement(measurementData);
    yield measurement.save();
});
exports.saveMeasurement = saveMeasurement;
const checkExistingMeasurement = (customer_code, measure_datetime, measure_type) => __awaiter(void 0, void 0, void 0, function* () {
    return measureModel_1.Measurement.findOne({
        customer_code,
        measure_datetime: {
            $gte: new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1),
            $lt: new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 1),
        },
        measure_type,
    });
});
exports.checkExistingMeasurement = checkExistingMeasurement;
const checkExistingMeasurementByUUID = (measure_uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return measureModel_1.Measurement.findOne({ measure_uuid });
});
exports.checkExistingMeasurementByUUID = checkExistingMeasurementByUUID;
