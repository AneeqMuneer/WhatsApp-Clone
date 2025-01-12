import { ProfileContextProvider } from "@/components/ProfileContext";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <ProfileContextProvider>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </PaperProvider>
    </ProfileContextProvider>
  );
}