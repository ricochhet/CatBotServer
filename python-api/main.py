import json
import logging
import uvicorn

from pathlib import Path

from fastapi import FastAPI, HTTPException, Body

from .routers import mhw, mhgu

DB_PATH = Path(f"{__file__}/../../databases/").resolve().absolute()

app = FastAPI()
logger = logging.getLogger("catbot-api")


@app.get("/")
async def root():
    return {"message": "This is the API for CatBot. Go to /docs to see available endpoints."}


@app.get("/api/catfacts")
async def get_catfacts():
    path = DB_PATH.joinpath("catfact_data/catfacts.json")
    with path.open(mode="r", encoding="utf-8") as file:
        data = json.loads(file.read())
        return data


@app.get("/api/database/{client_id}/{file_path:path}")
async def get_bot_data(client_id: str, file_path: str):
    final_path = DB_PATH.joinpath(f"api_data/{client_id}/{file_path}.json")
    if not final_path.exists():
        raise HTTPException(status_code=404, detail="Invalid path - Resource doesn't exist")
    with final_path.open(mode="r", encoding="utf-8") as file:
        data = json.loads(file.read())
        return data


# TODO - Add validation here by separating in different routes and use pydantic models
# atm it just takes anything and replaces the file found (works but kinda easy to fuck up client side)
@app.post("/api/database/{client_id}/{file_path:path}")
def update_bot_data(client_id: str, file_path: str, body=Body(...)):
    final_path = DB_PATH.joinpath(f"api_data/{client_id}/{file_path}.json")
    if not final_path.exists():
        raise HTTPException(status_code=404, detail="Invalid path - Resource doesn't exist")

    logger.info(f"Updating: {body}")
    with final_path.open(mode="w", encoding="utf-8") as file:
        try:
            data = json.dumps(body["message"])
        except KeyError:
            raise HTTPException(status_code=400, detail="Invalid payload")
        file.write(data)
        return {"message": "Update was successful"}


app.include_router(mhw.router, prefix="/api/mhw")
app.include_router(mhgu.router, prefix="/api/mhgu")


if __name__ == '__main__':
    uvicorn.run("main:app")

