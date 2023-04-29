let year = 2023;

let nextEventDate;

async function fetchNextRace(){
    let gp_name = document.getElementById("gp-name");
    let gp_location = document.getElementById("gp-loc")
    let fp1 = document.getElementById("fp1")
    let fp2 = document.getElementById("fp2")
    let fp3 = document.getElementById("fp3")
    let q = document.getElementById("q")
    let r = document.getElementById("r")
    let url = "https://salmon-field-0db25fb03.3.azurestaticapps.net/Schedule";
    let response = await fetch(url);
    let data = await response.json();
    gp_name.innerHTML = "Next GP: " + data.data["name"];
    gp_location.innerHTML = "Location: " + data.data["country"];
    fp1.innerHTML = data.data["fp1"];
    fp2.innerHTML = data.data["fp2"];
    fp3.innerHTML = data.data["fp3"];
    q.innerHTML = data.data["q"];
    r.innerHTML = data.data["r"];
    nextEventDate = data.data["closes_date"];
}

async function getDriverStanding () {
    let standings = document.getElementById("driver-standing");
    let url = "https://ergast.com/api/f1/current/driverStandings.json";
    let response = await fetch(url);
    let data = await response.json();
    let drivers = data["MRData"]["StandingsTable"]['StandingsLists'][0]['DriverStandings'];
    for (var i=0; i<drivers.length; i++){
        let driverInfo = document.createElement("div");
        driverInfo.className = "driver-info";
        let driverPos = document.createElement("div");
        driverPos.className = "driver-pos";
        let textPos = document.createElement("p");
        textPos.innerHTML = drivers[i]["position"] + "º";
        driverPos.appendChild(textPos);
        driverInfo.appendChild(driverPos);
        standings.appendChild(driverInfo);

        let driverName = document.createElement("div");
        driverName.className = "driver-name";
        let textName = document.createElement("p");
        textName.innerHTML = drivers[i]["Driver"]["givenName"] + " " + drivers[i]["Driver"]["familyName"];
        driverName.appendChild(textName);
        driverInfo.appendChild(driverName);

        let driverNumber = document.createElement("div");
        driverNumber.className = "driver-number";
        let textNumber = document.createElement("p");
        textNumber.innerHTML = drivers[i]["Driver"]["permanentNumber"];
        driverNumber.appendChild(textNumber);
        driverInfo.appendChild(driverNumber);

        let driverPts = document.createElement("div");
        driverPts.className = "driver-pts"
        let testPts = document.createElement("p");
        testPts.innerHTML = drivers[i]["points"] + " pts";
        driverPts.appendChild(testPts);
        driverInfo.appendChild(driverPts);
    }
}

async function getConstrStanding () {
    let standings = document.getElementById("teams-standing");
    let url = "https://ergast.com/api/f1/current/constructorStandings.json";
    let response = await fetch(url);
    let data = await response.json();
    let teams = data["MRData"]["StandingsTable"]['StandingsLists'][0]["ConstructorStandings"];
    console.log(teams[0]);
    for (var i=0; i<teams.length; i++) {
        let teamInfo = document.createElement("div");
        teamInfo.className = "driver-info";
        let teamPos = document.createElement("div");
        teamPos.className = "driver-pos";
        let textPos = document.createElement("p");
        textPos.innerHTML = teams[i]["position"] + "º";
        teamPos.appendChild(textPos);
        teamInfo.appendChild(teamPos);
        standings.appendChild(teamInfo);

        let teamName = document.createElement("div");
        teamName.className = "driver-name";
        let textName = document.createElement("p");
        textName.innerHTML = teams[i]["Constructor"]["name"];
        teamName.appendChild(textName);
        teamInfo.appendChild(teamName);

        let teamWins = document.createElement("div");
        teamWins.className = "driver-number";
        let textNumber = document.createElement("p");
        textNumber.innerHTML = teams[i]["wins"];
        teamWins.appendChild(textNumber);
        teamInfo.appendChild(teamWins);

        let teamPts = document.createElement("div");
        teamPts.className = "driver-pts"
        let testPts = document.createElement("p");
        testPts.innerHTML = teams[i]["points"] + " pts";
        teamPts.appendChild(testPts);
        teamInfo.appendChild(teamPts);
    }
}

function countDown() {
    let today = new Date();
    today.setMonth(today.getMonth() + 1)
    let eventDate = new Date(nextEventDate.split(" ")[0].split("-")[0], nextEventDate.split(" ")[0].split("-")[1],
        nextEventDate.split(" ")[0].split("-")[2], nextEventDate.split(" ")[1].split(":")[0] - 2,
        nextEventDate.split(" ")[1].split(":")[1], nextEventDate.split(" ")[1].split(":")[2]);
    let difference = Math.abs(eventDate - today);
    let daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24))
    let hoursLeft = Math.floor((difference / (1000 * 60 * 60 * 24) - daysLeft) * 24);
    let minutesLeft = Math.floor((((difference / (1000 * 60 * 60 * 24) - daysLeft) * 24) - hoursLeft) * 60);
    let secondsLeft = Math.floor((((((difference / (1000 * 60 * 60 * 24) - daysLeft) * 24) - hoursLeft) * 60) - minutesLeft) * 60);
    let days = document.getElementById("days")
    let hours = document.getElementById("hours")
    let minutes = document.getElementById("minutes")
    let seconds = document.getElementById("seconds")
    if ((eventDate - today) < 0) {
        days.innerHTML = 0 + " DAYS";
        hours.innerHTML = 0 +  " HOURS";
        minutes.innerHTML = 0 + " MINUTES";
        seconds.innerHTML = 0 + " SECONDS";
    }
    else {
        days.innerHTML = String(daysLeft) + " DAYS";
        hours.innerHTML = String(hoursLeft) +  " HOURS";
        minutes.innerHTML = String(minutesLeft) + " MINUTES";
        seconds.innerHTML = String(secondsLeft) + " SECONDS";
    }
}

setInterval(countDown, 1000)
fetchNextRace();
getDriverStanding();
getConstrStanding();