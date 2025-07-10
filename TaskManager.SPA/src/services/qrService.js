import api from './api';

export const qrService = {
    async generateQR(purpose = 'net_question_exclusive') {
        try {
            console.log('QR Service: Generating QR with purpose:', purpose);
            const response = await api.post('/qr/generate', { purpose });
            console.log('QR Service: QR generated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('QR Service: Error generating QR:', error);
            console.error('QR Service: Error response:', error.response?.data);
            console.error('QR Service: Error status:', error.response?.status);
            throw error;
        }
    },

    async validateQR(hash) {
        const response = await api.get(`/qr/validate?hash=${encodeURIComponent(hash)}`);
        return response.data;
    },

    async getExclusiveQuestion(hash) {
        const response = await api.get(`/qr/exclusive-question?hash=${encodeURIComponent(hash)}`);
        return response.data;
    },

    async submitAnswer(hash, answer) {
        const response = await api.post('/qr/submit-answer', { qrHash: hash, answer });
        return response.data;
    },

    // Métodos legacy para compatibilidad
    async validateSecureQR(hash) {
        const response = await api.get(`/qr/validate?hash=${encodeURIComponent(hash)}`);
        return response.data;
    },

    async generateSecureQR(userId, purpose) {
        const response = await api.post('/qr/generate', { purpose });
        return response.data;
    }
};
