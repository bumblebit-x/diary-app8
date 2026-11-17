import React from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearAllFavorites, toggleFavorite } from "../features/diary/diarySlice";
import DiaryCard from "../components/DiaryCard";
import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

type Props = {
  onOpenDetail: (id: number) => void;
};

export default function FavoritesScreen({ onOpenDetail }: Props) {
  const dispatch = useAppDispatch();

  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((entry) => entry.liked)
  );

  const handleClearAll = () => {
    Alert.alert(
      "Hapus Semua Favorite",
      "Semua tanda favorit pada diary akan dihapus. Lanjutkan?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Kosongkan",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Favorite</Text>
          <Text style={styles.counter}>{favoriteEntries.length} diary favorite</Text>
        </View>

        {favoriteEntries.length > 0 && (
          <Pressable onPress={handleClearAll} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Hapus Semua</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() => onOpenDetail(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Daftar Favorite Kosong</Text>
            <Text style={styles.emptyDesc}>
              Tandai ikon hati (♥) pada kartu diary di halaman Home untuk menyimpannya ke daftar favorit.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACE.m,
  },
  header: { fontSize: TYPO.h1, fontWeight: "700", color: COLORS.text },
  counter: { color: COLORS.muted },
  clearBtn: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  clearBtnText: { color: COLORS.danger, fontWeight: "700", fontSize: 12 },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACE.xl,
    marginTop: 24,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginBottom: 4 },
  emptyDesc: { fontSize: 13, color: COLORS.muted, textAlign: "center", lineHeight: 19 },
});