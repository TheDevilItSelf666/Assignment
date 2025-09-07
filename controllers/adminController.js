const User = require('../models/userModel');

require('dotenv').config();
const db = require("../config/db");




class AdminControl {
    static async updatedetails(req, res) {
        try {
            const id = req.params.id;
            const userData = req.body;
            const response = await User.updateUserDetails(id, userData);
            if (!response) {
                return res.status(400).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User data is updated successfully " })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server error" });
        }
    }


    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const response = await User.deleteUser(id);
            if (response.message === "User not found in databse") {
                return res.status(404).json(response.message)
            }
            res.status(200).json(response.message);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server error" })
        }
    }

    static async toggleUser(req, res) {
        try {
            const id = req.params.id;
            const { action } = req.query;
            if (!["block", "unblock"].includes(action)) {
                return res.status(400).json({ message: "Invalid action " })
            }

            const Status = action === "block" ? "blocked" : "active";

            const result = await User.updateUserDetails(id, { status: Status });


            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({ message: `User ${action}ed successfully`, status: Status });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getADashboard(req, res) {
        try {
            const [[{ totalUsers }]] = await db.query("SELECT COUNT(*) AS totalUsers FROM users");
            const [[{ totalTasks }]] = await db.query("SELECT COUNT(*) AS totalTasks FROM tasks");
            const [[{ activeUsers }]] = await db.query("SELECT COUNT(*) AS activeUsers FROM users WHERE status = 'active'");
            const [[{ blockedUsers }]] = await db.query("SELECT COUNT(*) AS blockedUsers FROM users WHERE status = 'blocked'");

            res.json({ totalUsers, totalTasks, activeUsers, blockedUsers });
        } catch (err) {
            console.error("Dashboard Error:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getAllUsers(req ,res){
        try {
            const response = await User.getAllUser();
            if(!response|| response.length ===0){
                return res.status(400).json("Bad Request");
            }
            res.status(200).json(response);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message : "Internal Server error"})
        }
    }
}




module.exports = AdminControl ; 