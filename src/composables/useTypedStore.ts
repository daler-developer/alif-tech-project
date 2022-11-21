import { useStore } from 'vuex'
import { key } from '../vuex/store'

export default () => {
  return useStore(key)
}
