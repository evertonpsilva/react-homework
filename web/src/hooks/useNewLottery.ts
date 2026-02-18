import { useState } from "react";
import * as LotteryService from "../services/lottery";

export function useNewLottery() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();


    const createLottery = async (name: string, prize: string) => {
        setLoading(true);
        setError(undefined);

        return LotteryService.create({ name, prize })
            .then(() => {
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                setError(e.message);
            })
    }

    return {
        loading,
        error,
        createLottery,
    }
}