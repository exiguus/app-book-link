import { defineComponent, onMounted } from 'vue'
import useSearchText from '@/hooks/useSearchText'

export default defineComponent({
  name: 'SearchByUrl',
  props: {
    submit: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const { searchText, setSearchText } = useSearchText()

    function searchBySharedUrl(url: URL) {
      if (url.searchParams.has('share_text')) {
        const value = url.searchParams.get('share_text') || ''
        setSearchText(value)
        searchText.value = value
        props.submit()

        return
      }
      if (url.searchParams.has('share_title')) {
        const value = url.searchParams.get('share_title') || ''
        setSearchText(value)
        searchText.value = value
        props.submit()
      }
    }

    onMounted(() => {
      const currentURL = new URL(window.location.href)
      searchBySharedUrl(currentURL)
    })

    watch(
      () => useRoute().fullPath,
      () => {
        const currentURL = new URL(window.location.href)
        searchBySharedUrl(currentURL)
      }
    )

    return () => h('i', context.attrs, context.slots)
  }
})
