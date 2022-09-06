<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { DanmuMsg } from 'danmu-console-helper'

const { msg } = defineProps<{
  msg: DanmuMsg
}>()

const addSpace = (str: string) => {
  return ' ' + str + ' '
}
</script>

<template>
  <TBox>
    <TBox>
      <TBox :flex-shrink="0">
        <TBox v-if="msg.user.badge" :margin-right="1">
          <TText :background-color="msg.user.badge.color" :flex-shrink="0">{{ addSpace(msg.user.badge.name) }}</TText>
          <TText :color="msg.user.badge.color" background-color="#ffffff">{{ addSpace(msg.user.badge.level.toString()) }}</TText>
        </TBox>
        <TText bold>{{ msg.user.uname }}: </TText>
      </TBox>
      <TBox :flex-glow="1">
        <TText>{{ msg.content }}</TText>
      </TBox>
      <!-- <TText>{{ JSON.stringify(props.msg) }}</TText> -->
    </TBox>
  </TBox>
</template>