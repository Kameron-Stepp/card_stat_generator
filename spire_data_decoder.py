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