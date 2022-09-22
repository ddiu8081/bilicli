<script setup lang="ts">
  import { TBox, TText } from '@temir/core'
  import type { DanmuMsg } from 'danmu-console-helper'
  import { addSpace } from '../utils/format'
  
  const { msg } = defineProps<{
    msg: DanmuMsg
  }>()
  
  const getNameColor = (level: number) => {
    // level = new Date().getMilliseconds() % 4
    // 总督: 1 提督: 2  舰长: 3
    const colorDict = ['#967E76', '#FF7C28', '#E17AFF', '#00D1F1']
    return colorDict[level]
  }
  
  </script>
  
  <template>
    <TBox>
      <TBox>
        <TBox :flex-shrink="0">
          <TBox>
            <TBox v-if="msg.user.badge && msg.user.badge.active" :margin-right="1">
              <TText :background-color="msg.user.badge.color" :flex-shrink="0">{{ addSpace(msg.user.badge.name) }}</TText>
              <TText :color="msg.user.badge.color" background-color="#ffffff">{{ addSpace(msg.user.badge.level.toString()) }}</TText>
            </TBox>
          </TBox>
          <TText background-color="blue">{{ msg.user.identity.rank ? ` 榜${msg.user.identity.rank} ` : '' }}</TText>
          <TText background-color="red">{{ msg.user.identity.room_admin ? '房' : '' }}</TText>
          <TText bold :color="getNameColor(msg.user.identity.member)">{{ msg.user.uname }}</TText>
          <TText>: </TText>
        </TBox>
        <TBox :flex-glow="1">
          <TText>{{ msg.content }}</TText>
        </TBox>
      </TBox>
    </TBox>
  </template>