<script setup lang="ts">
import { ref, watch } from 'vue'
import { TBox, TText } from '@temir/core'
import dayjs from 'dayjs'
import { addSpace } from '../utils/format'
import type { RoomInfo } from '../utils/getInfo'

const props = defineProps<{
  roomInfo: RoomInfo | null
  watchers: number
  attention: number
}>()

const watchersHighlight = ref(false)
const attentionHighlight = ref(false)
const timer = ref(0)
const timeText = ref(' ')

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

watch(() => props.roomInfo, info => {
  if (!info || info.live_status !== 1) {
    clearInterval(timer.value)
    return
  }
  timer.value = 0
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    const liveSeconds = dayjs().diff(info.live_time, 'second')
    timeText.value = formatSeconds(liveSeconds)
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
  <TBox width="100%" :padding-left="1" :padding-right="2" border-style="round" justify-content="space-between">
    <TBox>
      <TBox v-if="roomInfo">
        <TText color="green" bold>{{ roomInfo.short_id || roomInfo.room_id }}</TText>
        <TText>{{ addSpace(roomInfo.title) }}</TText>
      </TBox>
    </TBox>
    <TBox>
      <TBox>
        <TBox v-if="roomInfo">
          <TBox v-if="roomInfo.live_status === 1">
            <TText>🔴</TText>
            <TText>{{ timeText }}</TText>
            <TText> (Start at {{ dayjs(roomInfo.live_time).format('HH:mm') }}) </TText> 
          </TBox>
          <TBox v-else>
            <TText>⚫️</TText>
          </TBox>
        </TBox>
      </TBox>
      <TText :background-color="watchersHighlight ? 'green' : 'black'">{{ ` 👀${props.watchers} ` }}</TText>
      <TText :background-color="attentionHighlight ? 'green' : 'black'">{{ ` 🔥${props.attention} ` }}</TText>
    </TBox>
  </TBox>
</template>