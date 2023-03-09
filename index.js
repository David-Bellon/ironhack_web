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
    let url = "http://127.0.0.1:5000/Schedule";
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

async function getStanding () {
    let url = "https://ergast.com/api/f1/current/driverStandings.json";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data["MRData"]["StandingsTable"]['StandingsLists'][0]['DriverStandings'] );
}

function countDown() {
    let today = new Date();
    today.setMonth(today.getMonth() + 1)
    let eventDate = new Date(nextEventDate.split(" ")[0].split("-")[0], nextEventDate.split(" ")[0].split("-")[1],
        nextEventDate.split(" ")[0].split("-")[2], nextEventDate.split(" ")[1].split(":")[0],
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
    days.innerHTML = String(daysLeft) + " DAYS";
    hours.innerHTML = String(hoursLeft) +  " HOURS";
    minutes.innerHTML = String(minutesLeft) + " MINUTES";
    seconds.innerHTML = String(secondsLeft) + " SECONDS";
}

setInterval(countDown, 1000)
fetchNextRace();
getStanding();