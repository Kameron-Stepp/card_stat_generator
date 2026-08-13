const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "slay_the_spire_2_offline.db"
})

db.connect((err) => {
    console.error("Database connection failed:", err)
    return
})

app.get("/:character/cards", (req, res) => {
    const character = req.params.character

    const sql =  `
    SELECT * FROM card_stats
    JOIN characters
    ON characters.id = card_stats.character_id
    WHERE characters.name = ?
    `

    db.query(sql,[chadracter], (err,result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }

        res.json(results)
    })
}) 

app.get("/:character/runs", (req, res) => {
    const character = req.params.character

    const sql =  `
    SELECT * FROM runs
    JOIN characters
    ON characters.id = runs.character_id
    WHERE characters.name = ?
    `

    db.query(sql,[chadracter], (err,result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }

        res.json(results)
    })
}) 

app.get("/:character/enemies", (req, res) => {
    const character = req.params.character

    const sql =  `
    SELECT * FROM enemy_deaths
    JOIN characters
    ON characters.id = enemy_deaths.character_id
    WHERE characters.name = ?
    `

    db.query(sql,[chadracter], (err,result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }

        res.json(results)
    })
}) 

app.get("/enemies", (req, res) => {

    const sql =  `
    SELECT enemy_name, SUM(death_count) as deaths FROM enemy_deaths
    GROUP by enemy_name
    ORDER  by deaths DESC
    `

    db.query(sql, (err,result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }

        res.json(results)
    })
}) 


app.listen(3000, () => {
    console.log("Server running on port 3000")
})