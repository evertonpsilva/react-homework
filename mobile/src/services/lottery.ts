import type { CreateLotteryRequest, Lottery, RegisterLotteryRequest } from "../interfaces/Lottery";

export async function create({ name, prize }: CreateLotteryRequest): Promise<Lottery> {
    try {
        const reponse = await fetch(`http://localhost:3000/lotteries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "simple",
                name,
                prize,
            }),
        });

        const body = await reponse.json();

        return body;
    }catch (e) {
        console.log("error", e);

        throw e;
    }
}

export function list(): Promise<Lottery[]> {
    const controller = new AbortController();
    return fetch(`http://localhost:3000/lotteries`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .catch((e) => {
        console.log("error", e);

        throw e;
    });
}

export async function register({
    name, 
    lotteryId
}: RegisterLotteryRequest) {
    try {
        await fetch(`http://localhost:3000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                lotteryId,
            }),
        });


    }catch (e) {
        console.log("error", e);
        
        throw e;
    }
}