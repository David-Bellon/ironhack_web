import fastf1
from flask import Flask, request
from flask_cors import CORS
import datetime

fastf1.Cache.enable_cache("cache")

app = Flask(__name__)

drivers = {
    "driver-0": "VER",
    "driver-1": "HAM",
    "driver-2": "PER",
    "driver-3": "LEC",
    "driver-4": "SAI",
    "driver-5": "ALO",
    "driver-6": "RUS",
    "driver-7": "STR",
    "driver-8": "NOR",
    "driver-9": "ALB",
    "driver-10": "BOT",
    "driver-11": "ZHO",
    "driver-12": "OCO",
    "driver-13": "GAS",
    "driver-14": "TSU",
    "driver-15": "DEV",
    "driver-16": "MAG",
    "driver-17": "HUL",
    "driver-18": "PIA",
    "driver-19": "SAR",

}


@app.route("/Schedule", methods=["GET"])
def get_event():
    next_event = fastf1.get_events_remaining().iloc[0]
    data = {
        "name": next_event["EventName"],
        "country": str(next_event["Country"]) + " --- " + str(next_event["Location"]),
        "fp1": str(next_event["Session1"]) + " ----- " + str(next_event["Session1Date"]).split(" ")[1],
        "fp2": str(next_event["Session2"]) + " ----- " + str(next_event["Session2Date"]).split(" ")[1],
        "fp3": str(next_event["Session3"]) + " ----- " + str(next_event["Session3Date"]).split(" ")[1],
        "q": str(next_event["Session4"]) + " ----- " + str(next_event["Session4Date"]).split(" ")[1],
        "r": str(next_event["Session5"]) + " ----- " + str(next_event["Session5Date"]).split(" ")[1],
        "closes_date": str(next_event["Session1Date"])
    }
    print(next_event)
    return {"data": data}, 200


@app.route("/Laps", methods=["POST"])
def get_aps():
    receive = request.json
    session = fastf1.get_session(2023, 2, receive["session"])
    session.load()
    laps = session.laps
    for column in ["Time", "LapTime", "PitOutTime", "PitInTime", "Sector1Time", "Sector2Time", "Sector3Time",
                   "Sector1SessionTime", "Sector2SessionTime", "Sector3SessionTime", "LapStartTime"]:
        laps[column] = laps[column].dt.total_seconds()
    laps = laps.fillna(0)
    laps = laps.drop(columns=["FreshTyre", "DriverNumber", "IsAccurate", "LapStartDate", "LapStartTime",
                              "Sector1SessionTime", "Sector2SessionTime", "Sector3SessionTime", "SpeedFL", "SpeedI1",
                              "SpeedI2", "SpeedST", "Team", "Time", "TrackStatus"])
    driver1 = drivers[receive["0"]]
    try:
        driver2 = drivers[receive["1"]]
        ones = laps.loc[laps["Driver"] == driver1].to_dict("list")
        second = laps.loc[laps["Driver"] == driver2].to_dict("list")
        return {"data": [ones, second]}, 200
    except:
        ones = laps.loc[laps["Driver"] == driver1].to_dict("list")
        return {"data": ones}, 200


if __name__ == "__main__":
    CORS(app)
    app.run()
"""
session = fastf1.get_session(2023, "Bahrein", "FP2")
session.load()
laps = session.laps
"""