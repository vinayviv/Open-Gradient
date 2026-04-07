import express from 'express';
import cors from 'cors';
import { detector } from './model.js';

const app = express();
const port = 8000; // Keep the same port as FastAPI typically uses or an available one

// Setup CORS for the frontend Vite application
app.use(cors({
    origin: '*', // In production, restrict to frontend domain
    methods: ['*'],
    allowedHeaders: ['*']
}));

// Setup JSON parsing for POST bodies
app.use(express.json());

// Main active route
app.get('/', (req, res) => {
    res.json({ status: 'OpenGuardian AI is active (Node.js)' });
});

// Analyze transaction
app.post('/analyze', (req, res) => {
    try {
        const { amount, gas_fee, hour_of_day, contract_familiarity } = req.body;

        if (amount === undefined || gas_fee === undefined || hour_of_day === undefined || contract_familiarity === undefined) {
            return res.status(400).json({ error: 'Missing required transaction parameters' });
        }

        // Analyze the transaction using the Isolation Forest model
        const result = detector.analyzeTransaction(
            amount,
            gas_fee,
            hour_of_day,
            contract_familiarity
        );
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error', details: e.message });
    }
});

app.listen(port, () => {
    console.log(`OpenGuardian AI (Node.js) listening on port ${port}`);
});
