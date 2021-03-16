import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const tasksUrl = "http://localhost:3000/tasks";

let store = new Vuex.Store({
  state: {
    tasks: []
  },
  actions: {
    GET_TASKS_FROM_API({ commit }) {
      return axios(tasksUrl, {
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
    },
    POST_TASK_TO_API({ commit }, task) {
      axios
        .post(tasksUrl, task)
        .then(response => {
          commit("SET_TASKS_TO_STATE", response.data);
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    },
    // FILTER_TASK({ commit }, task) {
    //   axios
    //     .put(tasksUrl, task)
    //     .then(response => {
    //       commit("SET_TASKS_TO_STATE", response.data);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       return error;
    //     });
    // }
  },
  mutations: {
    SET_TASKS_TO_STATE: (state, tasks) => {
      state.tasks = tasks;
    },
    SET_NEW_TASKS_TO_STATE: (state, tasks) => {
      state.tasks.push(tasks);
    }
  },
  getters: {
    TASKS(state) {
      return state.tasks;
    }
  }
});

export default store;
