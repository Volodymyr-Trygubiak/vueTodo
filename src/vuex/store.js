import Vue from "vue";
import Vuex from "vuex";
import tasksService from "../core/tasks.service";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    tasks: []
  },

  mutations: {
    SET_TASKS_TO_STATE: (state, data) => {
      state.tasks = data;
    },
    SET_NEW_TASKS_TO_STATE: (state, task) => {
      state.tasks.push(task);
    },
    REMOVE_TASK: (state, id) => {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    CHECK_TASK: (state, task) => {
      const index = state.tasks.findIndex(item => item.id == task.id);
      state.tasks.splice(index, 1, task);
    }
  },

  getters: {
    TASKS(state) {
      return state.tasks;
    }
  },

  actions: {
    GET_TASKS_FROM_API({ commit }) {
      tasksService.getTasks().then(tasks => {
        commit("SET_TASKS_TO_STATE", tasks);
      });
    },
    POST_TASK_TO_API({ commit }, task) {
      tasksService.addNewTask(task).then(response => {
        commit("SET_NEW_TASKS_TO_STATE", response);
      });
    },
    removeTask({ commit }, id) {
      tasksService.deleteTask(id).then(() => {
        commit("REMOVE_TASK", id);
      });
    },
    checkTask({ commit }, task) {
      tasksService.checkTask(task).then(response => {
        commit("CHECK_TASK", response);
      });
    }
  }
});

export default store;
