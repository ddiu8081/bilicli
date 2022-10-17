import { blue } from 'colorette'
import type { User } from 'blive-message-listener'

export const username = (user: User) => {
  return blue(user.uname)
}