import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    followCounts: 0,
    fansCounts: 0,
    receiveLikeCounts: 0,
    username: '',
    userId: '',
    faceImage: '',
  },
  mutations: {},
  actions: {}
});
