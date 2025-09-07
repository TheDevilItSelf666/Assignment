const Task = require('../models/taskModlel')
const db = require('../config/db');

class UserController {
  
  static async getDashboard(req, res) {
    try {
      const userId = req.user.id; 

      const sql = `
        SELECT 
          COUNT(*) AS totalTasks,
          SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN status='In-Progress' THEN 1 ELSE 0 END) AS inProgress,
          SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END) AS completed
        FROM tasks
        WHERE assigned_user = ?
      `;
      const [rows] = await db.query(sql, [userId]);

      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  
  static async getMyTasks(req, res) {
    try {
      const userId = req.user.id;
      const tasks = await Task.getTasksByUserId(userId);
      res.status(200).json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  
  static async updateMyTask(req, res) {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;

      const tasks = await Task.getTasksByUser(userId);
      const task = tasks.find(t => t.id == taskId);
      if (!task) return res.status(403).json({ message: "You cannot update this task" });

      const result = await Task.updateTask(taskId, req.body);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });

      res.json({ message: "Task updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
