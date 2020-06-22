## Python API

This basically replaces the ``node server`` command.

All it really does is serve the json files via a REST API, for CatBot (or any other client) to query/update.

The other tools to update the database are still needed at this point. 

Eventually they could be triggered from this code (periodically, so database stays up-to-date), or even *completely ported*. 

**Functional - You can run it with the bot** 

## Usage

*Note: It's not required but you might wanna use a [virtual environment](https://docs.python.org/3/tutorial/venv.html) on your local machine.*

````
cd python-api/

# Install dependencies
pip intall -r requirements.txt

# Run server (add --reload during dev to see live changes)
uvicorn api.main:app --port 8080 --no-use-colors 

# You could also run this from root folder
# uvicorn python-api.api.main:app --port 8080 
````
Go to http://localhost:8080/ 


## Docker setup

````
# build image, from root directory (CatBotServer) 
docker build . -t catbot-api python-api\Dockerfile

# run it (bind host port 8080 to container's, remove on exit) 
docker run -it --rm -p 8080:8080 catbot-api
````

See [docker run reference](https://docs.docker.com/engine/reference/run/) for all options.

### References

- FastAPI &rarr; https://fastapi.tiangolo.com/
- Uvicorn &rarr; https://www.uvicorn.org/
- Pydantic &rarr; https://pydantic-docs.helpmanual.io/
  