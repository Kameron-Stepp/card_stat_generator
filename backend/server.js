const express = require('express')
const sqlite = require('better-sqlite3')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

const db = new sqlite(
    path.join(__dirname, "database", "slay_the_spire_2_offline.db")
)

console.log("Connected to SQLite")

app.get("/:character/cards", (req, res) => {
    const character = req.params.character

    const sql =  `
    SELECT card_name FROM card_stats
    JOIN characters
    ON characters.id = card_stats.character_id
    WHERE characters.name = ?
    `

    try {
        const cards = db.prepare(sql).all(character);
        res.json(cards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
    
}) 

app.get("/:character/runs", (req, res) => {
    const character = req.params.character

    const sql =  `
    SELECT won, floor_reached, run_time_seconds, ascension FROM runs
    JOIN characters
    ON characters.id = runs.character_id
    WHERE characters.name = ?
    `

    try {
        const cards = db.prepare(sql).all(character);
        res.json(cards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}) 

app.get("/:character/runs/stats", (req, res) => {
    const character = req.params.character

    const sql = 
    `SELECT Count(*) as runs, avg(run_time_seconds) as avg_time, sum(won) as wins
    FROM runs
    JOIN characters
    ON characters.id = runs.character_id
    WHERE characters.name = ?  ;`

    try {
        const stats = db.prepare(sql).get(character)
        res.json(stats)

    } catch {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

app.get("/:character/enemies", (req, res) => {
    const character = req.params.character

    const sql =  `
    SELECT * FROM enemy_deaths
    JOIN characters
    ON characters.id = enemy_deaths.character_id
    WHERE characters.name = ?
    `

    try {
        const cards = db.prepare(sql).all(character);
        res.json(cards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}) 

app.get("/enemies", (req, res) => {

    const sql =  `
    SELECT enemy_name, SUM(death_count) as deaths FROM enemy_deaths
    GROUP by enemy_name
    ORDER  by deaths DESC
    `

    try {
        const cards = db.prepare(sql).all();
        res.json(cards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}) 

app.get("/:card", (req, res) => {
    const card = req.params.card

    const sql = `
        SELECT card_name, times_picked, times_skipped, deck_wins,deck_losses
        FROM card_stats
        WHERE card_name = ?
    `
    try {
        const found_card = db.prepare(sql).get(card)
        res.json(found_card)
    } catch {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})