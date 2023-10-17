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

### Docker setup - Deployment

Run this from the root directory, when deploying
````
# build image first (if code changes) 
docker build . --tag catbot-api --file python-api\Dockerfile

# run it (use ${pwd} on windows/powershell)   
docker run --rm -d -p 8080:8080 -v $(pwd)/databases:/app/databases --name api catbot-api

# check status
docker ps

# check logs 
docker logs api

# stop the api
docker stop api

````

Some notes about the run command
* `--rm` means remove the container on exit, otherwise you need to run `docker rm <container>` after stopping it, for cleanup. 
* ``-d`` for `--detach`, to start the container in background
* `-p 8080:8080` binds the host port 8080 to the container port 8080
* `-v $(pwd)/databases:/app/databases` binds `<current dir>/databases` on the host to `/app/databases` on the container. This is needed to *persist db changes between different container runs*.
* `--name api` gives the `api` custom name to the running container (that we can use for other commands like `docker logs`, `docker stop`, etc.)
* the last argument ``catbot-api`` is the name of the image to build this container from (created with `docker build`).    

See [docker run reference](https://docs.docker.com/engine/reference/run/) for all options.

## Database Updating (``update-mh/``)

- Update `source/data/csv/weapons` with data found [here](https://github.com/gatheringhallstudios/MHWorldData) (when needed)

- Run `npm install` for dependencies

- Run `node update-mh/main.js --convert` (converts all .CSV files to raw JSON)

- Run `node update-mh/main.js --build` (converts JSON into a more usable format)

- Final output can be found under `databases/mh_data/mhw/`

## User Data

All user data in the databases is used on an opt-in, opt-out basis by the users own choice.
All user data collected may not be redistributed without explicit permission.

## Suggestions & PRs

Suggestions and pull requests are very appreciated, just keep in mind to follow the project architecture to keep it consistent.

## Licensing

MIT
