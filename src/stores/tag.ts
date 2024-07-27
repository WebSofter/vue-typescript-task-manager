import type { ITag } from '@/types/tag'
import { defineStore } from 'pinia'

const STORE_NAME = 'tag'

const defaultTag: ITag = {
  name: 'Общая',
  value: 'общая',
}

const getDefaultTags = () => (defaultTag)

const getTags = () => {
  const tags = localStorage.getItem(STORE_NAME)
  return tags ? JSON.parse(tags) : [getDefaultTags()]
}
const saveTags = (tags: ITag[]) => localStorage.setItem(STORE_NAME, JSON.stringify(tags))
export const useTagStore = defineStore(STORE_NAME, {
  state: () => ({
    tags: getTags(),
  }),
  actions: {
    getTags(): ITag[] {
      return getTags()
    },
    addTag(tag: ITag) {
      const isAdded = this.tags.find((t: ITag) => tag.value.toLowerCase() === t.value.toLowerCase())
      if(!isAdded) {
        this.tags = [
          ...this.tags,
          tag,
        ]
        saveTags(this.tags)
      }
    },
    addTags(tags: ITag[]) {
      tags.forEach((tag: ITag) => {
        const isAdded = this.tags.find((t: ITag) => tag.value.toLowerCase() === t.value.toLowerCase())
        if(!isAdded) {
          this.tags = [
            ...this.tags,
            tag,
          ]
        }
      })
      saveTags(this.tags)
    },
  },
})