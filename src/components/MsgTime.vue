<script setup lang="ts">
import { computed } from 'vue'
import { TBox, TText } from '@temir/core'
import dayjs from 'dayjs'

const { timestamp } = defineProps<{
  timestamp: number
}>()
</script>

<template>
  <TBox :margin-right="1">
    <TText color="#666666">{{ dayjs(timestamp).format('HH:mm:ss') }}</TText>
  </TBox>
</template>
  