import Vue from 'vue'
import functions from '@/components/helpers/vuePrototypeFunctions'

Object.keys(functions).forEach((name) => {
  Vue.prototype[name] = functions[name]
})
