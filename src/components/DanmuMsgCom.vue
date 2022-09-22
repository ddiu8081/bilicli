<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { DanmuMsg } from 'blive-message-listener'
import { addSpace, getUserNameColor } from '../utils/format'

const { msg } = defineProps<{
  msg: DanmuMsg
}>()

</script>

<template>
  <TBox>
    <TBox>
      <TBox :flex-shrink="0">
        <TBox>
          <TBox v-if="msg.user.badge && msg.user.badge.active" :margin-right="1">
            <TText :background-color="msg.user.badge.color" :flex-shrink="0">{{ addSpace(msg.user.badge.name) }}</TText>
            <TText :color="msg.user.badge.color" background-color="#ffffff">{{ addSpace(msg.user.badge.level.toString()) }}</TText>
          </TBox>
        </TBox>
        <TText background-color="blue">{{ msg.user.identity?.rank ? ` 榜${msg.user.identity.rank} ` : '' }}</TText>
        <TText background-color="red">{{ msg.user.identity?.room_admin ? '房' : '' }}</TText>
        <TText bold :color="getUserNameColor(msg.user.identity?.guard_level)">{{ msg.user.uname }}</TText>
        <TText>: </TText>
      </TBox>
      <TBox :flex-glow="1">
        <TText>{{ msg.content }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>