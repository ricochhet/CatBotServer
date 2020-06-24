# CatBotServer

API & Database for CatBot

The REST api (see ``python-api/``) basically allows querying or updating data in the ``databases/`` folder (JSON files).

## API Usage / Development

*Note: It's not required but you might wanna use a [virtual environment](https://docs.python.org/3/tutorial/venv.html) on your local machine.*

````
cd python-api/

# Install dependencies
pip intall -r requirements.txt

# Run server (add --reload during dev to see live changes)
uvicorn api.main:app --port 8080 --no-use-colors 

# You could also run this from root folder
# uvicorn python-api.api.main:app --port 8080

# See all options
uvicorn --help
````

Go to http://localhost:8080/

### References

- [FastAPI](https://fastapi.tiangolo.com/)
  
- [Uvicorn](https://www.uvicorn.org/)
  
- [Pydantic](https://pydantic-docs.helpmanual.io/)

### Docker setup

````
# build image, from root directory (CatBotServer) 
docker build . -t catbot-api python-api\Dockerfile

# run it (bind host port 8080 to container's, remove on exit) 
docker run -it --rm -p 8080:8080 catbot-api
````

See [docker run reference](https://docs.docker.com/engine/reference/run/) for all options.

## Database Updating (``update-mh/``)

- Update `source/data/csv/weapons` with data found [here](https://github.com/gatheringhallstudios/MHWorldData) (when needed)

- Update `source/tables/` with data found [here](https://docs.google.com/spreadsheets/d/1ttUaWtw2aaBFpz3NUp6izr-FgtQHSYJA_CjJA-xuets/edit#gid=837252457&fvid=113058775) (when needed)

- Run `npm install` for dependencies

- Run `node update-mh/main.js --convert` (converts all .CSV files to raw JSON)

- Run `node update-mh/main.js --build` (converts JSON into a more usable format)

- Final output can be found under `databases/mh_data/mhw/`

## User Data

All user data in the databases is used on an opt-in, opt-out basis by the users own choice.
All user data collected may not be redistributed without explicit permission.

## Contributions

Please do not contribute to this project without explicit permission from the project owner.

## Licensing

NONE (No Permission)
