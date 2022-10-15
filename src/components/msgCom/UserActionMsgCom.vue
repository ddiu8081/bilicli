<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { UserActionMsg } from 'blive-message-listener'
import UserName from '../UserName.vue'

const { msg } = defineProps<{
  msg: UserActionMsg
}>()

const typeDict = {
  enter: '进入',
  follow: '关注',
  share: '分享',
  unknown: '-',
}

</script>

<template>
  <TBox>
    <TBox>
      <UserName :userInfo="msg.user" />
      <TText>{{ typeDict[msg.action] }}</TText>
      <TText>直播间</TText>
    </TBox>
  </TBox>
</template>