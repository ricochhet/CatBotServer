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
    return json_from_file(f"{MHW_DB_PREFIX}/monster_info.json")


@router.get("/skills")
async def get_skills():
    return json_from_file(f"{MHW_DB_PREFIX}/skill_info.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file(f"{MHW_DB_PREFIX}/weapon_info.json")
