import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import HomePage from "./HomePage";

const Stack = createNativeStackNavigator();

function IntroScreen({ navigation }) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Home");
        }, 10000); // Chuyển sau 10 giây

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Xin chào! Tôi là Thiên Phú</Text>
            <Text style={styles.text}>
                Hiện tại đang là sv năm 4 tại đại học SPKT
            </Text>
            <Text style={styles.text}>
                Đây là trang giới thiệu ngắn về bản thân.
            </Text>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro">
                <Stack.Screen
                    name="Intro"
                    component={IntroScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Home" component={HomePage} />
            </Stack.Navigator>
        </NavigationContainer>
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
