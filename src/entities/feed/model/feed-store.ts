import { create } from "zustand";
import type { Record } from "@/entities/record/model/types";

type FeedState = {
  records: Record[];
  setRecords: (records: Record[]) => void;
  prependRecord: (record: Record) => void;
};

export const useFeedStore = create<FeedState>((set) => ({
  records: [],
  setRecords: (records) => set({ records }),
  prependRecord: (record) =>
    set((state) => ({ records: [record, ...state.records] })),
}));
