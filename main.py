from sqlite_database import * 
from slay_the_spire_cards_parser import *
from spire_data_decoder import *
import argparse

# Establish Arguments
parser = argparse.ArgumentParser(description="Slay the Spire 2 Data exporter")
parser.add_argument("folder", help="Folder path that contains all of the Slay the Spire 2 run save data", type=str)
parser.add_argument("-t", "--test", help="idicates the folder argument is 1 file for testing purposes", required=False, action="store_true")
parser.add_argument("-n", "--new", help="Creates two new databases and populates them with the necessary info", required=False, action="store_true")
args = parser.parse_args()

if args.new:
    # Create the Database if it dosent exist
    create_database("slay_the_spire_2_offline.db")
    create_database("slay_the_spire_2_online.db")

    # Add Cards to the card stat table
    parse_cards_json("cards", "slay_the_spire_2_offline.db")
    parse_cards_json("cards", "slay_the_spire_2_offline.db")
    
folder = Path(args.folder)
results = {}
json_data: str
num_of_files: int = 0 # Useless?

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