import Vue from "vue";
import Vuex from "vuex";
import { moduleHorses } from "./modules/horses";
import { MODULE_NAME as horses } from "./modules/horses/models";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    [horses]: moduleHorses,
  },
});
