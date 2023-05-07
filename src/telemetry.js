


function getTelemetry() {
    let img = document.getElementById("telemetry-img");
    let loader = document.getElementById("loader-id");
    const driver1 = document.getElementById("driver-select1");
    const driver1Value = driver1.value;

    const driver2 = document.getElementById("driver-select2");
    const driver2Value = driver2.value;

    const session = document.getElementById('session-select');
    const sessionValue = session.value;

    const race = document.getElementById("race-select");
    const raceValue = race.value;

    let data = {
        first: driver1Value,
        second: driver2Value,
        session: sessionValue,
        race: Number(raceValue),
    }
    let url = "http://127.0.0.1:5000/Telemetry";
    loader.style.display = "block";
    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.blob();
    }).then(function (myBlob) {
        loader.style.display = "none";
        var url = URL.createObjectURL(myBlob);
        img.src = url;
    });
}