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
        <TText>(¥{{ msg.price / 1000 }}) </TText>
        <TText>【{{ msg.gift_name }}】 * {{ msg.amount }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>