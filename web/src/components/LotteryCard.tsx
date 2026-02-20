import { Autorenew, Refresh } from "@mui/icons-material";
import { Card, CardContent, CardHeader } from "@mui/material";
import type { Lottery } from "../interfaces/Lottery";

interface Props {
    lottery: Lottery;
    onSelect: (lottery: Lottery) => void;
    selected: boolean;
}

const LotteryCard = ({ lottery, onSelect, selected }: Props) => {
  return (
    <Card variant='outlined' onClick={() => onSelect(lottery)}
        className={selected ? 'selected' : ''}>
        <CardContent >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Autorenew style={{
                    alignSelf: 'flex-end'
                }}/>
                <h3 style={{
                    margin: '0 0 8px 0'
                }}>{lottery.name}</h3>
                <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: '#666',
                }}>{lottery.prize}</p>
                <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: '#666',
                }}>{lottery.id}</p>
            </div>
        </CardContent>
    </Card>
  );
}

export default LotteryCard;