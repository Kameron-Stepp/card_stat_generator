from pathlib import Path
import json
import sqlite3
from sqlite_database import insert_card_data

def parse_cards_json(card_folder, database):
    name : str
    id: str
    con = sqlite3.connect(database)
    cur = con.cursor()

    p = Path(card_folder)
    for card in p.iterdir():
        with open(card, "r", encoding="utf-8") as f:
            data = f.read()
            json_data = json.loads(data)
        name = json_data["card"]["key"]
        id = json_data["card"]["category"]
        if id != "Status":
            insert_card_data(name, id, cur)
        

            
    con.commit()
    con.close()

