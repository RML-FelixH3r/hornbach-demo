<template>
  <div :class="{'showRoomle': showRoomle, 'hideRoomle':!showRoomle}" class="absolute w-10/12 h-5/6 top-24"
       id="RoomleContainer"
       ref="roomleContainer"></div>
  <button :class="{'showRoomle': showRoomle, 'hideRoomle':!showRoomle}"
          class="absolute bg-black text-white rounded-full w-8 h-8 top-28 left-40"
          @click="closeRoomle">
    X
  </button>

</template>

<script setup lang="ts">
  import RoomleConfiguratorApi from "@roomle/embedding-lib/roomle-configurator-api";
  import {useMainStore} from "@/stores/mainStore";
  import {computed, onMounted, ref, watch} from "vue";

  const props = defineProps({
    length: String,
    width: String,
    material: Number,
    thickness: Number,
  });

  const mainStore = useMainStore();

  const roomleContainer = ref(null);
  const showRoomle = computed(() => {
    console.log(useMainStore().showRoomle);
    return mainStore.showRoomle;
  });

  const closeRoomle = () => {
    mainStore.closeRoomle();
  };
  var configurator;
  let parameterInitializedCallback;
  onMounted(async () => {
    await loadConfigurator();
    await new Promise<boolean>((resolve: (result: boolean) => void, reject: (result: Error) => void) => {
      parameterInitializedCallback = resolve;
    });
    for (let i = 0; i < 4; i++) {
      mainStore.setLength(i, mainStore.parameters[1].value);
      mainStore.setWidth(i, mainStore.parameters[2].value);
    }
  });
  const loadConfigurator = async () => {
    configurator = await RoomleConfiguratorApi.createConfigurator(
        "demoConfigurator",
        roomleContainer.value,
        {}
    );
    console.log(configurator);
    const mainStore = useMainStore();
    mainStore.setConfigurator(configurator);
    configurator.ui.loadObject('productionmanager:hornbach_worktop_master');
    configurator.extended.callbacks.onUpdateParameters = (parameters) => {
      if (parameterInitializedCallback) {
        parameterInitializedCallback(parameters);
      }
      parameterInitializedCallback = null;
      mainStore.setParameters(parameters);
      console.log(parameters, 'parameters');
      mainStore.setLength(mainStore.activeLine, parameters[1].value);
      mainStore.setWidth(mainStore.activeLine, parameters[2].value);
      for (let [index, material] of mainStore.getParameters[4].validValues.entries()) {
        if (material.label === mainStore.getParameters[4].value) {
          mainStore.setSelectedMaterial(mainStore.activeLine, index);
          return;
        }
      }
    };
  };


  watch(props, (oldVal, newVal) => {
    console.log(newVal);
  });


</script>

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
