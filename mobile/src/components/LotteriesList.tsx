import { FlatList, Pressable, Text, View } from "react-native";
import { Lottery } from "../interfaces/Lottery";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type ListLotteryProps = {
    lotteries: Lottery[];
    lotteriesSelected?: string[];
    onPressLottery?: (id: string) => void;
}
export const LotteriesList = ({ lotteries, lotteriesSelected, onPressLottery }: ListLotteryProps) => {

    const Item = ({ name, prize, id, status }: Lottery) => {
        const isSelected = lotteriesSelected?.includes(id);
        return (
            <Pressable onPress={() => status !== "finished" && onPressLottery?.(id)}>
                <View style={[styles.lotteryItem, isSelected && styles.lotteryItemSelected, status === "finished" && { opacity: 0.3 }]}>
                    <FontAwesome6 style={styles.lotteryIcon} name="arrows-rotate" size={24} color="black" />
                    <Text style={styles.lotteryName}>{name}</Text>
                    <Text style={styles.lotteryPrize}>{prize}</Text>
                    <Text style={styles.lotteryId}>{id}</Text>
                </View>
            </Pressable>
        )
    };

  return (
    <FlatList 
        data={lotteries} 
        renderItem={({ item }) => <Item name={item.name} prize={item.prize} id={item.id} />} 
        keyExtractor={(item) => item.id}
    >
      <Text>Lotteries List</Text>
    </FlatList>
  );
}

const styles = {
    container: {
        flex: 1,
        padding: 16,
    },
    lotteryItem: {
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginBottom: 16,
    },
    lotteryItemSelected: {
        borderColor: "blue",
    },
    lotteryIcon: {
        alignSelf: "flex-end",
    },
    lotteryName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    lotteryPrize: {
        fontSize: 16,
        marginBottom: 8
    },
    lotteryId: {
        fontSize: 14,
    }
}