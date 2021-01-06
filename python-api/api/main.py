import logging
from typing import Dict, List

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .routers import mhw
from .models import IgnoredChannels
from .util import json_from_file, update_db_data

logger = logging.getLogger("catbot-api")

origins = [
    "http://localhost:8080",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(mhw.router, prefix="/api/mhw")


@app.get("/")
async def root():
    return {"message": "This is the API for CatBot. Go to /docs to see available endpoints."}


@app.get("/api/cats/facts")
async def get_catfacts():
    return json_from_file("cats/cat_facts.json")


# One function to retrieve any bot data (no validation needed as long as path exists)
@app.get("/api/db/{file_path:path}")
async def get_bot_data(file_path: str):
    try:
        # print(f"discord/{file_path}.json")
        return json_from_file(f"discord/{file_path}.json")
    except FileNotFoundError:
        raise HTTPException(
            status_code=404, detail="Invalid path - Resource doesn't exist")


# Breaking the update operations into multiple endpoints to have individual validation
# It is controlled by the declared 'type' of 'payload' (API returns 400 when it doesnt match)
@app.post("/api/db/server/disabled_commands")
async def update_disabled(payload: Dict[str, Dict[str, List[str]]]):
    logger.info(f"Updating disabled commands - {payload}")
    return update_db_data("server/disabled_commands.json", payload)


@app.post("/api/db/server/ignored_channels")
async def update_ignored(payload: IgnoredChannels):
    logger.info(f"Updating ignored channels - {payload}")
    return update_db_data("server/ignored_channels.json", payload.dict())


@app.post("/api/db/server/server_prefixes")
async def update_prefixes(payload: Dict[str, str]):
    logger.info(f"Updating server prefixes - {payload}")
    return update_db_data("server/server_prefixes.json", payload)


if __name__ == '__main__':
    uvicorn.run("main:app", port=8080)
