<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { openRoom } from 'danmu-console-helper'
import type { DanmuMsg, MsgHandler } from 'danmu-console-helper'
import { TBox } from '@temir/core'
import { getRoomInfo, type RoomInfo } from './utils/getInfo'
import { getInputId } from './utils/cli'
import CliHeader from './components/CliHeader.vue'
import DanmuMsgCom from './components/DanmuMsgCom.vue'
import TabSelector from './components/TabSelector.vue'

const inputRoomId = getInputId()
const currentRoomInfo = ref<RoomInfo | null>(null)
const watchers = ref(0)
const attention = ref(0)
const danmuList = ref<DanmuMsg[]>([])

onMounted(async () => {
  const roomInfo = await getRoomInfo(inputRoomId)
  if (!roomInfo) {
    console.log('房间不存在')
    return
  }
  currentRoomInfo.value = roomInfo
  try {
    const handler: MsgHandler = {
      onHeartbeat: (newAttention) => {
        attention.value = newAttention
      },
      onWatchedChange: (newWatched) => {
        watchers.value = newWatched
      },
      onIncomeDanmu: (msg) => {
        danmuList.value.push(msg)
      },
    }
    openRoom(roomInfo.room_id, handler)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <TBox flex-direction="column">
    <CliHeader :roomInfo="currentRoomInfo" :watchers="watchers" :attention="attention" />
    <TBox>
      <TBox flex-direction="column" border-style="round">
        <TabSelector />
      </TBox>
      <TBox :flex-grow="1" flex-direction="column" width="100%" :height="16" border-style="round">
        <DanmuMsgCom :msg="msg" v-for="msg in danmuList.slice(-14)" />
      </TBox>
    </TBox>
  </TBox>
</template>
