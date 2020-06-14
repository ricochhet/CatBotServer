## Python API

This basically replaces the ``node server`` command, when finished.

All it really does is serve the json files via a REST API (currently works for catfacts and bot server ones, you can run with bot to check).

The other tools to update the database are still needed at this point. 

Eventually they could be triggered from this code (periodically, so database stays up-to-date), or even *completely ported*. 

**Currently missing the mhw data files, before being functional.** 

## Usage

*Note: It's not required but you might wanna use a [virtual environment](https://docs.python.org/3/tutorial/venv.html) on your local machine.*

````
cd python-api/

# Install dependencies
pip intall -r requirements.txt

# Run server (add --reload during dev to see live changes)
uvicorn main:app --port 8080 --no-use-colors 

# You could also run this from root folder
# uvicorn python-api.main:app --port 8080 
````
Go to http://localhost:8080/ 


### References

- FastAPI &rarr; https://fastapi.tiangolo.com/
- Uvicorn &rarr; https://www.uvicorn.org/
- Pydantic &rarr; https://pydantic-docs.helpmanual.io/
  