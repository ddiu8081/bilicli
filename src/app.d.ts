declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface AppOptions {
  roomId: number
  badge: boolean
  rank: boolean
}