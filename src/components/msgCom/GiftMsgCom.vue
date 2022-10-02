<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { GiftMsg } from 'blive-message-listener'
import UserName from '../UserName.vue'

const { msg } = defineProps<{
  msg: GiftMsg
}>()

</script>

<template>
  <TBox>
    <TBox>
      <UserName :userInfo="msg.user" />
      <TBox>
        <TText>赠送了</TText>
        <TText>
          <TText color="magenta"> (¥{{ msg.price / 1000 }}) </TText>
          <TText color="magenta">{{ msg.gift_name }}</TText>
          <TText> * {{ msg.amount }}</TText>
        </TText>
        <TText v-if="msg.send_master?.uname">
          <TText> 给 </TText>
          <TText color="magenta" dimColor>{{ msg.send_master.uname }}</TText>
        </TText>
      </TBox>
    </TBox>
  </TBox>
</template>