<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { SuperChatMsg } from 'blive-message-listener'
import UserName from '../UserName.vue'

const { msg } = defineProps<{
  msg: SuperChatMsg
}>()

</script>

<template>
  <TBox>
    <TBox>
      <UserName :userInfo="msg.user" />
      <TBox :flex-glow="1">
        <TText>(¥{{ msg.price }}) </TText>
        <TText :color="msg.content_color">{{ msg.content }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>