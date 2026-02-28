import { Text, View } from "react-native";
import { FabButton } from "../components/FabButton";
import { useNavigation } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";
import { useListLotteries } from "../hooks/useListLotteries";
import { LotteriesList } from "../components/LotteriesList";
import { useEffect, useState } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SearchInput } from "../components/SearchInput";

export const Home = () => {
  const { navigate } = useNavigation<AddLotteryScreenNavigationProp>();

  const handleFabPress = () => {
    navigate("AddLottery")
  }
  const { lotteries, fetchLotteries, listLoading} = useListLotteries();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log('Fetching lotteries on mount');
    fetchLotteries();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  }

  const filteredLotteries = lotteries.filter(lottery => lottery.name.includes(searchQuery));

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: "#fff" }}>
        <FabButton onPress={handleFabPress} />
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
          <LotteriesList lotteries={filteredLotteries} />
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