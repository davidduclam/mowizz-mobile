import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf={{ default: "tv", selected: "tv.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="watchlist">
        <Label>Watchlist</Label>
        <Icon sf={{ default: "bookmark", selected: "bookmark.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
