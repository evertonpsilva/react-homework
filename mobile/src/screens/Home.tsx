import { Button, Text, View } from "react-native";
import { FabButton } from "../components/FabButton";
import { useNavigation } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";
import { useListLotteries } from "../hooks/useListLotteries";
import { LotteriesList } from "../components/LotteriesList";
import { useEffect, useState } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SearchInput } from "../components/SearchInput";
import { RegisterLotteryModal } from "../components/RegisterLotteryModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = () => {
  const { navigate } = useNavigation<AddLotteryScreenNavigationProp>();

  const handleFabPress = () => {
    navigate("AddLottery")
  }
  const { lotteries, fetchLotteries, listLoading} = useListLotteries();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLotteries, setSelectedLotteries] = useState<string[]>([]);

  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  useEffect(() => {
    console.log('Fetching lotteries on mount');
    fetchLotteries();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  }

  const filteredLotteries = lotteries.filter(lottery => lottery.name.includes(searchQuery));

  const onPressLottery = (id: string) => {
    setSelectedLotteries(prev => {
      if (prev.includes(id)) {
        return prev.filter(lotteryId => lotteryId !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  const handleRegisterClose = async (success: boolean) => {
    setRegisterModalVisible(false);
    if (success) {
      const storedLotteries = await AsyncStorage.getItem("registeredLotteries");
      const registeredLotteries = storedLotteries ? JSON.parse(storedLotteries) : [];
      const selectedSet = new Set(selectedLotteries);
      const updatedLotteries = [...new Set([...registeredLotteries, ...selectedSet])];
      
      await AsyncStorage.setItem(
        "registeredLotteries", JSON.stringify(updatedLotteries)
      );
      fetchLotteries();
      setSelectedLotteries([]);
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: "#fff" }}>
        <FabButton onPress={handleFabPress} />
        <View style={{
          alignSelf: "flex-end"
        }}>
          <Button title="Register" onPress={() => setRegisterModalVisible(true)} disabled={listLoading || !selectedLotteries.length}/>
        </View>
        <RegisterLotteryModal visible={registerModalVisible} onClose={handleRegisterClose} lotteries={selectedLotteries} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Lotteries</Text>
          <FontAwesome5 name="dice-five" size={36} color="black" />
        </View>
        <SearchInput onChange={handleSearchChange} />
        {filteredLotteries.length === 0 && !listLoading && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No search results for "{searchQuery}"</Text>
          </View>
        )}
        {listLoading && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>Loading lotteries...</Text>
          </View>
        )}
        {filteredLotteries.length > 0 && !listLoading && (
          <LotteriesList 
            lotteries={filteredLotteries} 
            lotteriesSelected={selectedLotteries}
            onPressLottery={onPressLottery}
          />
        )}
    </View>
  );
}

const styles = {
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
    gap: 12
  },
  headerText: {
    fontSize: 36,
  },
  noResultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 32,
    gap: 8
  },
  noResultsText: {
    fontSize: 24,
  }
}