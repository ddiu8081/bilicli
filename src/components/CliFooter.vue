<script setup lang="ts">
import { ref, watch } from 'vue'
import { TBox, TText } from '@temir/core'
import dayjs from 'dayjs'
import type { Message, NewComerMsg } from 'blive-message-listener'
import NewComerCom from './msgCom/NewComerMsgCom.vue'

interface LiveStatus {
  isLive: boolean
  startTime: string
}

const props = defineProps<{
  newestWatcher: Message<NewComerMsg> | null
  liveStatus: LiveStatus
  watchers: number
  attention: number
}>()

const watchersHighlight = ref(false)
const attentionHighlight = ref(false)
const timer = ref(0)
const timeText = ref(' ')

watch(() => props.liveStatus, liveStatus => {
  if (!liveStatus.isLive) {
    clearInterval(timer.value)
    return
  }
  timer.value = 0
  clearInterval(timer.value)
  // @ts-ignore
  timer.value = setInterval(() => {
    const liveSeconds = dayjs().diff(liveStatus.startTime, 'second')
    timeText.value = formatSeconds(liveSeconds)
  }, 1000)
})

watch(() => props.watchers, () => {
  watchersHighlight.value = true
  setTimeout(() => {
    watchersHighlight.value = false
  }, 1000)
})

watch(() => props.attention, () => {
  attentionHighlight.value = true
  setTimeout(() => {
    attentionHighlight.value = false
  }, 1000)
})

const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const secs = seconds - hours * 3600 - minutes * 60
  const formatH = hours ? `${hours}` : ''
  const formatM = hours ? (minutes < 10 ? `0${minutes}` : `${minutes}`) : `${minutes}`
  const formatS = secs < 10 ? `0${secs}` : `${secs}`
  return `${formatH ? `${formatH}:` : ''}${formatM}:${formatS}`
}

</script>

<template>
  <TBox width="100%" :padding-left="1" :padding-right="2" border-style="single" justify-content="space-between">
    <TBox>
      <NewComerCom v-if="props.newestWatcher" :msg="props.newestWatcher.body" :key="props.newestWatcher.id" />
    </TBox>
    <TBox>
      <TBox>
        <TBox v-if="liveStatus">
          <TBox>
            <TText v-if="liveStatus.isLive">🔴</TText>
            <TText v-else>⚫️</TText>
          </TBox>
          <TBox>
            <template v-if="liveStatus.startTime">
              <TText>{{ timeText }}</TText>
              <TText> (Start at {{ dayjs(liveStatus.startTime).format('HH:mm') }}) </TText> 
            </template>
          </TBox>
        </TBox>
      </TBox>
      <TText :background-color="watchersHighlight ? 'green' : 'black'">{{ ` 👀${props.watchers} ` }}</TText>
      <TText :background-color="attentionHighlight ? 'green' : 'black'">{{ ` 🔥${props.attention} ` }}</TText>
    </TBox>
  </TBox>
</template>