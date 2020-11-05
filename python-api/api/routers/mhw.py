import logging

from fastapi import APIRouter

from ..util import json_from_file

MHW_DB_PREFIX = "Game/MHW"
logger = logging.getLogger("catbot-api")

router = APIRouter()


@router.get("/armors")
async def get_armor():
    return json_from_file(f"{MHW_DB_PREFIX}/armorData.json")


@router.get("/decorations")
async def get_decorations():
    return json_from_file(f"{MHW_DB_PREFIX}/decorationData.json")


@router.get("/items")
async def get_items():
    return json_from_file(f"{MHW_DB_PREFIX}/itemData.json")


@router.get("/monsters")
async def get_monsters():
    return json_from_file(f"{MHW_DB_PREFIX}/monsterData.json")

@router.get("/monsters/rewards")
async def get_monsters_rewards():
    return json_from_file(f"{MHW_DB_PREFIX}/monsterRewardData.json")

@router.get("/skills")
async def get_skills():
    return json_from_file(f"{MHW_DB_PREFIX}/skillData.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file(f"{MHW_DB_PREFIX}/weaponData.json")
    
