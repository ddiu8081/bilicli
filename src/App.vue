<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { openRoom } from 'danmu-console-helper'
import type { DanmuMsg, MsgHandler } from 'danmu-console-helper'
import { TBox } from '@temir/core'
import { getRoomInfo, type RoomInfo } from './utils/getInfo'
import { getInputId } from './utils/cli'
import CliHeader from './components/CliHeader.vue'
import DanmuMsgCom from './components/DanmuMsgCom.vue'
import SuperChatMsgCom from './components/SuperChatMsgCom.vue'
// import GiftMsgCom from './components/GiftMsgCom.vue'
import TabSelector from './components/TabSelector.vue'

const inputRoomId = getInputId()
const currentRoomInfo = ref<RoomInfo | null>(null)
const watchers = ref(0)
const attention = ref(0)
const allList = ref<any[]>([])
const danmuList = ref<DanmuMsg[]>([])
const superChatList = ref<any[]>([])
const selectedTab = ref(0)

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
        allList.value.push(msg)
        danmuList.value.push(msg)
      },
      onIncomeSuperChat: (msg) => {
        allList.value.push(msg)
        superChatList.value.push(msg)
      },
    }
    openRoom(roomInfo.room_id, handler)
  } catch (error) {
    console.error(error)
  }
})

const handleTabChange = (index: number) => {
  selectedTab.value = index
}
</script>

<template>
  <TBox flex-direction="column">
    <CliHeader :roomInfo="currentRoomInfo" :watchers="watchers" :attention="attention" />
    <TBox>
      <TBox flex-direction="column" border-style="round">
        <TabSelector @change="handleTabChange" />
      </TBox>
      <TBox :flex-grow="1" width="100%" :height="16" border-style="round">
        <TBox v-if="selectedTab === 1" flex-direction="column">
          <DanmuMsgCom :msg="msg" v-for="msg in danmuList.slice(-14)" />
        </TBox>
        <TBox v-else-if="selectedTab === 2" flex-direction="column">
          <SuperChatMsgCom :msg="msg" v-for="msg in superChatList.slice(-14)" />
        </TBox>
        <TBox v-else flex-direction="column">
        </TBox>
      </TBox>
    </TBox>
  </TBox>
</template>
