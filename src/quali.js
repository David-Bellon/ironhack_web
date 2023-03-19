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
    console.log(driverSelected);
    console.log(sessionSelected);
    let url = "http://127.0.0.1:5000/Laps";
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
            console.log(res);
        });
    }
}

selectSession();
createDrivers();
