import { TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

type SearchInputProps = {
    onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Filter lotteries" style={styles.input} onChangeText={onChange} />
            <FontAwesome name="search" size={16} color="#ccc" />
        </View>
    );
}

const styles = {
    container: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginHorizontal: 32,
        paddingVertical: 12,
        paddingHorizontal: 24,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
    },
    input: {
        borderWidth: 0,
    }
}