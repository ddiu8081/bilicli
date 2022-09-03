<script setup lang="ts">
import { onMounted, ref } from '@vue/runtime-core'
import { openRoom } from 'danmu-console-helper'
import { TBox, TText } from '@temir/core'
import DanmuMsg from './components/DanmuMsg.vue'
import TabSelector from './components/TabSelector.vue'

const roomId = 652581
const watchers = ref(0)
const watchersHighlight = ref(false)
const hot = ref(0)
const hotHighlight = ref(false)
const danmuList = ref([])

onMounted(() => {
  try {
    const handler = {
      onHeartbeat: (newHot) => {
        hot.value = newHot
        hotHighlight.value = true
        setTimeout(() => {
          hotHighlight.value = false
        }, 1000)
      },
      onWatchedChange: (newWatched) => {
        watchers.value = newWatched
        watchersHighlight.value = true
        setTimeout(() => {
          watchersHighlight.value = false
        }, 1000)
      },
      onIncomeDanmu: (msg) => {
        danmuList.value.push(msg)
      },
    }
    openRoom(roomId, handler)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <TBox flex-direction="column">
    <TBox width="100%" :padding-left="1" :padding-right="2" border-style="round" justify-content="space-between">
      <TBox>
        <TText>{{ roomId }}</TText>
      </TBox>
      <TBox>
        <TText :background-color="watchersHighlight ? 'green' : 'black'">{{ ` 👀${watchers} ` }}</TText>
        <TText :background-color="hotHighlight ? 'green' : 'black'">{{ ` 🔥${hot} ` }}</TText>
      </TBox>
    </TBox>
    <TBox>
      <TBox flex-direction="column" border-style="round">
        <TabSelector />
      </TBox>
      <TBox :flex-grow="1" flex-direction="column" width="100%" :height="16" border-style="round">
        <DanmuMsg :msg="msg" v-for="msg in danmuList" />
      </TBox>
    </TBox>
  </TBox>
</template>