import logging

from fastapi import APIRouter

from ..util import json_from_file

MHW_DB_PREFIX = "game/mhw"
logger = logging.getLogger("catbot-api")

router = APIRouter()


@router.get("/armors")
async def get_armor():
    return json_from_file(f"{MHW_DB_PREFIX}/armor_data.json")


@router.get("/decorations")
async def get_decorations():
    return json_from_file(f"{MHW_DB_PREFIX}/decoration_data.json")


@router.get("/items")
async def get_items():
    return json_from_file(f"{MHW_DB_PREFIX}/item_data.json")


@router.get("/monsters")
async def get_monsters():
    return json_from_file(f"{MHW_DB_PREFIX}/monster_data.json")

@router.get("/monsters/rewards")
async def get_monsters_rewards():
    return json_from_file(f"{MHW_DB_PREFIX}/monster_reward_data.json")

@router.get("/skills")
async def get_skills():
    return json_from_file(f"{MHW_DB_PREFIX}/skill_data.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file(f"{MHW_DB_PREFIX}/weapon_data.json")
    
