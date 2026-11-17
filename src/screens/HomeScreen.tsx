import React from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import DiaryCard from "../components/DiaryCard";
import { setMoodFilter, toggleFavorite } from "../features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

const MOOD_FILTERS = ["Semua", "😊", "🔥", "😌", "😢"];

type Props = {
  onOpenDetail: (id: number) => void;
};

export default function HomeScreen({ onOpenDetail }: Props) {
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);
  const moodFilter = useAppSelector((state) => state.diary.moodFilter);

  const totalDiary = entries.length;
  const totalFavorite = entries.filter((item) => item.liked).length;

  const filteredEntries =
    moodFilter === "Semua"
      ? entries
      : entries.filter((item) => item.mood === moodFilter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      {/* Statistik Total Diary & Total Favorite */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Diary</Text>
          <Text style={styles.statValue}>{totalDiary}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Favorite</Text>
          <Text style={[styles.statValue, { color: COLORS.danger }]}>{totalFavorite}</Text>
        </View>
      </View>

      {/* Filter Mood */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {MOOD_FILTERS.map((m) => {
            const active = moodFilter === m;
            return (
              <Pressable
                key={m}
                onPress={() => dispatch(setMoodFilter(m))}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{m}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredEntries}
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
            <Text style={styles.emptyTitle}>Belum Ada Catatan Diary</Text>
            <Text style={styles.emptyDesc}>
              {moodFilter === "Semua"
                ? "Tekan tab Tambah di bawah untuk mulai menulis catatan harian pertamamu."
                : `Tidak ditemukan catatan dengan filter mood ${moodFilter}.`}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: "700", color: COLORS.text, marginBottom: SPACE.s },
  statsRow: { flexDirection: "row", gap: SPACE.m, marginBottom: SPACE.m },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
  },
  statLabel: { fontSize: TYPO.caption, color: COLORS.muted, fontWeight: "600" },
  statValue: { fontSize: 20, fontWeight: "800", color: COLORS.accent, marginTop: 2 },
  filterWrapper: { marginBottom: SPACE.m },
  filterRow: { flexDirection: "row", gap: SPACE.s },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  filterText: { fontSize: 13, fontWeight: "600", color: COLORS.text },
  filterTextActive: { color: "#FFFFFF" },
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