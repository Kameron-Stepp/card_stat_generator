# Problem: The way online play is stored right now in the runs file doesnt specificy which character you are and its not always in the same spot in the player array
from backend.sqlite_database import * 
from backend.data_decorders.slay_the_spire_cards_parser import *
from backend.data_decorders.spire_data_decoder import *
import argparse
import time as t
import sqlite3 as s

# Establish Arguments
parser = argparse.ArgumentParser(description="Slay the Spire 2 Data exporter")
parser.add_argument("folder", help="Folder path that contains all of the Slay the Spire 2 run save data", type=str)
parser.add_argument("-t", "--test", help="idicates the folder argument is 1 file for testing purposes", required=False, action="store_true")
parser.add_argument("-n", "--new", help="Creates two new databases and populates them with the necessary info", required=False, action="store_true")
args = parser.parse_args()

if args.new:
    # Create the Database if it dosent exist
    create_database("slay_the_spire_2_offline.db")


    # Add Cards to the card stat table
    parse_cards_json("cards", "slay_the_spire_2_offline.db")

    
folder = Path(args.folder)
results = {}
json_data: str

# todo add a way to skip files if they are already in metadata so it speeds up runtime
if not args.test:
    con = s.connect("slay_the_spire_2_offline.db")
    cur = con.cursor()
    for file_path in folder.iterdir():
        if not file_path.is_file() or file_path.suffix != ".run":
            continue

        cur.execute("""
            INSERT OR IGNORE INTO handled_files (filename)
            VALUES (?)
                    """, (file_path,))
        con.commit()

        if cur.rowcount == 1:
            with open(file_path, "r") as f:
                data = f.read()
                json_data = json.loads(data)
                if len(json_data["players"]) == 1:
                    insert_run_data(parse_file_json(json_data))
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