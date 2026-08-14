# Problem: The way online play is stored right now in the runs file doesnt specificy which character you are and its not always in the same spot in the player array
from backend.sqlite_database import * 
from backend.data_decoders.spire_data_decoder import *
from backend.data_decoders.slay_the_spire_cards_parser import *
import argparse
import time as t
import sqlite3 as s
from pathlib import Path
import json

# Establish Arguments
parser = argparse.ArgumentParser(description="Slay the Spire 2 Data exporter")
parser.add_argument("folder", help="Folder path that contains all of the Slay the Spire 2 run save data", type=str)
parser.add_argument("-t", "--test", help="idicates the folder argument is 1 file for testing purposes", required=False, action="store_true")
parser.add_argument("-n", "--new", help="Creates two new databases and populates them with the necessary info", required=False, action="store_true")
args = parser.parse_args()

DATABASE = Path(__file__).parent / "database" / "slay_the_spire_2_offline.db"

if args.new:
    # Create the Database if it dosent exist
    create_database(DATABASE)


    # Add Cards to the card stat table
    CARD_FOLDER = Path(__file__).parent / "cards"
    parse_cards_json(CARD_FOLDER, DATABASE)

    
folder = Path(args.folder)
json_data: str

# todo add a way to skip files if they are already in metadata so it speeds up runtime
if not args.test:
    con = s.connect(DATABASE)
    cur = con.cursor()

    for file_path in folder.iterdir():
        if not file_path.is_file() or file_path.suffix != ".run":
            continue

        # Check if this file has already been processed
        cur.execute("""
            SELECT 1
            FROM handled_files
            WHERE file_path = ?
        """, (str(file_path),))

        if cur.fetchone() is not None:
            print(f"Skipping {file_path.name}")
            continue

        # File hasn't been processed yet
        print(f"Processing {file_path.name}")

        with open(file_path, "r", encoding="utf-8") as f:
            json_data = json.load(f)

        if len(json_data["players"]) == 1:
            insert_run_data(parse_file_json(json_data))

            # Only mark it as handled after successful processing
            cur.execute("""
                INSERT INTO handled_files (file_path)
                VALUES (?)
            """, (str(file_path),))

            con.commit()

    con.close()
else:
    print("Operating in test mode")
    with open(folder, "r") as f:
        data = f.read()
        json_data = json.loads(data)
        if len(json_data["players"]) == 1:          
            start = t.time()
            insert_run_data(parse_file_json(json_data))
            end = t.time()
            print(str(end - start) + " ")