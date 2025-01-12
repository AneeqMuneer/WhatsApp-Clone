import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";

export default function FAB({ actions }: { actions: any[] }) {
    return (
        <FloatingAction
            actions={actions}
            onPressItem={(name) => {
                console.log(`selected button: ${name}`);
            }}
        />
    );
};