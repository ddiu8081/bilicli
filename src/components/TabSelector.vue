<script setup lang="ts">
import { computed, ref } from 'vue'
import { TBox, TText } from '@temir/core'
import { TTab, TTabs } from '@temir/tab'
// import type { DanmuMsg } from 'danmu-console-helper'

const tabs = ['ALL', '弹幕', 'SC', '礼物', '上舰', '进场']
const activeIndex = ref(0)

const emit = defineEmits<{
  (e: 'change', value: number): void
}>()

const handleTabChange = (index: string) => {
  activeIndex.value = +index
  emit('change', parseInt(index))
}
</script>

<template>
  <TBox>
    <TTabs flex-direction="column" :on-change="handleTabChange">
      <TTab v-for="item in tabs" :key="item">
        {{ item }}
      </TTab>
    </TTabs>
  </TBox>
</template>