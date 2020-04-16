# CatBotAPI
API &amp; Database for CatBot

# Usage
- Run `npm i --save`
- Configure `config.json` if needed
- Run `node server`

# Development
- Run `npm i --save`
- Configure `config.json` if needed

### Database Updating (mh_data)
- Update `data/csv/weapons` with data found here: https://github.com/gatheringhallstudios/MHWorldData (when needed)
- Update `tables/` with data found here: https://docs.google.com/spreadsheets/d/1ttUaWtw2aaBFpz3NUp6izr-FgtQHSYJA_CjJA-xuets/edit#gid=837252457&fvid=113058775 (when needed)

- Run `node databases/mh_data/mhw/main.js --convert` (converts all .CSV files to raw JSON)
- Run `node databases/mh_data/mhw/main.js --build` (converts JSON into a more usable format)
- Final output can be found under `databases/mh_data/mhw/build/`

### API (mh_data)
- mh_data routes are as follows: