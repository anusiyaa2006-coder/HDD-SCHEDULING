function calculate() {
    let requests = document.getElementById("requests").value
        .split(',')
        .map(Number);

    let head = parseInt(document.getElementById("head").value);
    let algo = document.getElementById("algo").value;

    let result;

    if (algo === "FCFS") {
        result = fcfs(requests, head);
    } else if (algo === "SSTF") {
        result = sstf(requests, head);
    } else {
        alert("Other algorithms coming soon!");
        return;
    }

    document.getElementById("sequence").innerText =
        result.sequence.join(" → ");

    document.getElementById("seek").innerText =
        result.seek;
}