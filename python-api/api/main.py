import logging
from typing import Dict, List

import uvicorn
from fastapi import FastAPI, HTTPException

from .routers import mhw, mhgu
from .models import IgnoredChannels, LfgPost, LfgSubs
from .util import json_from_file, update_db_data

logger = logging.getLogger("catbot-api")

app = FastAPI()
app.include_router(mhw.router, prefix="/api/mhw")
app.include_router(mhgu.router, prefix="/api/mhgu")


@app.get("/")
async def root():
    return {"message": "This is the API for CatBot. Go to /docs to see available endpoints."}


@app.get("/api/catfacts")
async def get_catfacts():
    return json_from_file("catfact_data/catfacts.json")


# One function to retrieve any bot data (no validation needed as long as path exists)
@app.get("/api/db/{client_id}/{file_path:path}")
async def get_bot_data(client_id: str, file_path: str):
    try:
        return json_from_file(f"api_data/{client_id}/{file_path}.json")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Invalid path - Resource doesn't exist")


# Breaking the update operations into multiple endpoints to have individual validation
# It is controlled by the declared 'type' of 'payload' (API returns 400 when it doesnt match)
@app.post("/api/db/{client_id}/server/disabled")
async def update_disabled(client_id: str, payload: Dict[str, Dict[str, List[str]]]):
    logger.info(f"Updating disabled - {payload}")
    return update_db_data(client_id, "server/disabled.json", payload)


@app.post("/api/db/{client_id}/server/ignored")
async def update_ignored(client_id: str, payload: IgnoredChannels):
    logger.info(f"Updating ignored - {payload}")
    return update_db_data(client_id, "server/ignored.json", payload.dict())


@app.post("/api/db/{client_id}/lfg/posts")
async def update_lfg_posts(client_id: str, payload: Dict[str, LfgPost]):
    logger.info(f"Updating lfg posts - {payload}")
    # turn to regular dict (vs object) before saving. Copy keys, call .dict() on each value
    data = {key: value.dict() for (key, value) in payload.items()}
    return update_db_data(client_id, "lfg/posts.json", data)


@app.post("/api/db/{client_id}/lfg/subs")
async def update_lfg_subs(client_id: str, payload: LfgSubs):
    logger.info(f"Updating lfg subs - {payload}")
    return update_db_data(client_id, "lfg/subs.json", payload.dict())


@app.post("/api/db/{client_id}/server/prefixes")
async def update_prefixes(client_id: str, payload: Dict[str, str]):
    logger.info(f"Updating prefixes - {payload}")
    return update_db_data(client_id, "server/prefixes.json", payload)


if __name__ == '__main__':
    uvicorn.run("main:app", port=8080)

