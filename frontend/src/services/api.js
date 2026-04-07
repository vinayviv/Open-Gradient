import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const analyzeTransaction = async (transactionData) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, transactionData);
        return response.data;
    } catch (error) {
        console.error("Error analyzing transaction:", error);
        throw error;
    }
};
