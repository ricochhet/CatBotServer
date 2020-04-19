# CatBotServer
API & Database for CatBot

# Development / Usage
- Run `npm i --save`
- Configure `config.json` if needed
- Run `node server` or `npm run start`

## Config Options
`api.client` - Controls whether the frontend (client) is used (true / false)
`api.client_id` - Database API client id, used for identification of the app (string / int)
`api.token` - Secure token that gets access to the API (string)
`api.api_database` - Controls whether to use the database api (true / false)

## Database Updating (mh_data)
- Update `data/csv/weapons` with data found here: https://github.com/gatheringhallstudios/MHWorldData (when needed)
- Update `tables/` with data found here: https://docs.google.com/spreadsheets/d/1ttUaWtw2aaBFpz3NUp6izr-FgtQHSYJA_CjJA-xuets/edit#gid=837252457&fvid=113058775 (when needed)

- Run `node databases/mh_data/mhw/main.js --convert` (converts all .CSV files to raw JSON)
- Run `node databases/mh_data/mhw/main.js --build` (converts JSON into a more usable format)
- Final output can be found under `databases/mh_data/mhw/build/`

## Database Updating (api_data)
- Data is modified using different HTTP requests
- Setup a "database" within the `queries.js` file

```javascript
database.post_db(url, function(queries){});
database.delete_db(url, function(queries){});
database.get_db(url, database_path);
```

**Database URLs must be unique**
- Usage examples & libraries can be found under `libraries/db-api.js` & `libraries/index.js`

### API Routes (mh_data)
- **Monster Hunter: World**
  - `base_url/api/mhw/armors`
  - `base_url/api/mhw/decorations`
  - `base_url/api/mhw/items`
  - `base_url/api/mhw/monsters`
  - `base_url/api/mhw/skills`
  - `base_url/api/mhw/weapons`

- **Monster Hunter: Generations Ultimate**
  - `base_url/api/mhgu/monsters`
  - `base_url/api/mhgu/weapons`

### API Routes (api_data)
- `base_url/api/database/:client_id/database_name`