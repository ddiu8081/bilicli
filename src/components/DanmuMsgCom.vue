<script setup lang="ts">
import { computed } from 'vue'
import { TBox, TText } from '@temir/core'
import type { DanmuMsg } from 'blive-message-listener'
import UserName from './UserName.vue'

const { msg } = defineProps<{
  msg: DanmuMsg
}>()

const badgeColor = computed(() => {
  if (msg.user.badge?.anchor.is_same_room) {
    return msg.user.badge.color
  }
  return '#666666'
})

</script>

<template>
  <TBox>
    <TBox>
      <UserName :userInfo="msg.user" />
      <TBox :flex-glow="1">
        <TText>{{ msg.content }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>