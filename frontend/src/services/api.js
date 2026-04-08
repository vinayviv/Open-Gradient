export const analyzeTransaction = async (transactionData) => {
    // simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const { amount, gas_fee, hour_of_day, contract_familiarity } = transactionData;
    let riskScorePct = 0;
    
    // Base risk from amount (outlier if > 5000)
    if (amount > 5000) riskScorePct += 35;
    else if (amount > 1000) riskScorePct += 15;
    
    // Gas Fee Risk (gas spikes > 150)
    if (gas_fee > 150) riskScorePct += 25;
    else if (gas_fee > 50) riskScorePct += 10;
    
    // Time of Day Risk (0-5am is highly suspicious)
    if (hour_of_day >= 0 && hour_of_day <= 5) riskScorePct += 20;
    
    // Contract Familiarity Risk (0-0.3 is highly dangerous)
    if (contract_familiarity < 0.3) riskScorePct += 30;
    else if (contract_familiarity < 0.7) riskScorePct += 10;
    
    // Cap score at 99
    riskScorePct = Math.min(99, riskScorePct);
    
    // Ensure at least a low baseline score for variation (1-10%)
    if (riskScorePct === 0) {
        riskScorePct = Math.floor(Math.random() * 10) + 1;
    }

    const riskStatus = riskScorePct >= 80 ? "Blocked" : "Safe";

    return {
        anomaly_score: riskScorePct,
        risk_status: riskStatus,
        raw_decision_score: riskScorePct / 100
    };
};

export const getActivities = () => {
    const saved = localStorage.getItem('activities');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
    }
    return [
        { id: 1, type: 'safe', msg: 'Tx 0x2A...f9A approved', time: '1m ago' },
        { id: 2, type: 'warn', msg: 'New contract interaction (DeX)', time: '3m ago' }
    ];
};

export const saveActivities = (activities) => {
    localStorage.setItem('activities', JSON.stringify(activities));
};
