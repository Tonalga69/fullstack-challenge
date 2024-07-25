import {create} from "zustand";

interface TagsStore {
  tags: string[];
  addTags: (tags: string[]) => void;

}

const useTagsStore = create<TagsStore>((set) => ({
  tags: [],
  addTags: (tags) => set({ tags }),
}));


export default useTagsStore;