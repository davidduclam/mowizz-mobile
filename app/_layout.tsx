import { SearchProvider } from "@/components/SearchContext";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import "./globals.css";

export default function RootLayout() {
  return (
    <SearchProvider>
      <NativeTabs minimizeBehavior="onScrollDown">
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon
            sf={{ default: "house", selected: "house.fill" }}
            drawable="custom_home_drawable"
          />
        </NativeTabs.Trigger>
        {/* <NativeTabs.Trigger name="profile">
          <Label>Profile</Label>
          <Icon
            sf={{ default: "house", selected: "house.fill" }}
            drawable="custom_home_drawable"
          />
        </NativeTabs.Trigger> */}
        <NativeTabs.Trigger name="search" role="search">
          <Label>Search</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </SearchProvider>
  );
}
