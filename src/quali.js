let circuit;
let driverSelected = [];
let sessions = document.getElementsByClassName("session-self")
let sessionSelected = null;
function getParam () {
    var param = window.location.href.substring(1).split("?");
    circuit = param[1];
}

function createDrivers () {
    for (var i=0; i<20; i++) {
        let driver = document.createElement("div");
        let driversBox = document.getElementById("driver-box");
        driver.className = "driver-self";
        driver.style.background = "white";
        driver.onclick = function () {
            if (this.style.background == "white"){
                this.style.background = "grey";
                driverSelected.push(this);
            }
            else {
                this.style.background = "white";
                var index = driverSelected.indexOf(this);
                if (index > -1){
                   driverSelected.splice(index, 1);
                }
            }
        };
        driver.id = "driver-" + String(i);
        let image = document.createElement("img");
        image.src = "static/driver_" + String(i) + ".webp";
        driver.appendChild(image);
        driversBox.appendChild(driver);
    }
}
function selectSession () {
    for (var i=0; i<sessions.length; i++) {
        sessions[i].style.backgroundColor = "white";
        sessions[i].onclick = function () {
            if (this.style.backgroundColor == "white") {
                this.style.backgroundColor = "black";
                this.style.color = "white";
                if (sessionSelected == null) {
                    sessionSelected = this;
                }
                else {
                    sessionSelected.style.background = "white";
                    sessionSelected.style.color = "black";
                    sessionSelected = this;
                }
            }
            else {
                this.style.backgroundColor = "white";
                this.style.color = "black";
                sessionSelected = null;
            }
        }
    }
}

async function buttonClicked () {
    let url = "https://salmon-field-0db25fb03.3.azurestaticapps.net";
    error = document.getElementById("error")
    if (driverSelected.length == 0 || driverSelected.length > 2 || sessionSelected == null) {
        error.style.visibility = "visible";
        setTimeout(function (){
            error.style.visibility = "hidden";
        }, 1000)
    }
    else{
        let data = {};
        for (let i=0; i<driverSelected.length; i++) {
            data[i] = String(driverSelected[i].id);
        }
        data["session"] = String(sessionSelected.id);
        fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        }).then(cas => {
            for (var i=0; i<cas.data.length; i++) {
                createTable(cas.data[i], i);
                console.log("hey");
            }
        });
    }
}

async function createTable(data, number) {
    let newHeight = 75*data["LapNumber"].length + 30;
    console.log(newHeight);
    let driverLapsCont = document.getElementById("laps-box");
    driverLapsCont.style.display = "block";
    let driverLaps = document.createElement("div");
    driverLaps.className = "driver-laps";
    driverLaps.id = "driver" + String(number);
    driverLaps.style.height = String(newHeight) + "px";
    driverLapsCont.appendChild(driverLaps);

    let name = document.createElement("div");
    name.className = "driver-name";
    let pName = document.createElement("p");
    pName.innerHTML = data["Driver"][0];
    pName.style.color = "black";
    let hr = document.createElement("hr");
    name.appendChild(pName);
    driverLaps.appendChild(name);
    driverLaps.appendChild(hr);
    if (number == 1) {
        let headerInfo = document.getElementById("headerInfo1");
        headerInfo.style.display = "block";
        driverLaps.appendChild(headerInfo);
    }
    else {
        let headerInfo = document.getElementById("headerInfo2");
        headerInfo.style.display = "block";
        driverLaps.appendChild(headerInfo);
    }

    for (var i=0; i<data["LapNumber"].length; i++) {
        let dataBox = document.createElement("div");
        dataBox.className = "lap-data";

        let numberLap = document.createElement("div");
        numberLap.className = "number-lap";
        let pNumberLap = document.createElement("p");
        pNumberLap.innerHTML = data["LapNumber"][i];
        numberLap.appendChild(pNumberLap);
        dataBox.appendChild(numberLap);

        let lapTime = document.createElement("div");
        lapTime.className = "lap-time";
        let pLapTime = document.createElement("p");
        let secondsLap = parseFloat(data["LapTime"][i]);
        let minutes = Math.floor(secondsLap / 60);
        let seconds = Math.floor((secondsLap / 60 - minutes) * 60);
        let mili = Math.floor(((secondsLap / 60 - minutes) * 60 - seconds) * 1000);
        secondsLap = String(minutes) + ":" + String(seconds) + ":" + String(mili);
        pLapTime.innerHTML = secondsLap;
        lapTime.appendChild(pLapTime);
        dataBox.appendChild(lapTime);

        let s1 = document.createElement("div");
        s1.className = "s1";
        let pS1 = document.createElement("p");
        pS1.innerHTML = data["Sector1Time"][i];
        s1.appendChild(pS1);
        dataBox.appendChild(s1);

        let s2 = document.createElement("div");
        s2.className = "s2";
        let pS2 = document.createElement("p");
        pS2.innerHTML = data["Sector2Time"][i];
        s2.appendChild(pS2);
        dataBox.appendChild(s2);

        let s3 = document.createElement("div");
        s3.className = "s3";
        let pS3 = document.createElement("p");
        pS3.innerHTML = data["Sector3Time"][i];
        s3.appendChild(pS3);
        dataBox.appendChild(s3);

        let comp = document.createElement("div");
        comp.className = "comp";
        let img = document.createElement("img");
        let compound = data["Compound"][i].toLowerCase();
        img.src = "static/" + compound + ".webp";
        comp.appendChild(img);
        dataBox.appendChild(comp);

        let stint = document.createElement("stint");
        stint.className = "stint";
        let pStint = document.createElement("p");
        pStint.innerHTML = data["Stint"][i];
        stint.appendChild(pStint);
        dataBox.appendChild(stint);

        let tyre = document.createElement("div");
        tyre.className = "tyre-life";
        let pTyre = document.createElement("p");
        pTyre.innerHTML = data["TyreLife"][i];
        tyre.appendChild(pTyre);
        dataBox.appendChild(tyre);
        driverLaps.appendChild(dataBox);
    }
    document.body.appendChild(driverLapsCont);
}

selectSession();
createDrivers();
