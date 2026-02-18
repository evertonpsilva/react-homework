import { useState } from "react";
import * as LotteryService from "../services/lottery";
import type { Lottery } from "../interfaces/Lottery";

export function useListLotteries() {
    const [listLoading, setListLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [lotteries, setLotteries] = useState<Lottery[]>([]);

    const fetchLotteries = async () => {
        console.log('Fetching lotteries');
        setListLoading(true);
        setError(undefined);

        return LotteryService.list()
            .then((response) => {
                setLotteries(response);
                setListLoading(false);
            })
            .catch((e) => {
                setListLoading(false);
                setError(e.message);
            })
    }

    return {
        listLoading,
        error,
        lotteries,
        fetchLotteries,
    }
}