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
    con.commit()
    con.close()

def _store_run_data(data, cursor: sqlite3.Cursor):
    id = _get_character_id(data["character_name"], cursor)
    cursor.execute("""
        INSERT INTO runs (character_id, floor_reached, run_time_seconds, ascension, won)
        VALUES (?, ?, ?, ?, ?)
         """, (id, data["floor_reached"], data["run_time_sec"], data["ascension"], data["won"]))

def _get_character_id(character_name: str, cursor: sqlite3.Cursor):
    name = character_name.replace("CHARACTER.", "").capitalize()
    cursor.execute("""
        SELECT id
        FROM characters
        WHERE name = ?
                   """, (name,))
    return cursor.fetchone()[0]