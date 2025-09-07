const db = require("../config/db");

class Task {
  static async createTask(taskData) {
    const { title, description, assigned_user, status, notes } = taskData;
    const sql = "INSERT INTO tasks (title, description, assigned_user, status, notes) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [title, description, assigned_user, status, notes]);
    return { id: result.insertId, ...taskData };
  }

static async getAllTasks() {
  const sql = `
    SELECT t.*, u.name AS assignedUserName, u.email AS assignedUserEmail
    FROM tasks t
    LEFT JOIN users u ON t.assigned_user = u.id
  `;
  const [rows] = await db.query(sql);
  return rows;
}

static async getTasksByUserId(userId) {
    const sql = `
      SELECT t.*, u.name AS assignedUserName, u.email AS assignedUserEmail
      FROM tasks t
      LEFT JOIN users u ON t.assigned_user = u.id
      WHERE t.assigned_user = ?;
    `;

    const [rows] = await db.query(sql, [userId]);
    return rows;
  }


  static async updateTask(id, data) {
    const fields = [];
    const values = [];
    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
    values.push(id);
    const sql = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await db.query(sql, values);
    return result;
  }

  
  static async deleteTask(id) {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    const [result] = await db.query(sql, [id]);
    return result;
  }
}

module.exports = Task;
