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
    const { searchText } = useSearchText()

    function searchBySharedUrl(url: URL) {
      if (url.searchParams.has('share_text')) {
        searchText.value = url.searchParams.get('share_text') || ''
        props.submit()

        return
      }
      if (url.searchParams.has('share_title')) {
        searchText.value = url.searchParams.get('share_title') || ''
        props.submit()
      }
    }

    onMounted(() => {
      const currentURL = new URL(window.location.href)
      searchBySharedUrl(currentURL)
    })

    return () => h('i', context.attrs, context.slots)
  }
})
