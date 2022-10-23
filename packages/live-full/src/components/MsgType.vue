<script setup lang="ts">
import { computed } from 'vue'
import { TBox, TText } from '@temir/core'

const { type } = defineProps<{
  type: string
}>()

const typeDict: Record<string, string> = {
  DANMU_MSG: '弹幕',
  SUPER_CHAT_MESSAGE: 'SC',
  SEND_GIFT: '礼物',
  GUARD_BUY: '上舰',
  INTERACT_WORD: '进场',
  ENTRY_EFFECT: '进场',
}
</script>

<template>
  <TBox :margin-right="1">
    <TText color="yellow">[{{ typeDict[type] }}]</TText>
  </TBox>
</template>
    