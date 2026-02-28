import { Pressable, StyleSheet, Text, View } from "react-native";

type FabButtonProps = {
  onPress: () => void;
}

export const FabButton = ({ onPress }: FabButtonProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <Text style={styles.text}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 60,
        height: 60,
        borderRadius: 32,
        backgroundColor: 'rgba(245, 50, 131, 1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 48,
        lineHeight: 48,
        fontWeight: '300'
    }
})