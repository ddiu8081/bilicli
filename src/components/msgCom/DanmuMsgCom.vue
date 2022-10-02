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
        <TText color="yellow" v-if="msg.lottery">[抽奖] </TText>
        <TText color="yellow" v-if="msg.emoticon">[表情] </TText>
        <TText>{{ msg.content }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>