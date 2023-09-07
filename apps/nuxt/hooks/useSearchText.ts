import { reactive, toRefs } from 'vue'

const state = reactive({
  searchText: ''
})

export default function useSearchText() {
  return {
    ...toRefs(state)
  }
}
