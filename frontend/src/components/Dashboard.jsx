import React, { useState } from 'react';
import { Shield, Activity, Fingerprint, Lock, Zap, Clock, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { analyzeTransaction } from '../services/api';

const Dashboard = () => {
    const [txData, setTxData] = useState({
        amount: 100,
        gas_fee: 15,
        hour_of_day: 12,
        contract_familiarity: 0.9
    });
    
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [walletConnected, setWalletConnected] = useState(false);
    const [activities, setActivities] = useState([
        { id: 1, type: 'safe', msg: 'Tx 0x2A...f9A approved', time: '1m ago' },
        { id: 2, type: 'warn', msg: 'New contract interaction (DeX)', time: '3m ago' }
    ]);

    const handleInputChange = (e) => {
        setTxData({
            ...txData,
            [e.target.name]: parseFloat(e.target.value) || 0
        });
    };

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const result = await analyzeTransaction(txData);
            setAnalysisResult(result);
            
            const isBlocked = result.risk_status === 'Blocked';
            const newActivity = {
                id: Date.now(),
                type: isBlocked ? 'danger' : 'safe',
                msg: isBlocked ? 'Suspicious transaction blocked' : 'Transaction approved',
                time: 'Just now'
            };
            setActivities([newActivity, ...activities.slice(0, 4)]);
        } catch (error) {
            console.error("Failed to analyze", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <nav className="flex justify-between items-center mb-10 pb-4 border-b border-surfaceBorder">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-lg">
                        <Shield className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        OpenGuardian<span className="text-primary tracking-wide">.AI</span>
                    </span>
                </div>
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
                    {['Dashboard', 'Activity', 'Security'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`transition-colors ${activeTab === tab ? 'text-primary' : 'hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={() => setWalletConnected(!walletConnected)}
                    className={`btn-primary flex items-center gap-2 text-sm ${walletConnected ? 'from-success to-emerald-500' : ''}`}
                >
                    <Zap className="w-4 h-4" />
                    {walletConnected ? 'Connected: 0x4A...2f0' : 'Connect Wallet'}
                </button>
            </nav>

            <header className="mb-12 text-center mt-8">
                <h1 className="text-5xl font-bold mb-4">Smart Behavioral <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Security mapped over Web3</span></h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    AI-powered 2FA for your wallet. We analyze transaction behavior and detect anomalies using Isolation Forests before execution, stopping malicious drainers and exploits instantly.
                </p>
            </header>

            {(activeTab === 'Dashboard' || activeTab === 'Security') && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
                <div className="glass-card flex flex-col justify-between">
                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2"><Lock className="w-4 h-4 text-success"/> Wallet Status</div>
                    <div className="text-2xl font-bold text-white">Protected</div>
                </div>
                <div className="glass-card flex flex-col justify-between">
                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-primary"/> AI Verifications</div>
                    <div className="text-2xl font-bold text-white">1,492</div>
                </div>
                <div className="glass-card flex flex-col justify-between">
                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-danger"/> Anomalies Detected</div>
                    <div className="text-2xl font-bold text-white">14</div>
                </div>
                <div className="glass-card flex flex-col justify-between">
                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2"><Fingerprint className="w-4 h-4 text-accent"/> Network Risk</div>
                    <div className="text-2xl font-bold text-white">Low</div>
                </div>
            </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Simulator Controls */}
                {(activeTab === 'Dashboard' || activeTab === 'Security') && (
                <div className="glass-panel p-6 lg:col-span-1 animate-fade-in">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary"/> Simulate Transaction
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Transaction Amount (USD)</label>
                            <input 
                                type="number" 
                                name="amount"
                                value={txData.amount}
                                onChange={handleInputChange}
                                className="w-full bg-black/50 border border-surfaceBorder rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Gas Fee (Gwei)</label>
                            <input 
                                type="number" 
                                name="gas_fee"
                                value={txData.gas_fee}
                                onChange={handleInputChange}
                                className="w-full bg-black/50 border border-surfaceBorder rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Time of Day (0-23 Hour)</label>
                            <input 
                                type="number" 
                                name="hour_of_day"
                                value={txData.hour_of_day}
                                onChange={handleInputChange}
                                min="0" max="23"
                                className="w-full bg-black/50 border border-surfaceBorder rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Contract Type (Familiarity)</label>
                            <select 
                                name="contract_familiarity"
                                value={txData.contract_familiarity}
                                onChange={handleInputChange}
                                className="w-full bg-black/50 border border-surfaceBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary cursor-pointer transition-colors appearance-none"
                            >
                                <option value="0.95">ERC20 / Uniswap (0.95 - High)</option>
                                <option value="0.7">Known DeFi (0.7 - Medium)</option>
                                <option value="0.1">Unknown Contract (0.1 - Low)</option>
                            </select>
                        </div>
                        
                        <button 
                            onClick={handleAnalyze} 
                            disabled={loading}
                            className="w-full btn-primary mt-4 flex justify-center items-center gap-2"
                        >
                            {loading ? <Clock className="animate-spin w-5 h-5"/> : <Shield className="w-5 h-5"/>}
                            {loading ? 'Analyzing Behavior...' : 'Analyze Transaction'}
                        </button>
                    </div>
                </div>
                )}

                {/* Analysis Results / Anomaly panel */}
                {(activeTab === 'Dashboard' || activeTab === 'Security') && (
                <div className="glass-panel p-6 lg:col-span-1 animate-fade-in">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Fingerprint className="w-5 h-5 text-accent"/> AI Analysis Result
                    </h2>

                    {analysisResult ? (
                        <div className="space-y-6 animate-fade-in text-center flex flex-col items-center">
                            
                            {/* Anomaly Gauge */}
                            <div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-4"
                                style={{
                                    background: `conic-gradient(${analysisResult.risk_status === 'Blocked' ? '#fb7185' : '#34d399'} ${analysisResult.anomaly_score}%, rgba(20,24,39,0.8) ${analysisResult.anomaly_score}%)`
                                }}
                            >
                                <div className="absolute w-40 h-40 bg-background rounded-full flex flex-col items-center justify-center inset-0 m-auto z-10 border border-surfaceBorder shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                                    <span className="text-3xl font-bold tracking-tighter">{analysisResult.anomaly_score}%</span>
                                    <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider text-center">Risk Score</span>
                                </div>
                            </div>
                            
                            <div className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 ${analysisResult.risk_status === 'Blocked' ? 'bg-danger/20 border border-danger/50 text-danger' : 'bg-success/20 border border-success/50 text-success'}`}>
                                {analysisResult.risk_status === 'Blocked' ? <Lock className="w-5 h-5"/> : <CheckCircle className="w-5 h-5" />}
                                <span className="font-bold text-lg uppercase">{analysisResult.risk_status === 'Blocked' ? 'Anomaly Blocked' : 'Transaction Safe'}</span>
                            </div>

                            {analysisResult.risk_status === 'Blocked' && (
                                <p className="text-sm text-gray-400 mt-2">
                                    Smart Time Lock activated. Secondary biometric confirmation required for execution.
                                </p>
                            )}

                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 pb-10">
                            <Database className="w-16 h-16 mb-4 opacity-50"/>
                            <p>Awaiting transaction submission...</p>
                        </div>
                    )}
                </div>
                )}

                {/* Live Activity */}
                {(activeTab === 'Dashboard' || activeTab === 'Activity') && (
                <div className={`glass-panel p-6 ${activeTab === 'Activity' ? 'lg:col-span-3' : 'lg:col-span-1'} flex flex-col animate-fade-in`}>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-secondary"/> Live Activity
                    </h2>
                    <div className="flex-1 space-y-4">
                        {activities.map(act => (
                            <div key={act.id} className="p-3 bg-black/40 rounded-lg border border-surfaceBorder flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    {act.type === 'danger' && <AlertTriangle className="w-4 h-4 text-danger"/>}
                                    {act.type === 'warn' && <AlertTriangle className="w-4 h-4 text-yellow-500"/>}
                                    {act.type === 'safe' && <CheckCircle className="w-4 h-4 text-success"/>}
                                    <span className="text-sm text-gray-300">{act.msg}</span>
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{act.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;
