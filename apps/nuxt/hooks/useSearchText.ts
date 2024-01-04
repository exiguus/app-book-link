import { reactive, toRefs } from 'vue'

const state = reactive({
  searchText: ''
})

export default function useSearchText() {
  return {
    ...toRefs(state),
    setSearchText: (newSearchText: string) => {
      state.searchText = newSearchText
    }
  }
}
