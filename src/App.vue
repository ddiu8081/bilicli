<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { startListen } from 'blive-message-listener'
import type { 
  MsgHandler, Message,
  DanmuMsg, SuperChatMsg, GiftMsg, GuardBuyMsg, NewComerMsg
} from 'blive-message-listener'
import { TBox } from '@temir/core'
import { getRoomInfo, type RoomInfo } from './utils/getInfo'
import { getInputId } from './utils/cli'
import { listenQuitCommand } from './utils/readline'

import CliHeader from './components/CliHeader.vue'
import CliFooter from './components/CliFooter.vue'
import TabSelector from './components/TabSelector.vue'
import MsgTime from './components/MsgTime.vue'
import MsgType from './components/MsgType.vue'

import DanmuMsgCom from './components/msgCom/DanmuMsgCom.vue'
import SuperChatMsgCom from './components/msgCom/SuperChatMsgCom.vue'
import GiftMsgCom from './components/msgCom/GiftMsgCom.vue'
import GuardBuyMsgCom from './components/msgCom/GuardBuyMsgCom.vue'
import NewComerCom from './components/msgCom/NewComerMsgCom.vue'

const inputRoomId = getInputId()
const currentRoomInfo = ref<RoomInfo | null>(null)
const liveStatus = ref({
  isLive: false,
  startTime: ''
})
const watchers = ref(0)
const attention = ref(0)
const selectedTab = ref(0)

const allList = ref<Message<any>[]>([])
const danmuList = ref<Message<DanmuMsg>[]>([])
const superChatList = ref<Message<SuperChatMsg>[]>([])
const giftList = ref<Message<GiftMsg>[]>([])
const guardBuyList = ref<Message<GuardBuyMsg>[]>([])
const newComerList = ref<Message<NewComerMsg>[]>([])

onMounted(async () => {
  listenQuitCommand()
  const roomInfo = await getRoomInfo(inputRoomId)
  if (!roomInfo) {
    console.log('房间不存在')
    return process.exit(1)
  }
  currentRoomInfo.value = roomInfo
  liveStatus.value = {
    isLive: roomInfo.live_status === 1,
    startTime: roomInfo.live_time,
  }
  try {
    const handler: MsgHandler = {
      onAttentionChange: ({ body }) => {
        attention.value = body.attention
      },
      onWatchedChange: ({ body }) => {
        watchers.value = body.num
      },
      onLiveStart: async ({ body }) => {
        const roomInfo = await getRoomInfo(inputRoomId)
        if (roomInfo) {
          liveStatus.value = {
            isLive: roomInfo.live_status === 1,
            startTime: roomInfo.live_time,
          }
        }
      },
      onLiveEnd: () => {
        liveStatus.value.isLive = false
      },
      onIncomeDanmu: (msg) => {
        allList.value.push(msg)
        danmuList.value.push(msg)
      },
      onIncomeSuperChat: (msg) => {
        allList.value.push(msg)
        superChatList.value.push(msg)
      },
      onGift: (msg) => {
        allList.value.push(msg)
        giftList.value.push(msg)
      },
      onGuardBuy: (msg) => {
        allList.value.push(msg)
        guardBuyList.value.push(msg)
      },
      onNewComer: (msg) => {
        newComerList.value.push(msg)
      },
    }
    startListen(roomInfo.room_id, handler)
  } catch (error) {
    console.error(error)
  }
})

const handleTabChange = (index: number) => {
  selectedTab.value = index
}
</script>

<template>
  <TBox flex-direction="column" height="100%" >
    <CliHeader :roomInfo="currentRoomInfo" />
    <TBox :flex-grow="1">
      <TBox flex-direction="column" border-style="single">
        <TabSelector @change="handleTabChange" />
      </TBox>
      <TBox :flex-grow="1" width="100%" :height="16" border-style="single">
        <TBox v-if="selectedTab === 1" flex-direction="column">
          <TBox v-for="msg in danmuList.slice(-14)" flex-direction="row">
            <MsgTime :timestamp="msg.timestamp" />
            <DanmuMsgCom :msg="msg.body" :key="msg.id" />
          </TBox>
        </TBox>
        <TBox v-else-if="selectedTab === 2" flex-direction="column">
          <TBox v-for="msg in superChatList.slice(-14)" flex-direction="row">
            <MsgTime :timestamp="msg.timestamp" />
            <SuperChatMsgCom :msg="msg.body" :key="msg.id" />
          </TBox>
        </TBox>
        <TBox v-else-if="selectedTab === 3" flex-direction="column">
          <TBox v-for="msg in giftList.slice(-14)" flex-direction="row">
            <MsgTime :timestamp="msg.timestamp" />
            <GiftMsgCom :msg="msg.body" :key="msg.id" />
          </TBox>
        </TBox>
        <TBox v-else-if="selectedTab === 4" flex-direction="column">
          <TBox v-for="msg in guardBuyList.slice(-14)" flex-direction="row">
            <MsgTime :timestamp="msg.timestamp" />
            <GuardBuyMsgCom :msg="msg.body" :key="msg.id" />
          </TBox>
        </TBox>
        <TBox v-else-if="selectedTab === 5" flex-direction="column">
          <TBox v-for="msg in newComerList.slice(-14)" flex-direction="row">
            <MsgTime :timestamp="msg.timestamp" />
            <NewComerCom :msg="msg.body" :key="msg.id" />
          </TBox>
        </TBox>
        <TBox v-else flex-direction="column">
          <TBox v-for="msg in allList.slice(-14)" flex-direction="row">
            <MsgTime :timestamp="msg.timestamp" />
            <MsgType :type="msg.type"></MsgType>
            <template v-if="msg.type === 'DANMU_MSG'">
              <DanmuMsgCom :msg="msg.body" :key="msg.id" />
            </template>
            <template v-else-if="msg.type === 'SUPER_CHAT_MESSAGE'">
              <SuperChatMsgCom :msg="msg.body" :key="msg.id" />
            </template>
            <template v-else-if="msg.type === 'SEND_GIFT'">
              <GiftMsgCom :msg="msg.body" :key="msg.id" />
            </template>
            <template v-else-if="msg.type === 'GUARD_BUY'">
              <GuardBuyMsgCom :msg="msg.body" :key="msg.id" />
            </template>
            <template v-else-if="msg.type === 'INTERACT_WORD' || msg.type === 'ENTRY_EFFECT'">
              <NewComerCom :msg="msg.body" :key="msg.id" />
            </template>
          </TBox>
        </TBox>
      </TBox>
    </TBox>
    <CliFooter
      :liveStatus="liveStatus"
      :newestWatcher="newComerList[newComerList.length - 1]"
      :watchers="watchers"
      :attention="attention"
    />
  </TBox>
</template>
