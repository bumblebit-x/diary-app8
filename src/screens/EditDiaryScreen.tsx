import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editDiary } from "../features/diary/diarySlice";
import { COLORS, RADIUS, SPACE } from "../styles/tokens";

const MOODS = ["😊", "🔥", "😌", "😢"];

type Props = {
  id: number;
  onBack: () => void;
};

export default function EditDiaryScreen({ id, onBack }: Props) {
  const dispatch = useAppDispatch();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === id)
  );

  const [title, setTitle] = useState(entry?.title ?? "");
  const [body, setBody] = useState(entry?.body ?? "");
  const [mood, setMood] = useState(entry?.mood ?? "😊");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
      setMood(entry.mood);
    }
  }, [entry]);

  if (!entry) {
    return <Text style={{ padding: 16 }}>Diary tidak ditemukan.</Text>;
  }

  const handleUpdate = () => {
    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul diary wajib diisi minimal 3 karakter.");
      return;
    }

    if (!body.trim()) {
      Alert.alert("Validasi", "Isi cerita diary tidak boleh kosong.");
      return;
    }

    dispatch(
      editDiary({
        id: entry.id,
        title: title.trim(),
        body: body.trim(),
        mood,
      })
    );

    onBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={onBack}>
        <Text style={styles.backLink}>← Batal</Text>
      </Pressable>

      <Text style={styles.heading}>Edit Diary</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary (minimal 3 karakter)"
        style={styles.input}
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[styles.moodButton, mood === item && styles.selectedMood]}
          >
            <Text style={styles.mood}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  backLink: { color: COLORS.accent, fontWeight: "700", fontSize: 14 },
  heading: { fontSize: 24, fontWeight: "700", color: COLORS.text },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
  },
  bodyInput: { minHeight: 140, textAlignVertical: "top" },
  moodRow: { flexDirection: "row", gap: SPACE.s },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  selectedMood: { borderColor: COLORS.accent, borderWidth: 2 },
  mood: { fontSize: 28 },
  button: {
    padding: 14,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});