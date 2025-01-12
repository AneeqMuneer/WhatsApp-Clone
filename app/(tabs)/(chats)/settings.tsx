import { Text, View, Image, Pressable, ScrollView, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useRef } from 'react';
import { useNavigation, router } from "expo-router";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useProfileContext } from '@/components/ProfileContext';

export default function Settings() {
    const [CameraDisplay, setCameraDisplay] = useState(false);
    const [status, requestPermission] = useCameraPermissions();
    const {profileData, updateProfileData } = useProfileContext();
    
    const cameraRef = useRef(null);

    const takePic = async () => {
        if (cameraRef.current) {
            cameraRef.current.takePictureAsync().then((photo:any) => {
                updateProfileData({ ...profileData, userImage: photo.uri})
            });
        }
        setCameraDisplay(false);
    }

    const handleCameraOpen = async () => {
        if (status?.granted) {
            setCameraDisplay(true);
        } else {
            await requestPermission();
            if (status?.granted) {
                setCameraDisplay(true);
            } else {
                alert("Camera Permission Not Granted");
            }
        }
    };

    return (
        CameraDisplay ? (
            <CameraView 
                ratio="16:9" 
                ref={cameraRef}
                animateShutter={true}
            >
                <Pressable style={styles.saveButton} onPress={takePic}>
                    <Text style={styles.saveButtonText}>Click</Text>
                </Pressable>
            </CameraView>
        ) : (
            <ScrollView style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <Pressable onPress={handleCameraOpen}>
                            <Avatar.Image
                                size={120}
                                source={{
                                    uri: profileData.userImage,
                                }}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            value={profileData.userName}
                            onChangeText={(text) => updateProfileData({ ...profileData, userName: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your status"
                            value={profileData.userStatus}
                            onChangeText={(text) => updateProfileData({ ...profileData, userStatus: text })}
                        />
                    </View>
                </View>

                <View style={styles.listContainer}>
                    <ListItem title="Account" description="Security notifications, change number" icon="key-outline" />
                    <ListItem title="Privacy" description="Block contacts, disappearing messages" icon="lock-closed-outline" />
                    <ListItem title="Avatar" description="Create, edit profile picture" icon="person-outline" />
                    <ListItem title="Favorites" description="Add, reorder, remove" icon="heart-outline" />
                    <ListItem title="Chats" description="Theme, wallpapers, chat history" icon="chatbox-ellipses-outline" />
                    <ListItem title="Notifications" description="Message, group & call tones" icon="notifications-outline" />
                    <ListItem title="Storage and data" description="Network usage, auto-download" icon="cloud-outline" />
                    <ListItem title="App language" description="English, (device language)" icon="earth-outline" />
                    <ListItem title="Help" description="Help center, contact us, privacy policy" icon="help-circle-outline" />
                    <ListItem title="Invite a friend" description="" icon="people-circle-outline" />
                    <ListItem title="App updates" description="" icon="phone-portrait-outline" />
                    <List.Subheader>Also from Meta</List.Subheader>
                    <ListItem title="Open Instagram" description="" icon="logo-instagram" />
                    <ListItem title="Open Facebook" description="" icon="logo-facebook" />
                    <ListItem title="Threads" description="" icon="chatbubble-ellipses-outline" />
                </View>
            </ScrollView>
        )
    );
}

const ListItem = ({ title, description, icon }: { title: string, description: string, icon: string, }) => (
    <View style={styles.listItem}>
        <TouchableHighlight
            underlayColor="#222E35"
            onPress={() => { }}
        >
            <List.Item
                title={title}
                description={description}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
                left={(props) => (
                    <View style={styles.listIconContainer}>
                        <Ionicons name={icon} size={27} color="white" />
                    </View>
                )}
            />
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0B141B',
        paddingVertical: 30,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: 8,
        color: 'white',
        backgroundColor: '#1A1F24',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center"
    },
    listContainer: {
        backgroundColor: '#0B141B',
        paddingTop: 30
    },
    listItem: {
        paddingVertical: 10,
    },
    listItemTitle: {
        color: 'white',
        fontWeight: "bold"
    },
    listItemDescription: {
        color: 'white',
    },
    listIconContainer: {
        marginStart: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1
    },
});