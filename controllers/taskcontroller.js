const Task = require('../models/taskModlel');


class taskControl {
    static async createnewtask(req, res) {
        try {
            const task = await Task.createTask(req.body);
            if (!task) {
                return res.status(400).json({ message: "Bad Request" });
            }
            res.status(200).json(task);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async getAllTask(req, res) {
        try {
            const response = await Task.getAllTasks();
            if (!response || response.length === 0) {
                return res.status(400).json({ message: "NO Task " })
            }
            res.status(200).json(response);

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }


    static async updateTask(req, res) {
        try {
            const { id } = req.params;
            const result = await Task.updateTask(id, req.body);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
            res.json({ message: "Task updated successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const result = await Task.deleteTask(id);
            if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
            res.json({ message: "Task deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

      static async getUserTasks(req, res) {
    try {
      const userId = req.user.id; 
      const tasks = await Task.getTasksByUser(userId);
      res.status(200).json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}

module.exports = taskControl;