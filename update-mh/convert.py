""" Converts all csv files to JSON """
import csv
import json
import os
from pathlib import Path


def csv_to_json(csv_path: str, json_path: str, convert_int: bool = True):
    """ Turns a given csv file to json equivalent. Empty values replaced with 0. Numbers saved as int (not str)."""
    data = []
    with open(csv_path, encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            if convert_int:
                # convert numbers to int values in the dict/json
                for key, value in row.items():
                    if not value:
                        # TODO - Not sure if every empty value should be turned to zero (seems like it)
                        row[key] = 0
                    elif str(value).isdigit():
                        row[key] = int(value)

            data.append(row)

    with open(json_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json.dumps(data, indent=4))
        print(f"Data written to file: {json_path}")


def convert_csv_dir(input_dir: str, output_dir: str):
    """ Converts all csv files found in given directory to equivalent json files in output directory"""
    csv_files = []
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            if file.endswith(".csv"):
                csv_files.append(file)

    for file in csv_files:
        csv_to_json(
            csv_path=os.path.join(input_dir, file),
            json_path=os.path.join(output_dir, file.replace(".csv", ".json"))
        )
    return csv_files


if __name__ == '__main__':
    root_path = Path(__file__).parent.resolve().absolute()
    files = convert_csv_dir(
        os.path.join(root_path, "source", "data", "csv", "weapons"),
        os.path.join(root_path, "source", "data", "json", "weapons")
    )
