<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { GuardBuyMsg } from 'blive-message-listener'
import UserName from '../UserName.vue'
import { getGuardColor } from '../../utils/format'

const { msg } = defineProps<{
  msg: GuardBuyMsg
}>()

</script>

<template>
  <TBox>
    <TBox>
      <UserName :userInfo="msg.user" />
      <TBox>
        <TText>(¥{{ msg.price / 1000 }}) </TText>
        <TText bold :color="getGuardColor(msg.guard_level)">{{ msg.gift_name }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>