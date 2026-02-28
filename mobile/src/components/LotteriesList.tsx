import { FlatList, Text, View } from "react-native";
import { Lottery } from "../interfaces/Lottery";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type ListLotteryProps = {
    lotteries: Lottery[];
}
export const LotteriesList = ({ lotteries }: ListLotteryProps) => {

    const Item = ({ name, prize, id }: { name: string; prize: string; id: string }) => (
        <View style={styles.lotteryItem}>
            <FontAwesome6 style={styles.lotteryIcon} name="arrows-rotate" size={24} color="black" />
            <Text style={styles.lotteryName}>{name}</Text>
            <Text style={styles.lotteryPrize}>{prize}</Text>
            <Text style={styles.lotteryId}>{id}</Text>
        </View>
    );

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