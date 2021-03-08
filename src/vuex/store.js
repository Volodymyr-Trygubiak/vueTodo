import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    tasks: []
  },
  actions: {
    GET_TASKS_FROM_API({ commit }) {
      return axios("http://localhost:3000/tasks", {
        method: "GET"
      })
        .then(tasks => {
          commit("SET_TASKS_TO_STATE", tasks.data);
          return tasks;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    }
  },
  mutations: {
    SET_TASKS_TO_STATE: (state, tasks) => {
      state.tasks = tasks;
    }
  },
  getters: {
    TASKS(state) {
      return state.tasks;
    }
  }
});

export default store;
