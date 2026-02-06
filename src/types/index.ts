import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

// Agent State Types
export interface AgentState {
    authority: PublicKey;
    agentId: number;
    balance: BN;
    totalTrades: BN;
    profitLoss: BN;
    riskThreshold: number;
    maxTradeSize: BN;
    lastRebalance: number;
}

// Trading Types
export interface TradeResult {
    signature: string | null;
    inputAmount: number;
    outputAmount: number;
    slippage: number;
    success: boolean;
    error?: string;
}

export interface TradeRequest {
    inputMint: string;
    outputMint: string;
    amount: number;
    slippage?: number;
    strategy?: TradingStrategy;
}

export interface SwapQuote {
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    priceImpactPct: string;
    marketFee: number;
    route: SwapRoute[];
}

export interface SwapRoute {
    ammKey: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
}

// Portfolio Types
export interface PortfolioStatus {
    totalValue: number;
    tokens: Record<string, number>;
    profitLoss: number;
    totalTrades: number;
    performance?: PerformanceMetrics;
}

export interface PerformanceMetrics {
    dailyPnL: number;
    weeklyPnL: number;
    monthlyPnL: number;
    winRate: number;
    sharpeRatio: number;
    maxDrawdown: number;
    volatility: number;
}

export interface TokenBalance {
    mint: string;
    symbol: string;
    amount: number;
    usdValue: number;
    percentage: number;
}

// Market Analysis Types
export interface MarketSignal {
    type: SignalType;
    strength: number; // 0-1
    recommendation: TradeRecommendation;
    confidence: number; // 0-1
    reasoning?: string;
    timestamp?: number;
}

export enum SignalType {
    VOLATILITY_HIGH = 'VOLATILITY_HIGH',
    VOLATILITY_LOW = 'VOLATILITY_LOW',
    TREND_BULLISH = 'TREND_BULLISH',
    TREND_BEARISH = 'TREND_BEARISH',
    MOMENTUM_POSITIVE = 'MOMENTUM_POSITIVE',
    MOMENTUM_NEGATIVE = 'MOMENTUM_NEGATIVE',
    ARBITRAGE_OPPORTUNITY = 'ARBITRAGE_OPPORTUNITY',
    LIQUIDITY_LOW = 'LIQUIDITY_LOW',
    PRICE_ANOMALY = 'PRICE_ANOMALY',
    MEAN_REVERSION = 'MEAN_REVERSION',
}

export enum TradeRecommendation {
    STRONG_BUY = 'STRONG_BUY',
    BUY = 'BUY',
    HOLD = 'HOLD',
    SELL = 'SELL',
    STRONG_SELL = 'STRONG_SELL',
    INCREASE_POSITION = 'INCREASE_POSITION',
    DECREASE_POSITION = 'DECREASE_POSITION',
    REDUCE_POSITION = 'REDUCE_POSITION',
    REBALANCE = 'REBALANCE',
}

export enum TradingStrategy {
    CONSERVATIVE = 'CONSERVATIVE',
    MODERATE = 'MODERATE',
    AGGRESSIVE = 'AGGRESSIVE',
    ARBITRAGE = 'ARBITRAGE',
    MOMENTUM = 'MOMENTUM',
    MEAN_REVERSION = 'MEAN_REVERSION',
    TREND_FOLLOWING = 'TREND_FOLLOWING',
    MARKET_MAKING = 'MARKET_MAKING',
}

// Price and Market Data Types
export interface PriceData {
    symbol: string;
    price: number;
    confidence: number;
    timestamp: number;
    source: string;
    change24h?: number;
    volume24h?: number;
}

export interface MarketData {
    prices: Map<string, PriceData>;
    depth: MarketDepth;
    volatility: VolatilityData;
    trends: TrendData;
    correlations?: CorrelationMatrix;
}

export interface MarketDepth {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
    spread: number;
    midPrice: number;
}

export interface OrderBookEntry {
    price: number;
    amount: number;
    cumulative: number;
}

export interface VolatilityData {
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
    percentile: number; // 0-1, where this volatility ranks historically
}

export interface TrendData {
    shortTerm: number; // 1 hour trend
    mediumTerm: number; // 4 hour trend
    longTerm: number; // 24 hour trend
    momentum: number;
    strength: number; // 0-1
}

export interface CorrelationMatrix {
    [tokenA: string]: {
        [tokenB: string]: number; // -1 to 1
    };
}

// Risk Management Types
export interface RiskParameters {
    maxPositionSize: number; // Maximum position size per trade
    maxDailyLoss: number; // Maximum daily loss threshold
    maxDrawdown: number; // Maximum portfolio drawdown
    concentrationLimit: number; // Maximum percentage in single asset
    volatilityThreshold: number; // Maximum acceptable volatility
    correlationLimit: number; // Maximum correlation between positions
    stopLoss: number; // Stop loss percentage
    takeProfit: number; // Take profit percentage
}

export interface RiskMetrics {
    currentDrawdown: number;
    dailyPnL: number;
    portfolioVolatility: number;
    beta: number; // Portfolio beta vs market
    valueAtRisk: number; // 1-day VaR at 95% confidence
    expectedShortfall: number; // Expected loss beyond VaR
    sharpeRatio: number;
    sortinoRatio: number;
}

export interface RiskAssessment {
    overall: RiskLevel;
    factors: RiskFactor[];
    recommendation: string;
    actionRequired: boolean;
}

export enum RiskLevel {
    VERY_LOW = 'VERY_LOW',
    LOW = 'LOW',
    MODERATE = 'MODERATE',
    HIGH = 'HIGH',
    VERY_HIGH = 'VERY_HIGH',
}

export interface RiskFactor {
    name: string;
    level: RiskLevel;
    impact: number; // 0-1
    description: string;
}

// Configuration Types
export interface AgentConfig {
    tradingStrategy: TradingStrategy;
    riskParameters: RiskParameters;
    rebalanceFrequency: number; // seconds
    maxTradesPerHour: number;
    enabledFeatures: AgentFeature[];
    notifications: NotificationConfig;
}

export enum AgentFeature {
    AUTOMATED_TRADING = 'AUTOMATED_TRADING',
    PORTFOLIO_REBALANCING = 'PORTFOLIO_REBALANCING',
    ARBITRAGE_DETECTION = 'ARBITRAGE_DETECTION',
    RISK_MANAGEMENT = 'RISK_MANAGEMENT',
    MARKET_MAKING = 'MARKET_MAKING',
    YIELD_FARMING = 'YIELD_FARMING',
    LIQUIDATION_PROTECTION = 'LIQUIDATION_PROTECTION',
    TAX_OPTIMIZATION = 'TAX_OPTIMIZATION',
}

export interface NotificationConfig {
    email: boolean;
    discord: boolean;
    telegram: boolean;
    webhooks: string[];
    alertThresholds: AlertThresholds;
}

export interface AlertThresholds {
    profitThreshold: number;
    lossThreshold: number;
    volatilityThreshold: number;
    lowLiquidityThreshold: number;
    priceAnomalyThreshold: number;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: number;
    requestId?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Event Types
export interface TradeEvent {
    type: 'TRADE_EXECUTED' | 'TRADE_FAILED' | 'TRADE_CANCELLED';
    tradeId: string;
    agentId: number;
    inputToken: string;
    outputToken: string;
    inputAmount: number;
    outputAmount: number;
    price: number;
    slippage: number;
    fee: number;
    signature?: string;
    timestamp: number;
    strategy: TradingStrategy;
    reason: string;
}

export interface RebalanceEvent {
    type: 'REBALANCE_STARTED' | 'REBALANCE_COMPLETED' | 'REBALANCE_FAILED';
    agentId: number;
    fromAllocation: Record<string, number>;
    toAllocation: Record<string, number>;
    trades: TradeEvent[];
    timestamp: number;
    reason: string;
}

export interface AlertEvent {
    type: 'PRICE_ALERT' | 'RISK_ALERT' | 'PROFIT_ALERT' | 'LOSS_ALERT';
    agentId: number;
    message: string;
    severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
    data: any;
    timestamp: number;
}

// Utility Types
export type Timestamp = number; // Unix timestamp in seconds
export type TokenMint = string; // Solana token mint address
export type WalletAddress = string; // Solana wallet address
export type TransactionSignature = string; // Solana transaction signature

// Helper type for creating partial updates
export type PartialUpdate<T> = {
    [P in keyof T]?: T[P] extends object ? PartialUpdate<T[P]> : T[P];
};

// Error Types
export class AgentError extends Error {
    constructor(
        message: string,
        public code: string,
        public data?: any
    ) {
        super(message);
        this.name = 'AgentError';
    }
}

export class TradingError extends AgentError {
    constructor(message: string, data?: any) {
        super(message, 'TRADING_ERROR', data);
        this.name = 'TradingError';
    }
}

export class RiskError extends AgentError {
    constructor(message: string, data?: any) {
        super(message, 'RISK_ERROR', data);
        this.name = 'RiskError';
    }
}

export class MarketDataError extends AgentError {
    constructor(message: string, data?: any) {
        super(message, 'MARKET_DATA_ERROR', data);
        this.name = 'MarketDataError';
    }
}