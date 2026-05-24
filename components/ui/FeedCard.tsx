import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { spacing, radius, fontSize } from "@/constants/theme";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import type { FeedCardProps } from "@/types";

const CARD_IMAGE_HEIGHT = Dimensions.get("window").width - spacing.md * 2;

export function FeedCard({ record }: FeedCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push(`/record/${record.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${record.place_name} 기록`}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userRow}
          onPress={() => router.push(`/friend/${record.user_id}`)}
          accessibilityRole="button"
        >
          <Avatar uri={record.user?.avatar_url} nickname={record.user?.nickname} size={36} />
          <View style={styles.userInfo}>
            <Text style={styles.nickname}>{record.user?.nickname ?? "유저"}</Text>
            <Text style={styles.date}>
              {new Date(record.created_at).toLocaleDateString("ko-KR")}
            </Text>
          </View>
        </TouchableOpacity>
        <StarRating value={record.rating} readonly size={16} />
      </View>

      <Image
        source={{ uri: record.photo_url }}
        style={styles.image}
        accessibilityLabel={`${record.place_name} 사진`}
      />

      <View style={styles.body}>
        <Text style={styles.placeName}>{record.place_name}</Text>
        {record.menu_name ? (
          <Text style={styles.menuName}>{record.menu_name}</Text>
        ) : null}
        <Text style={styles.review} numberOfLines={3}>
          {record.review}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.card,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  userInfo: {
    gap: 2,
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
  image: {
    width: "100%",
    height: CARD_IMAGE_HEIGHT,
    backgroundColor: colors.bg.input,
  },
  body: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  placeName: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text.primary,
  },
  menuName: {
    fontSize: fontSize.sm,
    color: colors.accent.primary,
    fontWeight: "500",
  },
  review: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
});
