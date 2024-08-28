"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUploadData = void 0;
const validateUploadData = (data) => {
    if (!data.image || !data.customer_code || !data.measure_datetime || !data.measure_type) {
        return 'Missing required fields';
    }
    if (!['WATER', 'GAS'].includes(data.measure_type.toUpperCase())) {
        return 'Invalid measure_type';
    }
    // Adicionar outras validações se precisar
    return null;
};
exports.validateUploadData = validateUploadData;
