<script setup lang="ts">
import { computed } from 'vue'
import { TBox, TText } from '@temir/core'
import type { DanmuMsg } from 'danmu-console-helper'

const { msg } = defineProps<{
  msg: DanmuMsg
}>()

const nameColor = computed(() => {
  const level = msg.user.identity.member
  // 舰长: 3 提督: 2 总督: 1
  const colorDict = ['white', 'red', 'magenta', 'blue']
  return colorDict[level] || 'white'
})

const rankText = computed(() => {
  const level = msg.user.identity.rank
  const rankDict = [' 1️⃣  ', ' 2️⃣  ', ' 3️⃣  ']
  return rankDict[level - 1] || ''
})

const addSpace = (str: string) => {
  return ' ' + str + ' '
}
</script>

<template>
  <TBox>
    <TBox>
      <TBox :flex-shrink="0">
        <TBox v-if="msg.user.badge && msg.user.badge.active" :margin-right="1">
          <TText :background-color="msg.user.badge.color" :flex-shrink="0">{{ addSpace(msg.user.badge.name) }}</TText>
          <TText :color="msg.user.badge.color" background-color="#ffffff">{{ addSpace(msg.user.badge.level.toString()) }}</TText>
        </TBox>
        <TText bold :color="nameColor">{{ msg.user.uname }}</TText>
        <TText>{{ rankText }}</TText>
        <TText>: </TText>
      </TBox>
      <TBox :flex-glow="1">
        <TText>{{ msg.content }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>