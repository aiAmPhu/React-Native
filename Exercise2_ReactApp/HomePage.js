// HomePage.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Chào mừng bạn đến với trang Homepage!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
    },
});
