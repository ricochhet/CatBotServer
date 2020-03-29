# mhwdb
Data proc. from the MHW API & Official Data

# Usage
### Setup
- `npm i --save` to install required modules
- Running the app: `node index`
- Added new data / updating data:
  - Update `src/source_data` from MHWorldData Repository
  - Update `src/source_tables` from Mech-E google spreadsheet.
    Note: export as *.tsv and rename each to the appropriate names

  - Run `python data/main.py` to update source_tables data
  - Run `node data/main.js --convert` to convert data from *.csv to *.json

  - Run `node data/main.js --merge` to merge into a clean json output
  - Run `node data/main.js --merge-fix` to fix / adjust files reliant on post-merge data

  - Run `node data/main.js --build-api` to build the finalized json used in the API
  - Run `node data/main.js --build-bot` to build the finalized json used in the Discord bot
    Note: Running --build-* commands rely on the LartTyler API, which can take longer to process

- `src/source_json` & `src/json` are processed during adding / updating data and should not be modified directly.
- `src/source_tables` & `src/source_data` are retrieved from Mech-E google spreadsheet and MHWorldData repo respectively.
- Final output results are in `data/build/api`, `data/build/bot`
  - `data/build/def` data is assigned manually, and is not automated

- Not all data is categorized yet


### Web Routes
  - `*/`
  - `*/admin`
    - `*/admin/login`
    - `*/admin/logout`
    - `*/admin/dashboard`

  - `*/mhw/armors/:id`
  - `*/mhw/decorations/:id`
  - `*/mhw/items/:id`
  - `*/mhw/monsters/:id`
  - `*/mhw/skills/:id`
  - `*/mhw/weapons/:id`

