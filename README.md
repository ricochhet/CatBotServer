# mhwdb
Data proc. from the MHW API & Official Data

# Usage
*Public usage is not intended by this repository, gaining access to it likely means you have obtained it in illegitimate means*

The api tools can be accessed via  api/client.js and api/mhw.js

Setting up the api tools is as follows:

Run npm in the directory of the git repo
```bash
npm i --save
```

```javascript
/* client.js */

const mhw = require("./mhw);

// mhw.*("path/to/json")
/* 
* If you do not wish to specify a custom directory use the directory provided, 
* making sure that api/databases/* exist and all json files
* are present.
*/
mhw.writeItems("path/to/json");
mhw.writeArmors("path/to/json");
mhw.writeDecorations("path/to/json");
mhw.writeSkills("path/to/json");
```

webdb/* is to be populated by future database utils

website/* is the public release website found at `http://catbot.xyz`
