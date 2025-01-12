import React from "react";
import { View, Text, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#0B141B'
                },
                headerTintColor: 'white',
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Chats",
                    headerTitle: "",
                    headerLeft: () => {
                        return (
                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: 600,
                                    color: "#4DFE50",
                                    marginLeft: 15,
                                }}
                            >
                                WhatsApp
                            </Text>
                        )
                    },
                    headerRight: () => {
                        return (
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <Pressable style={{ marginRight: 15 }}>
                                    <Ionicons name="camera-outline" size={28} color="white" />
                                </Pressable>

                                <Menu
                                    visible={menuVisible}
                                    onDismiss={closeMenu}
                                    anchor={
                                        <Pressable onPress={openMenu}>
                                            <Ionicons name="ellipsis-vertical-outline" size={28} color="white" />
                                        </Pressable>
                                    }
                                    anchorPosition={"bottom"}
                                >
                                    <Menu.Item onPress={() => { }} title="New group" />
                                    <Menu.Item onPress={() => { }} title="New broadcast" />
                                    <Menu.Item onPress={() => { }} title="Linked devices" />
                                    <Menu.Item onPress={() => { }} title="Starred messages" />
                                    <Menu.Item
                                        onPress={() => {
                                            router.push("settings");
                                            closeMenu();
                                        }}
                                        title="Settings"
                                    />
                                    <Menu.Item
                                        onPress={() => {
                                            router.push("maps");
                                            closeMenu();
                                        }}
                                        title="Maps"
                                    />
                                </Menu>
                            </View>
                        );
                    }
                }}

            />
            <Stack.Screen
                name="settings"
                options={{
                    title: "Settings",
                }}
            />
            <Stack.Screen
                name="maps"
                options={{
                    title: "Maps",
                }}
            />
        </Stack>
    )
}