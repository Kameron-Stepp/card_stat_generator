from pathlib import Path
import json

p = Path("cards")
for card in p.iterdir():
    destroy = False
    with open(card, "r", encoding="utf-8") as f:
        data = f.read()
        json_data = json.loads(data)
        destroy = json_data["card"]["category"] == "Token"
    if destroy:
        print(card.name)
        card.unlink()