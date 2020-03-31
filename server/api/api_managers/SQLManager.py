import sqlite3


class SQLManager:
  def __init__(self, cursor):
    self.cursor = cursor
    self.name = None
    self.rows = None

  def create(self, name, rows):
    self.cursor.execute(f"CREATE TABLE IF NOT EXISTS {name} {rows}")
    self.name = name
    self.rows = rows

  def insert(self, rows, values, parameters=False, paramValues=None):
    if parameters == True:
      self.cursor.execute(
          f"INSERT OR REPLACE INTO {self.name} {rows} VALUES {values}", paramValues)
    else:
      self.cursor.execute(
          f"INSERT OR REPLACE INTO {self.name} {rows} VALUES {values}")
