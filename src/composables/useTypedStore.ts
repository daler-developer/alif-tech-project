import { useStore } from 'vuex'
import { key } from '../store/store'

export default () => {
  return useStore(key)
}
