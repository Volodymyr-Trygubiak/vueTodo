import $axios from "@/core/api.config";

class TasksService {
  getTasks() {
    return $axios.get("/tasks");
  }

  addNewTask(task) {
    return $axios.post("/tasks", task);
  }

  deleteTask(id) {
    return $axios.delete(`/tasks/${id}`);
  }

  checkTask(task) {
    return $axios.put(`/tasks/${task.id}`, task);
  }
}

export default new TasksService();
