import type { CreateLotteryRequest, Lottery } from "../interfaces/Lottery";

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