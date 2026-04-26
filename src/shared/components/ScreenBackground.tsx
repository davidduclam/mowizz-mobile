import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function ScreenBackground() {
  return (
    <>
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "#09090E" }]}
      />
      <LinearGradient
        colors={["rgba(59,82,156,0.22)", "rgba(59,82,156,0.08)", "transparent"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[StyleSheet.absoluteFillObject, { bottom: "45%" }]}
        pointerEvents="none"
      />
    </>
  );
}
