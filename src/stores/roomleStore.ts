import {defineStore} from "pinia";

export interface RoomleStore {
  parameters: [];
}

export const useRoomleStore = defineStore('roomleStore', {
  state: (): RoomleStore => ({
    parameters: [],
  }),

  actions: {
    setParameters(params) {
      this.parameters = params;
    }
  },

  getters: {
    getParameters() {
      return this.parameters;
    }
  }
});
