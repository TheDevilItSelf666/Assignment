const { json } = require('express');
const db = require('../config/db')

class User {
    static async getAllUser(){
        const [rows] = await db.query("SELECT id , name , email  , role_id , status FROM users");
        return rows;

    }

static async  createUser(userData) {

    const { name, email, pass, role_id, status } = userData;
    const sql = "INSERT INTO users (name , email , pass , role_id , status) VALUES (? , ? , ? , ? , ?)";

    const [result] = await db.query(sql, [name, email, pass, role_id, status]);
    return { id: result.insertId }
}


static async findEmail(email){
    const sql = "SELECT * FROM users where email = ?";
    const [result] = await db.query(sql , [email]);
    return result[0];
}

static async updateUserDetails(id  , userdata){
    const field = [];
    const values =[];

    for (const key in userdata){
        field.push(`${key}= ?`);
        values.push(userdata[key]);
    }

    values.push(id);
    const sql = `update users set ${field.join(', ')} where id = ?`;
    const [result] =  await db.query(sql, values);

    return {result};
}

static async deleteUser(id){
    const [rows] = await db.query("DELETE FROM users WHERE id = ?" , [id]);
    if(rows.affectedRows ===0){
        return { message : "User not found in databse"}; 
    }else return { message : "User id deleted successfully"};
}

}

module.exports = User;