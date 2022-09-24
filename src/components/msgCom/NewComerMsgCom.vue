<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { NewComerMsg } from 'blive-message-listener'
import UserName from '../UserName.vue'

const { msg } = defineProps<{
  msg: NewComerMsg
}>()

</script>

<template>
  <TBox>
    <TBox>
      <UserName :userInfo="msg.user" />
      <TText> 进入直播间</TText>
    </TBox>
  </TBox>
</template>