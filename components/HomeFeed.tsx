import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFeed } from "@/hooks/useFeed";
import { FeedCard } from "@/components/ui/FeedCard";
import { StoryRing } from "@/components/ui/StoryRing";
import { colors } from "@/constants/colors";
import { spacing, fontSize } from "@/constants/theme";
import type { Record, User } from "@/types";

export function HomeFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useFeed();

  const records: Record[] = data?.pages.flat() ?? [];
  const storyUsers: User[] = Array.from(
    new Map(
      records
        .filter((r) => r.user)
        .map((r) => [r.user_id, r.user as User])
    ).values()
  );

  function renderHeader() {
    if (storyUsers.length === 0) return null;
    return (
      <FlatList
        horizontal
        data={storyUsers}
        keyExtractor={(u) => u.id}
        renderItem={({ item }) => <StoryRing user={item} hasNew />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyList}
        style={styles.storyBar}
      />
    );
  }

  function renderEmpty() {
    if (isLoading) return null;
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🍽️</Text>
        <Text style={styles.emptyTitle}>아직 기록이 없어요</Text>
        <Text style={styles.emptyDesc}>친구를 초대하거나 첫 맛집을 기록해보세요!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.accent.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={records}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedCard record={item} />}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.list}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={refetch}
          tintColor={colors.accent.primary}
        />
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator color={colors.accent.primary} style={styles.footer} />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  storyBar: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    backgroundColor: colors.bg.primary,
  },
  storyList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  list: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  footer: { marginVertical: spacing.md },
  empty: {
    alignItems: "center",
    paddingTop: 80,
    gap: spacing.sm,
  },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.sm },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  emptyDesc: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
});
