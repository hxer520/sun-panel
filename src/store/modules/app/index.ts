import { defineStore } from 'pinia'
import type { AppState, Language, Theme } from './helper'
import { defaultSetting, getLocalSetting, removeLocalState, setLocalSetting } from './helper'
import { store } from '@/store'

export const useAppStore = defineStore('app-store', {
  state: (): AppState => getLocalSetting(),
  actions: {
    setSiderCollapsed(collapsed: boolean) {
      this.siderCollapsed = collapsed
      this.recordState()
    },

    setTheme(theme: Theme) {
      this.theme = theme
      this.recordState()
    },

    setLanguage(language: Language) {
      if (this.language !== language) {
        this.language = language
        this.recordState()
      }
    },

    recordState() {
      setLocalSetting(this.$state)
    },

    removeToken() {
      this.$state = defaultSetting()
      removeLocalState()
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
