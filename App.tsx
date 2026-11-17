import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { COLORS } from "./src/styles/tokens";

import HomeScreen from "./src/screens/HomeScreen";
import CreateScreen from "./src/screens/CreateScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import DetailScreen from "./src/screens/DetailScreen";
import EditDiaryScreen from "./src/screens/EditDiaryScreen";

export default function App() {
  const [screen, setScreen] = useState<"home" | "create" | "favorites" | "detail" | "edit">("home");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openDetail = (id: number) => {
    setSelectedId(id);
    setScreen("detail");
  };

  const openEdit = (id: number) => {
    setSelectedId(id);
    setScreen("edit");
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        <View style={styles.content}>
          {screen === "home" && (
            <HomeScreen onOpenDetail={openDetail} />
          )}
          {screen === "create" && (
            <CreateScreen onDone={() => setScreen("home")} />
          )}
          {screen === "favorites" && (
            <FavoritesScreen onOpenDetail={openDetail} />
          )}
          {screen === "detail" && selectedId !== null && (
            <DetailScreen
              id={selectedId}
              onBack={() => setScreen("home")}
              onEdit={() => openEdit(selectedId)}
            />
          )}
          {screen === "edit" && selectedId !== null && (
            <EditDiaryScreen
              id={selectedId}
              onBack={() => setScreen("detail")}
            />
          )}
        </View>

        {(screen === "home" || screen === "create" || screen === "favorites") && (
          <View style={styles.tabBar}>
            <Pressable onPress={() => setScreen("home")} style={styles.tabItem}>
              <Text style={[styles.tabText, screen === "home" && styles.tabActive]}>Home</Text>
            </Pressable>
            <Pressable onPress={() => setScreen("create")} style={styles.tabItem}>
              <Text style={[styles.tabText, screen === "create" && styles.tabActive]}>Tambah</Text>
            </Pressable>
            <Pressable onPress={() => setScreen("favorites")} style={styles.tabItem}>
              <Text style={[styles.tabText, screen === "favorites" && styles.tabActive]}>Favorite</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabText: { fontSize: 13, fontWeight: "600", color: COLORS.muted },
  tabActive: { color: COLORS.accent, fontWeight: "700" },
});