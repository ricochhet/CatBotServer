from fastapi import APIRouter

from ..util import json_from_file

MHGU_DB_PREFIX = "mh_data/mhgu"


router = APIRouter()


@router.get("/monsters")
async def get_monsters():
    return json_from_file(f"{MHGU_DB_PREFIX}/monster_info.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file(f"{MHGU_DB_PREFIX}/weapon_info.json")
