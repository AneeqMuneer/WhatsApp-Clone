import { Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    return (
        <Tabs
            initialRouteName="(chats)"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "(chats)") {
                        iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                    } else if (route.name === "Updates") {
                        iconName = focused ? "disc" : "disc-outline";
                    } else if (route.name === "Communities") {
                        iconName = focused ? "people" : "people-outline";
                    } else if (route.name === "Calls") {
                        iconName = focused ? "call" : "call-outline";
                    }

                    return <Ionicons name={iconName} color={color} size={size} />
                },
                tabBarActiveTintColor: "#00AB50",
                tabBarInactiveTintColor: "white",
                tabBarLabelStyle: {
                    fontWeight: "900",
                },
                tabBarStyle: {
                    backgroundColor: '#0B141B',
                },
                tabBarActiveBackgroundColor: "#222E35",

                headerShown: false,
                headerTitle: "",
                headerShadowVisible: false,
            })}
        >
            <Tabs.Screen name="(chats)" options={{ title: "Chats" }} />
            <Tabs.Screen name="(updates)" options={{ title: "Updates" }} />
            <Tabs.Screen name="communities" options={{ title: "Communities" }} />
            <Tabs.Screen name="calls" options={{ title: "Calls" }} />
        </Tabs>
    )
}