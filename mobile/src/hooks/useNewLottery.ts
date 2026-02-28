import { useState } from "react";
import * as LotteryService from "../services/lottery";

export function useNewLottery() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();


    const createLottery = async (name: string, prize: string) => {
        setLoading(true);
        setError(undefined);

        return LotteryService.create({ name, prize })
            .catch((e) => {
                setError(e.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return {
        loading,
        error,
        createLottery,
    }
}