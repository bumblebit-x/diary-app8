import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteDiary, toggleFavorite } from "../features/diary/diarySlice";
import { COLORS, RADIUS, SPACE } from "../styles/tokens";

type Props = {
  id: number;
  onBack: () => void;
  onEdit: () => void;
};

export default function DetailScreen({ id, onBack, onEdit }: Props) {
  const dispatch = useAppDispatch();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === id)
  );

  if (!entry) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Diary tidak ditemukan.</Text>
        <Pressable onPress={onBack} style={styles.editButton}>
          <Text style={styles.editText}>Kembali</Text>
        </Pressable>
      </ScrollView>
    );
  }

  const confirmDelete = () => {
    Alert.alert("Hapus Diary", "Diary akan dihapus dari Redux Store.", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          dispatch(deleteDiary(entry.id));
          onBack();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={onBack}>
        <Text style={styles.backLink}>← Kembali ke Home</Text>
      </Pressable>

      <Text style={styles.mood}>{entry.mood}</Text>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.date}>{entry.date}</Text>
      <Text style={styles.body}>{entry.body}</Text>

      <Pressable
        onPress={() => dispatch(toggleFavorite(entry.id))}
        style={styles.favoriteButton}
      >
        <Text style={styles.white}>
          {entry.liked ? "Hapus dari Favorite" : "Tambah ke Favorite"}
        </Text>
      </Pressable>

      <Pressable onPress={onEdit} style={styles.editButton}>
        <Text style={styles.editText}>Edit Diary</Text>
      </Pressable>

      <Pressable onPress={confirmDelete} style={styles.deleteButton}>
        <Text style={styles.white}>Hapus Diary</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACE.l, gap: SPACE.m },
  backLink: { color: COLORS.accent, fontWeight: "700", fontSize: 14 },
  mood: { fontSize: 60 },
  title: { fontSize: 26, fontWeight: "700", color: COLORS.text },
  date: { color: COLORS.muted },
  body: { fontSize: 16, lineHeight: 24, color: COLORS.text },
  favoriteButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  editButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  editText: { color: COLORS.accent, fontWeight: "700" },
  deleteButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.danger,
  },
  white: { color: "#FFFFFF", fontWeight: "700" },
});