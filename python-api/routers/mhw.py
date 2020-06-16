import json
from pathlib import Path

from fastapi import APIRouter

MHW_DB_PATH = Path(f"{__file__}/../../../databases/mh_data/mhw/build/").resolve().absolute()

router = APIRouter()


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


# TODO - Implement monsters endpoint
# @router.get("/monsters")
# async def get_monsters():
#     raw = json_from_file("monster_info.json")
#     # think some manipulations are necessary, given how it looks
#     return raw


@router.get("/skills")
async def get_skills():
    return json_from_file("skill_info.json")


@router.get("/weapons")
async def get_weapons():
    return json_from_file("weapon_info.json")
