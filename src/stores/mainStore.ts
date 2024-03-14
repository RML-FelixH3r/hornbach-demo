import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";


export const useMainStore = defineStore('mainStore', () => {

  const showRoomle = ref(false);
  const activeLine = ref(0);
  const length = ref(['123', '123', '123', '123']);
  const width = ref(['45', '45', '45', '45']);
  const selectedMaterial = ref([6, 6, 6, 6]);
  const parameters = ref([{}]);
  let configurator: any;


  const openRoomle = () => {
    console.log('open roomle');
    showRoomle.value = true;
  };

  const closeRoomle = () => {
    showRoomle.value = false;
  };

  const setActiveLine = (lineNo: number) => {
    activeLine.value = lineNo;
  };

  const setParameters = (param: []) => {
    parameters.value = param;
  };

  const getLength = computed(() => length.value);
  const setLength = (lengthNo: number, val: string) => {
    debugger;
    if (lengthNo != null && lengthNo <= length.value.length) {
      length.value[lengthNo] = val;
    } else {
      length.value.push(val);
    }
  };
  const getWidth = computed(() => width.value);
  const setWidth = (widthNo: number, val: string) => {
    if (widthNo != null && widthNo <= width.value.length) {
      width.value[widthNo] = val;
    } else {
      width.value.push(val);
    }
  };

  const getParameters = computed(() => parameters.value);

  const setConfigurator = (config: any) => configurator = config;
  const setRoomleLength = async (length: string) => {
    await configurator.extended.setParameter({key: 'length'}, length);
  };
  const setRoomleWidth = async (width: string) => {
    await configurator.extended.setParameter({key: 'width'}, width);
  };
  const setRoomleMaterial = async (paramName: string) => {
    await configurator.extended.setParameter({key: 'material'}, paramName);
  };
  const setRoomleThickness = async (thickness: string) => {
    await configurator.extended.setParameter({key: 'thickness'}, thickness);
  };

  const setSelectedMaterial = (lineNo: number, materialIndex: number) => {
    selectedMaterial.value[lineNo] = materialIndex;
  };

  const createScreenshot = async () => {
    await configurator.extended.exportImageFromCamera();
  };

  return {
    showRoomle,
    activeLine,
    setActiveLine,
    parameters,
    setParameters,
    getParameters,
    openRoomle,
    closeRoomle,
    getLength,
    setLength,
    setWidth,
    getWidth,
    configurator,
    setConfigurator,
    setRoomleLength,
    setRoomleWidth,
    setRoomleMaterial,
    setRoomleThickness,
    selectedMaterial,
    setSelectedMaterial,
    createScreenshot
  };
});

