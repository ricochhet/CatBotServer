from server.api.api_managers.SQLManager import SQLManager
from server.api.api_structs.mhw import MHWStruct

import json
import sqlite3


connect = sqlite3.connect('mhwdb.sqlite')
cursor = connect.cursor()
manager = SQLManager(cursor)

mhw = MHWStruct(manager)
mhw.struct_decorations()
mhw.struct_monsters()
mhw.struct_weapons()
mhw.struct_armors()
mhw.struct_skills()
mhw.struct_items()

connect.commit()
cursor.close()
