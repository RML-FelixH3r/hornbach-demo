<script setup lang="ts">
  import InputLine from "@/components/InputLine.vue";
  import HeaderLine from "@/components/HeaderLine.vue";
  import RoomleOverlay from "@/components/RoomleOverlay.vue";
  import {useMainStore} from "@/stores/mainStore";
  import {computed} from "vue";

  const showRoomle = computed(() => {
    console.log(useMainStore().showRoomle);
    return useMainStore().showRoomle;
  });

  const onClickRoomle = (lineNo: number, length: string, width: string) => {
    const mainStore = useMainStore();
    mainStore.setLength(lineNo, length);
    mainStore.setWidth(lineNo, width);
    if (mainStore.showRoomle) {
      mainStore.closeRoomle();
    } else {
      mainStore.openRoomle();
    }
    mainStore.setRoomleLength(length);
  };

</script>

<template>
  <main class="flex flex-col items-start pt-20 pl-36 w-full">
    <HeaderLine/>
    <InputLine :line-count="0" :length="useMainStore().getLength[0]"
               :width="useMainStore().getWidth[0]" :on-click="onClickRoomle"/>
    <InputLine :line-count="1" :length="useMainStore().getLength[1]" :width="useMainStore().getWidth[1]"
               :on-click="onClickRoomle"/>
    <InputLine :line-count="2" :length="useMainStore().getLength[2]" :width="useMainStore().getWidth[2]"
               :on-click="onClickRoomle"/>
    <InputLine :line-count="3" :length="useMainStore().getLength[3]" :width="useMainStore().getWidth[3]"
               :on-click="onClickRoomle"/>
    <RoomleOverlay :class="{'showRoomle': showRoomle, 'hideRoomle':!showRoomle}"/>
  </main>
</template>

<style scoped>
  .showRoomle {
    opacity: 1;
    pointer-events: all;
  }

  .hideRoomle {
    opacity: 0;
    pointer-events: none;
  }
</style>

