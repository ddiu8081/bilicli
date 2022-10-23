declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface AppOptions {
  badge: boolean
  rank: boolean
}