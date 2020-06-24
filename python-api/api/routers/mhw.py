import logging

from fastapi import APIRouter

from ..util import json_from_file

MHW_DB_PREFIX = "mh_data/mhw"
logger = logging.getLogger("catbot-api")

router = APIRouter()


@router.get("/armors")
async def get_armor():
    return json_from_file(f"{MHW_DB_PREFIX}/armor_info.json")


@router.get("/decorations")
async def get_decorations():
    return json_from_file(f"{MHW_DB_PREFIX}/decoration_info.json")


@router.get("/items")
async def get_items():
    return json_from_file(f"{MHW_DB_PREFIX}/item_info.json")


@router.get("/monsters")
async def get_monsters():
    # get monster data from different files
    monsters = json_from_file(f"{MHW_DB_PREFIX}/monster_info.json")
    hitzones = json_from_file(f"{MHW_DB_PREFIX}/hitzone_data.json")
    enrage = json_from_file(f"{MHW_DB_PREFIX}/enrage_data.json")

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
    return json_from_file(f"{MHW_DB_PREFIX}/skill_info.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file(f"{MHW_DB_PREFIX}/weapon_info.json")
