<script setup lang="ts">
import { computed } from 'vue'
import { TBox, TText } from '@temir/core'
import type { User } from 'blive-message-listener'
import { addSpace, getGuardColor } from '../utils/format'

const { userInfo } = defineProps<{
  userInfo: User
}>()

const badgeColor = computed(() => {
  if (userInfo.badge?.anchor.is_same_room) {
    return userInfo.badge.color
  }
  return '#666666'
})
</script>

<template>
  <TBox :flex-shrink="0">
    <TBox>
      <TBox v-if="userInfo.badge && userInfo.badge.active" :margin-right="1">
        <TText :background-color="badgeColor" :flex-shrink="0">{{ addSpace(userInfo.badge.name) }}</TText>
        <TText :color="badgeColor" background-color="#ffffff">{{ addSpace(userInfo.badge.level.toString()) }}</TText>
      </TBox>
    </TBox>
    <TText background-color="blue">{{ userInfo.identity?.rank ? ` 榜${userInfo.identity.rank} ` : '' }}</TText>
    <TText background-color="red">{{ userInfo.identity?.room_admin ? '房' : '' }}</TText>
    <TText bold :color="getGuardColor(userInfo.identity?.guard_level)">{{ userInfo.uname }}</TText>
    <TText>: </TText>
  </TBox>
</template>
