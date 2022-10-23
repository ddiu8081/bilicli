<script setup lang="ts">
import { TBox, TText } from '@temir/core'
import type { RoomInfo } from '../utils/getInfo'

const { roomInfo } = defineProps<{
  roomInfo: RoomInfo | null
}>()

</script>

<template>
  <TBox width="100%" :padding-left="1" :padding-right="2" border-style="single" justify-content="space-between">
    <TBox>
      <TBox v-if="roomInfo">
        <TText color="green" bold>{{ roomInfo.short_id || roomInfo.room_id }}</TText>
        <TBox :margin-x="1">
          <TText color="green">{{ `(${roomInfo.parent_area_name}·${roomInfo.area_name})` }}</TText>
        </TBox>
        <TText>{{ roomInfo.title }}</TText>
      </TBox>
    </TBox>
  </TBox>
</template>