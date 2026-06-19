from pathlib import Path
import json
import argparse
from sqlite_database import insert_run_data

# Takes the Json data of a Slay the Spire 2 run history file and 
# reads the data into variables. It will return a dictionary containing each decoded value
def parse_file_json(data):
    # Grab data directly from json data into variables
    character_name: str = data["players"][0]["character"] # This probably wont work for multiplayer saves
    enemy_name: str = data["killed_by_encounter"]
    floor_reached: int = 0
    won: bool = data["win"]
    run_time_sec: int = data["run_time"]
    ascension:int  = data["ascension"]

    # Sift through map events to get events that gave card rewards
    # add each card choice in the cards array
    cards = []
    for act in data["map_point_history"]:
        for room in act:
            floor_reached += 1
            for player_stat in room.get("player_stats", []):
                for choice in player_stat.get("card_choices", []):
                    cards.append({
                    "name": choice["card"]["id"],
                    "picked": choice["was_picked"],
                    })
           
    run_data = {
        "character_name": character_name,
        "enemy_name": enemy_name,
        "floor_reached": floor_reached,
        "won": won,
        "run_time_sec": run_time_sec,
        "ascension": ascension,
        "cards": cards
    }
    
    insert_run_data(run_data)

parser = argparse.ArgumentParser(description="Slay the Spire 2 Data exporter")
parser.add_argument("folder", help="Folder path that contains all of the Slay the Spire 2 run save data", type=str)
parser.add_argument("-t", "--test", help="idicates the folder argument is 1 file for testing purposes", required=False, action="store_true")
args = parser.parse_args()

folder = Path(args.folder)

results = {}

json_data: str

num_of_files: int = 0

# todo add a way to skip files if they are already in metadata so it speeds up runtime
if not args.test:
    for file_path in folder.iterdir():
        if not file_path.is_file() or file_path.suffix != ".run":
            continue

        with open(file_path, "r") as f:
            data = f.read()
            json_data = json.loads(data)
            num_of_files += 1
        
    
else:
    print("Operating in test mode")
    with open(folder, "r") as f:
        data = f.read()
        json_data = json.loads(data)
        parse_file_json(json_data)

        


