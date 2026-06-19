import sqlite3


def create_database(db_path="slay_the_spire_2_offline.db"):
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    cur = conn.cursor()

    # Characters
    cur.execute("""
    CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    )
    """)

    # Runs
    cur.execute("""
    CREATE TABLE IF NOT EXISTS runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        character_id INTEGER NOT NULL,

        won INTEGER NOT NULL,
        floor_reached INTEGER NOT NULL,
        run_time_seconds INTEGER NOT NULL,
        ascension INTEGER NOT NULL,

        FOREIGN KEY(character_id)
            REFERENCES characters(id)
    )
    """)

    # Card statistics
    cur.execute("""
    CREATE TABLE IF NOT EXISTS card_stats (
        card_name TEXT NOT NULL,
        character_id INTEGER NOT NULL,

        times_picked INTEGER NOT NULL DEFAULT 0,
        times_skipped INTEGER NOT NULL DEFAULT 0,

        deck_wins INTEGER NOT NULL DEFAULT 0,
        deck_losses INTEGER NOT NULL DEFAULT 0,

        PRIMARY KEY (card_name, character_id),

        FOREIGN KEY(character_id)
            REFERENCES characters(id)
    )
    """)

    # Enemy death statistics
    cur.execute("""
    CREATE TABLE IF NOT EXISTS enemy_deaths (
        character_id INTEGER NOT NULL,
        enemy_name TEXT NOT NULL,

        death_count INTEGER NOT NULL DEFAULT 0,

        PRIMARY KEY (character_id, enemy_name),

        FOREIGN KEY(character_id)
            REFERENCES characters(id)
    )
    """)

    # Indexes

    # Website will frequently query runs by character
    cur.execute("""
    CREATE INDEX IF NOT EXISTS idx_runs_character
    ON runs(character_id)
    """)

    # Website will frequently query card stats by character
    cur.execute("""
    CREATE INDEX IF NOT EXISTS idx_card_stats_character
    ON card_stats(character_id)
    """)

    # Populate characters
    cur.executemany("""
    INSERT OR IGNORE INTO characters (id, name)
    VALUES (?, ?)
    """, [
        (1, "Ironclad"),
        (2, "Silent"),
        (3, "Defect"),
        (4, "Regent"),
        (5, "Necrobinder")
    ])

    conn.commit()
    conn.close()

def insert_run_data(data, db_path="slay_the_spire_2_offline.db"):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    _store_run_data(data, cur)
    _store_enemy_death(data, cur)
   # _store_card_stats(data, cur) This is done but need to populate table first

    con.commit()
    con.close()

def _store_run_data(data, cursor: sqlite3.Cursor):
    id = _get_character_id(data["character_name"], cursor)
    cursor.execute("""
        INSERT INTO runs (character_id, floor_reached, run_time_seconds, ascension, won)
        VALUES (?, ?, ?, ?, ?)
         """, (id, data["floor_reached"], data["run_time_sec"], data["ascension"], data["won"]))
def _store_enemy_death(data, cursor:sqlite3.Cursor):
    # Get the enemy name and character id related to the death
    c_id = _get_character_id(data["character_name"], cursor)
    enemy = data["enemy_name"].replace("ENCOUNTER.", "")

    cursor.execute("""
        INSERT INTO enemy_deaths (character_id, enemy_name, death_count)
        VALUES (?, ?, 1)
        ON CONFLICT(character_id, enemy_name)
        DO UPDATE SET
        death_count = death_count + 1
                   """, (c_id, enemy))
# Todo card table should already be set up with each card name and id everything else can be 0
def _store_card_stats(data, cursor: sqlite3.Cursor):
    c_id = _get_character_id(data["character_name"], cursor)
    won = 0
    loss = 0
    proccessed_cards = {}
    if data["won"]:
        won += 1
    else:
        loss += 1
    
    for card in data["cards"]:
        name = card["name"].replace("CARD.", "")
        picked = 0
        skipped = 0
        if card["picked"]:
            picked = 1
        else:
            skipped = 1
        if name not in proccessed_cards:
            cursor.execute("""
                UPDATE card_stats
                SET times_picked = times_picked + ?,
                times_skipped = times_skipped + ?,
                deck_wins = deck_wins + ?,
                deck_losses = deck_losses = ?
                WHERE ? = character_id AND ? = card_name
                """, (picked, skipped, won, loss, c_id, name))
            proccessed_cards.append(name)
        else:
            cursor.execute("""
                UPDATE card_stats
                SET times_picked = times_picked + ?,
                times_skipped = times_skipped + ?,
                WHERE ? = character_id AND ? = card_name
                """, picked, skipped, c_id, name)
   
# This could just be an sql procdeure but a method does the same thing i think
def _get_character_id(character_name: str, cursor: sqlite3.Cursor):
    name = character_name.replace("CHARACTER.", "").capitalize()
    cursor.execute("""
        SELECT id
        FROM characters
        WHERE name = ?
                   """, (name,))
    return cursor.fetchone()[0]