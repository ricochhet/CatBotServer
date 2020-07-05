import os
import json
from pathlib import Path

DB_PATH = os.getenv("CATBOT_DB_PATH")

if DB_PATH is None:
    DB_PATH = Path(f"{__file__}/../../../databases/").resolve().absolute()
else:
    DB_PATH = Path(DB_PATH).resolve().absolute()


def json_from_file(path):
    final = DB_PATH.joinpath(path)
    with final.open(mode="r", encoding="utf-8") as file:
        data = json.loads(file.read())
        return data


def json_to_file(path, content):
    with path.open(mode="w", encoding="utf-8") as file:
        data = json.dumps(content)
        file.write(data)


def update_db_data(client_id, path, content):
    final_path = DB_PATH.joinpath(f"api_data/{client_id}/{path}")
    json_to_file(final_path, content)
    return {"message": "Update was successful"}
