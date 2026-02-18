export interface Lottery {
    id: string;
    name: string;
    status: 'running' | 'finished';
    prize: string;
    type: string;
}

export interface CreateLotteryRequest {
    name: string;
    prize: string;
}

export interface RegisterLotteryRequest {
    name: string;
    lotteryId: string;
}