import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchRecord } from "@/entities/record/api/fetch-record";
import { Header } from "@/shared/layout/Header";
import { Avatar } from "@/shared/ui/Avatar";
import { StarRating } from "@/shared/ui/StarRating";
import { colors } from "@/shared/config/colors";
import { spacing, fontSize } from "@/shared/config/theme";

export function RecordDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: record, isLoading } = useQuery({
    queryKey: ["record", id],
    queryFn: () => fetchRecord(id),
    enabled: !!id,
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="기록 상세" showBack />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.accent.primary} />
        </View>
      ) : record ? (
        <ScrollView>
          <Image
            source={{ uri: record.photo_url }}
            style={styles.photo}
            accessibilityLabel={`${record.place_name} 사진`}
          />

          <View style={styles.body}>
            <View style={styles.placeRow}>
              <Text style={styles.placeName}>{record.place_name}</Text>
              <StarRating value={record.rating} readonly size={18} />
            </View>

            {record.place_address ? (
              <Text style={styles.address}>{record.place_address}</Text>
            ) : null}

            {record.menu_name ? (
              <Text style={styles.menuName}>🍽️ {record.menu_name}</Text>
            ) : null}

            <Text style={styles.review}>{record.review}</Text>

            <View style={styles.divider} />

            <View style={styles.userRow}>
              <Avatar
                uri={record.user?.avatar_url}
                nickname={record.user?.nickname}
                size={32}
              />
              <View>
                <Text style={styles.nickname}>{record.user?.nickname}</Text>
                <Text style={styles.date}>
                  {new Date(record.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loader}>
          <Text style={{ color: colors.text.secondary }}>기록을 찾을 수 없어요.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  photo: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: colors.bg.input,
  },
  body: {
    padding: spacing.md,
    gap: spacing.md,
  },
  placeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeName: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text.primary,
    flex: 1,
  },
  address: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  menuName: {
    fontSize: fontSize.md,
    color: colors.accent.primary,
    fontWeight: "500",
  },
  review: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.default,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  nickname: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text.primary,
  },
  date: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
  },
});
