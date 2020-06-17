import json
import logging
from pathlib import Path

from fastapi import APIRouter

MHW_DB_PATH = Path(f"{__file__}/../../../databases/mh_data/mhw/build/").resolve().absolute()

router = APIRouter()

logger = logging.getLogger("catbot-api")

def json_from_file(path):
    final = MHW_DB_PATH.joinpath(path)
    with final.open(mode="r", encoding="utf-8") as file:
        data = json.loads(file.read())
        return data


@router.get("/armors")
async def get_armor():
    return json_from_file("armor_info.json")


@router.get("/decorations")
async def get_decorations():
    return json_from_file("decoration_info.json")


@router.get("/items")
async def get_items():
    return json_from_file("item_info.json")


@router.get("/monsters")
async def get_monsters():
    # get monster data from different files
    monsters = json_from_file("monster_info.json")
    hitzones = json_from_file("hitzone_data.json")
    enrage = json_from_file("enrage_data.json")

    # append hitzone and enrage data to the monster details
    for monster in monsters:
        name = monster["name"]

        hzv = hitzones.get(name)
        enrage_values = enrage.get(name)

        if not hzv or not enrage_values:
            logger.error(f"Missing data for the monster {name}")
            continue
        else:
            monster["details"]["hitzones"] = hitzones.get(name)
            monster["details"]["enrage"] = enrage.get(name)

    return monsters


@router.get("/skills")
async def get_skills():
    return json_from_file("skill_info.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file("weapon_info.json")
