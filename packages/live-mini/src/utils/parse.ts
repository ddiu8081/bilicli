import type { GuardLevel } from "blive-message-listener"

export const getGuardColor = (level: GuardLevel = 0) => {
  const colorDict = ['#967E76', '#FF7C28', '#E17AFF', '#00D1F1']
  return colorDict[level]
}
