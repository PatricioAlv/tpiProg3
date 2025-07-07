import api from './api';

export const qrService = {
    async generateQR(data) {
        const response = await api.post('/api/qr/generate', { data });
        return response.data.qrCode;
    },

    async validateQR(qrCodeData, expectedData) {
        const response = await api.post('/api/qr/validate', { qrCodeData, expectedData });
        return response.data.isValid;
    },

    async generateSecureQR(userId, purpose) {
        const response = await api.post('/api/qr/generate-secure', { userId, purpose });
        return response.data.qrCode;
    },

    async validateSecureQR(hash) {
        const response = await api.post('/api/qr/validate-secure', { hash });
        return response.data.isValid;
    }
};
