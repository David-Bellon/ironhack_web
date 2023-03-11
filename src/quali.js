let circuit;
function getParam () {
    var param = window.location.href.substring(1).split("?");
    circuit = param[1];
}