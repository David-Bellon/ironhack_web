let year = 2023;

async function fetchNextRace(){
    let gp_name = document.getElementById("gp-name");
    let gp_location = document.getElementById("gp-loc")
    let url = "http://127.0.0.1:5000/Schedule";
    let response = await fetch(url);
    let data = await response.json();
    gp_name.innerText = "Next GP: " + data.data["name"];
    gp_location.innerText = "Location: " + data.data["country"];
}
fetchNextRace();