<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { DanmuMsg } from 'blive-message-listener'
import UserName from '../UserName.vue'

const { msg } = defineProps<{
  msg: DanmuMsg
}>()

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