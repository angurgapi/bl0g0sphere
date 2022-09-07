import actions from '@/store/actions'
import mutations from '@/store/mutations'

export const state = () => ({
  envData: {
    tinymce: process.env.TINYMCE
  }
})

export { mutations, actions }
