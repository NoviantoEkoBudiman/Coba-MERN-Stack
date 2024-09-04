const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "vian",
    password: "123456",
    database: "fullstack1",
})

app.post("/add_user", (req, res) => {
    const sql = "INSERT INTO student_details (name, email, age, gender) VALUES (?,?,?,?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ]
    db.query(sql, values, (err, result)=> {
        if (err){
            return res.json({message: "Something unexpected occured : "+err})
        }else{
            return res.json({message: "Student add succesfully"})
        }
    })
})

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM student_details"
    db.query(sql, (err, result) => {
        if(err){
            return res.json({message: "There's an error : "+err})
        }else{
            return res.json(result)
        }
    })
})

app.get("/student/:id", (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM student_details WHERE id = ?"
    db.query(sql,[id], (err, result) => {
        if(err){
            return res.json({message: "There's an error : "+ err})
        }else{
            return res.json({data: result})
        }
    })
})

app.post("/update_student/:id", (req, res) => {
    const id = req.params.id
    const sql = "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id = ?"
    const values = [req.body.name, req.body.email, req.body.age, req.body.gender, id]
    db.query(sql, values, (err, result) => {
        if(err){
            res.json({message: "Something unexpected occured : "+err})
        }else{
            res.json(result)
        }
    })
})

app.delete("/delete_student/:id", (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM student_details WHERE id=?"
    const values = [id]
    db.query(sql, values, (err, result) => {
        if(err){
            res.json({message: "There's an error : "+err})
        }else{
            res.json(result)
        }
    })
})

app.listen(port, ()=> {
    console.log("App run on port "+port)
})