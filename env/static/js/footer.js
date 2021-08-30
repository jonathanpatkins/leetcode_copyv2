// stuff in here must be updated upon adding more pages 
document.getElementById("page-number").innerHTML = `${Number(yaml_data[0]) + 1}/4`;

function prevPage() {
    if (yaml_data[0] > 0) {
        window.location.href = `../problem${Number(yaml_data[0]) - 1}`;
    }
}

function nextPage() {
    if (yaml_data[0] < 3) {
        window.location.href = `../problem${Number(yaml_data[0]) + 1}`;
    }
}

if (yaml_data[0] == 0) {
    document.getElementById("prev").style.color = "grey";
    // document.getElementById("next").style.color = "black";
}
if (yaml_data[0] == 3) {
    // document.getElementById("prev").style.color = "black";
    document.getElementById("next").style.color = "grey";
}