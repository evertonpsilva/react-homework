import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// navigation types
export type RootStackParamList = {
    Home: undefined;
    AddLottery: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Home"
>;


export type AddLotteryScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "AddLottery"
>;
