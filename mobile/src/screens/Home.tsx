import { Text, View } from "react-native";
import { FabButton } from "../components/FabButton";
import { useNavigation } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";

export const Home = () => {
  const { navigate } = useNavigation<AddLotteryScreenNavigationProp>();

  const handleFabPress = () => {
    navigate("AddLottery")
  }

  return (
    <View style={{ flex: 1 }}>
        <FabButton onPress={handleFabPress} />
        <Text>Home Screen</Text>
    </View>
  );
}