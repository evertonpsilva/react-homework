import { useState } from "react";
import type { RegisterLotteryRequest } from "../interfaces/Lottery";
import * as LotteryService from "../services/lottery";

export default function useLotteryRegister() {
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerError, setRegisterError] = useState<string>();

    const register = ({
        name,
        lotteries,
    }: { name: string; lotteries: string[] }) => {
        setRegisterLoading(true);
        setRegisterError(undefined);

        const requests = lotteries.map((lotteryId) => {
            const body: RegisterLotteryRequest = {
                name,
                lotteryId,
            };

            return LotteryService.register(body);
        });

        return Promise.all(requests)
            .then(() => {
                setRegisterLoading(false);
            })
            .catch((err) => {
                setRegisterLoading(false);
                setRegisterError(err.message);
                throw err;
            });
    };

    return {
        registerLoading,
        registerError,
        register,
    };
}