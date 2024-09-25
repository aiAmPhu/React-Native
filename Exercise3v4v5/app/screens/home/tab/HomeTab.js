import React, { useState, useCallback } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";

import { getListJobs } from "../../../services/JobAPIService";

export default function HomeTab({ navigation }) {
    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getListJobs();
            if (data.success) {
                setJobList(data.result);
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch job information.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    const JobItem = ({ item }) => (
        <TouchableOpacity
            className="flex-row bg-white p-4 rounded-lg mb-4 shadow-sm"
            onPress={() => navigation.navigate("JobDetail", { job: item })}
        >
            <Image
                source={{ uri: item.logo }}
                className="w-16 h-16 rounded-lg mr-4"
            />
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                </Text>
                <Text className="text-sm text-gray-600 mb-2">
                    {item.company}
                </Text>
                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-sm text-gray-700 bg-gray-100 py-1 px-2 rounded-md">
                        {item.address}
                    </Text>
                    <Text className="text-sm text-green-600 bg-[#e8f5e9] py-1 px-2 rounded-md">
                        {item.salary}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderMiniList = ({ item }) => (
        <View className="mr-4">
            {item.map((job) => (
                <JobItem key={job.id} item={job} />
            ))}
        </View>
    );

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <StatusBar style="auto" />
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }

    const miniLists = chunkArray(jobList, 4).slice(0, 3);

    return (
        <View className="flex-1 bg-gray-100 pt-3">
            <StatusBar style="auto" />

            {/* Search bar */}
            <View className="flex-row items-center bg-white rounded-lg py-3 px-4 mx-3 mt-8 mb-4 shadow-sm">
                <Ionicons
                    name="search"
                    size={24}
                    color="#888"
                    className="mr-3"
                />
                <TouchableOpacity
                    className="flex-1"
                    onPress={() => navigation.navigate("Search")}
                >
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Tìm kiếm công việc"
                        editable={false} // Không cho phép nhập trong trang này
                    />
                </TouchableOpacity>
            </View>

            {/* Header with "Việc làm tốt nhất" and "Xem tất cả" */}
            <View className="flex-row justify-between items-center px-4 mb-2">
                <Text className="text-lg font-bold text-gray-800">
                    Việc làm tốt nhất
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("JobList")}
                >
                    <Text className="text-green-600 font-bold text-base">
                        Xem tất cả
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Job mini lists */}
            <FlatList
                data={miniLists}
                renderItem={renderMiniList}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 12 }}
            />
        </View>
    );
}
