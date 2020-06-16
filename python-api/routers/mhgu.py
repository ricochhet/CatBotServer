import json
from pathlib import Path

from fastapi import APIRouter

MHW_DB_PATH = Path(f"{__file__}/../../../databases/mh_data/mhgu/").resolve().absolute()

router = APIRouter()


def json_from_file(path):
    final = MHW_DB_PATH.joinpath(path)
    with final.open(mode="r", encoding="utf-8") as file:
        data = json.loads(file.read())
        return data


@router.get("/monsters")
async def get_monsters():
    return json_from_file("monster_info.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file("weapon_info.json")
