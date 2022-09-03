<script setup lang="ts">
import { computed, ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
import { TTab, TTabs } from '@temir/tab'
// import type { DanmuMsg } from 'danmu-console-helper'

const tabs = ['ALL', '弹幕', 'SC', '礼物']
const activeIndex = ref(0)
const selectedText = computed(() => tabs[activeIndex.value])

const { msg } = defineProps<{
  msg: string
}>()

const addSpace = (str: string) => {
  return ' ' + str + ' '
}
</script>

<template>
  <TBox>
    <TTabs flex-direction="column" :on-change="(index) => activeIndex = +index">
      <TTab v-for="item in tabs" :key="item">
        {{ item }}
      </TTab>
    </TTabs>
  </TBox>
</template>