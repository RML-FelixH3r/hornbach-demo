<template>
  <div class="flex h-10 gap-0">
    <div class="border w-32 p-5  flex items-center pl-2 bg-gray-400">{{ lineCount! + 1 }}</div>
    <input class="border w-48 flex items-center pl-2"/>
    <input class="border w-24 flex items-center pl-2" :placeholder="'1'"/>
    <input class="border w-32 flex items-center pl-2" :placeholder="useMainStore().getLength[lineCount!]"
           :value="useMainStore().getLength[lineCount!]"
           ref="lengthInput"/>
    <input class="border w-32 flex items-center pl-2" :placeholder="useMainStore().getWidth[lineCount!]"
           :value="useMainStore().getWidth[lineCount!]" ref="widthInput"/>
    <!--    <select class="border w-24 flex items-center pl-2" ref="thicknessSelect">-->
    <!--      <option :key="value.value" v-for="value in useMainStore().getParameters[4]?.validValues">-->
    <!--        {{ value.label }}-->
    <!--      </option>-->
    <!--    </select>-->
    <select class="border w-48 flex items-center pl-2" ref="materialSelect" id="material-select">
      <option :key="index" v-for="(material, index) in getMaterials" :selected="actualSelected === index">
        {{ material }}
      </option>
    </select>
    <div class="flex h-10 items-center justify-center w-12 ">
      <button class="underline px-3 rounded-full bg-indigo-300 h-8 w-8" @click="openRoomle">
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
          <path stroke="null" id="svg_1"
                d="m8.7653,0.28224l0.06235,0.05688l0.86691,0.86855c0.30082,0.30082 0.31942,0.77721 0.05634,1.09991l-0.05634,0.06235l-1.25196,1.2547a0.28004,0.28004 0 0 1 -0.00164,0.00164l-0.00273,0.00164l-5.19327,5.2042a0.27894,0.27894 0 0 1 -0.03172,0.02735l-0.01641,0.01094l-0.02571,0.01313l-0.03282,0.01477l-2.46126,0.82151a0.27347,0.27347 0 0 1 -0.35716,-0.30356l0.01094,-0.04266l0.82042,-2.46564a0.28715,0.28715 0 0 1 0.02735,-0.06016l0.01477,-0.02078l0.01969,-0.02188l-0.01641,0.0186l-0.00656,0.0082a0.268,0.268 0 0 1 0.02188,-0.02735l0.00547,-0.00383l6.44906,-6.46164a0.81933,0.81933 0 0 1 1.09827,-0.05688l0.00055,0zm-7.23557,7.21916l-0.50757,1.52544l1.5227,-0.50866l-1.01513,-1.01732l0,0.00055zm5.07622,-5.32563l-4.80876,4.81861l1.25415,1.25634l4.80876,-4.81861l-1.2536,-1.25634l-0.00055,0zm1.48606,-1.48113l-0.03829,0.03172l-1.06108,1.06217l1.2547,1.25634l1.06108,-1.06217a0.27457,0.27457 0 0 0 0.05579,-0.30793l-0.02407,-0.04157l-0.03172,-0.03829l-0.86691,-0.86855a0.27347,0.27347 0 0 0 -0.34895,-0.03172l-0.00055,0z"/>
        </svg>
      </button>
    </div>
    <div class="flex h-10 items-center justify-center w-10 ">
      <button class="flex items-center justify-center underline rounded-full bg-indigo-300 h-8 w-8"
              @click="createSnapshot">
        <svg width="14.999999999999998" height="14.999999999999998" xmlns="http://www.w3.org/2000/svg">
          <path stroke="null"
                d="m12.58407,1.19639a1.22124,1.21928 0 0 1 1.22124,1.25992l0,9.99811a1.22124,1.21928 0 0 1 -1.22124,1.21928l-10.01418,0a1.22124,1.21928 0 0 1 -1.22124,-1.21928l0,-9.99811a1.22124,1.21928 0 0 1 1.22124,-1.21928l10.01418,0l0,-0.04064zm0,0.81285l-10.01418,0a0.40708,0.40643 0 0 0 -0.40708,0.44707l0,9.99811c0,0.24386 0.16283,0.40643 0.40708,0.40643l10.01418,0c0.24425,0 0.40708,-0.16257 0.40708,-0.40643l0,-9.99811c0,-0.24386 -0.16283,-0.40643 -0.40708,-0.40643l0,-0.04064zm-6.30975,6.17769c0.12212,-0.16257 0.36637,-0.16257 0.56991,0c0.16283,0.20321 0.16283,0.44707 0,0.65028l-1.83186,1.74764l1.5062,0a0.40708,0.40643 0 0 1 0,0.81285l-2.5239,0a0.40708,0.40643 0 0 1 -0.36637,-0.40643l0,-2.43856a0.40708,0.40643 0 0 1 0.81416,0l0,1.34121l1.83186,-1.70699zm4.88497,-4.67391c0.16283,0 0.36637,0.20321 0.36637,0.40643l0,2.43856a0.40708,0.40643 0 0 1 -0.81416,0l0,-1.34121l-1.83186,1.86957a0.40708,0.40643 0 0 1 -0.56991,0a0.40708,0.40643 0 0 1 0,-0.65028l1.83186,-1.86957l-1.5062,0a0.40708,0.40643 0 0 1 0,-0.81285l2.5239,-0.04064z"
                fill-rule="evenodd"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useMainStore} from "@/stores/mainStore";
  import {computed, reactive, ref, watch} from "vue";

  const props = defineProps({
    lineCount: Number,
    name: String,
    length: Number,
    width: Number,
    onClick: Function,
  });

  const lengthInput = ref(null);
  const widthInput = ref(null);
  const materialSelect = ref(null);

  const actualSelected = computed(() => {
    return useMainStore().selectedMaterial[props.lineCount!];
  });

  const setParams = async () => {
    const mainStore = useMainStore();
    await mainStore.setRoomleLength(lengthInput.value!.value);
    await mainStore.setRoomleWidth(widthInput.value!.value);
    await mainStore.setRoomleMaterial((mainStore.getParameters[4] as any).validValues[materialSelect.value.selectedIndex].value);
    mainStore.setActiveLine(props.lineCount);
  };

  const openRoomle = async () => {
    await setParams();
    useMainStore().openRoomle();
  };

  const createSnapshot = async () => {
    await setParams();
    await useMainStore().createScreenshot();
  };

  const getMaterials = computed(() => {
    const materials = [];
    if (!useMainStore().getParameters[4] || useMainStore().getParameters.length <= 1) {
      return;
    }
    for (let value of useMainStore().getParameters[4].validValues) {
      const str = value.label.split(':');
      materials.push(str[1]);
    }
    return materials;
  });

</script>

<style scoped>

</style>
