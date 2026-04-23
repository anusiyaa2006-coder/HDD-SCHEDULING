function fcfs(req, head) {
    let seek = 0, seq = [head];
    req.forEach(r => {
        seek += Math.abs(head - r);
        head = r;
        seq.push(head);
    });
    return { seq, seek };
}

function sstf(req, head) {
    let seek = 0, seq = [head];
    let visited = Array(req.length).fill(false);

    for (let i = 0; i < req.length; i++) {
        let min = Infinity, index = -1;

        for (let j = 0; j < req.length; j++) {
            if (!visited[j]) {
                let dist = Math.abs(head - req[j]);
                if (dist < min) {
                    min = dist;
                    index = j;
                }
            }
        }

        visited[index] = true;
        seek += min;
        head = req[index];
        seq.push(head);
    }

    return { seq, seek };
}

function scan(req, head, diskSize, dir) {
    let seek = 0, seq = [head];
    let left = req.filter(r => r < head).sort((a,b)=>b-a);
    let right = req.filter(r => r >= head).sort((a,b)=>a-b);

    if (dir === "left") {
        left.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        seek += Math.abs(head - 0); head = 0; seq.push(head);
        right.reverse().forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    } else {
        right.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        seek += Math.abs(head - (diskSize - 1)); head = diskSize - 1; seq.push(head);
        left.reverse().forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    }

    return { seq, seek };
}

function cscan(req, head, diskSize, dir) {
    let seek = 0, seq = [head];
    let left = req.filter(r => r < head).sort((a,b)=>a-b);
    let right = req.filter(r => r >= head).sort((a,b)=>a-b);

    if (dir === "right") {
        right.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        seek += Math.abs(head - (diskSize - 1)); head = diskSize - 1; seq.push(head);
        seek += Math.abs(head - 0); head = 0; seq.push(head);
        left.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    } else {
        left.reverse().forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        seek += Math.abs(head - 0); head = 0; seq.push(head);
        seek += Math.abs(head - (diskSize - 1)); head = diskSize - 1; seq.push(head);
        right.reverse().forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    }

    return { seq, seek };
}

function look(req, head, dir) {
    let seek = 0, seq = [head];
    let left = req.filter(r => r < head).sort((a,b)=>b-a);
    let right = req.filter(r => r >= head).sort((a,b)=>a-b);

    if (dir === "left") {
        left.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        right.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    } else {
        right.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        left.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    }

    return { seq, seek };
}

function clook(req, head, dir) {
    let seek = 0, seq = [head];
    let left = req.filter(r => r < head).sort((a,b)=>a-b);
    let right = req.filter(r => r >= head).sort((a,b)=>a-b);

    if (dir === "right") {
        right.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        if (left.length > 0) {
            seek += Math.abs(head - left[0]);
            head = left[0];
            seq.push(head);
        }
        left.forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    } else {
        left.reverse().forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
        if (right.length > 0) {
            seek += Math.abs(head - right[right.length - 1]);
            head = right[right.length - 1];
            seq.push(head);
        }
        right.reverse().forEach(r => { seek += Math.abs(head - r); head = r; seq.push(head); });
    }

    return { seq, seek };
}

function calculate() {
    let req = document.getElementById("requests").value.split(',').map(x => parseInt(x.trim()));
    let head = parseInt(document.getElementById("head").value);
    let diskSize = parseInt(document.getElementById("diskSize").value);
    let dir = document.getElementById("direction").value;
    let algo = document.getElementById("algo").value;

    if (req.some(isNaN) || isNaN(head)) {
        alert("Enter valid inputs!");
        return;
    }

    let result;

    switch(algo) {
        case "FCFS": result = fcfs(req, head); break;
        case "SSTF": result = sstf(req, head); break;
        case "SCAN": result = scan(req, head, diskSize, dir); break;
        case "C-SCAN": result = cscan(req, head, diskSize, dir); break;
        case "LOOK": result = look(req, head, dir); break;
        case "C-LOOK": result = clook(req, head, dir); break;
    }

    document.getElementById("sequence").innerText = result.seq.join(" → ");
    document.getElementById("seek").innerText = result.seek;
}
// 🔥 Handle algorithm button selection
let selectedAlgo = "FCFS";

document.querySelectorAll(".algo-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".algo-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedAlgo = btn.dataset.algo;

        document.getElementById("currentAlgoLabel").innerText = selectedAlgo;
    });
});

// 🔥 Run Simulation Button
document.getElementById("simulateBtn").addEventListener("click", () => {

    let req = document.getElementById("requestQueue").value
        .split(',')
        .map(x => parseInt(x.trim()));

    let head = parseInt(document.getElementById("initialHead").value);
    let diskSize = parseInt(document.getElementById("diskSize").value);
    let dir = document.getElementById("direction").value;

    if (req.some(isNaN) || isNaN(head)) {
        alert("Enter valid inputs!");
        return;
    }

    let result;

    switch(selectedAlgo) {
        case "FCFS": result = fcfs(req, head); break;
        case "SSTF": result = sstf(req, head); break;
        case "SCAN": result = scan(req, head, diskSize, dir); break;
        case "C-SCAN": result = cscan(req, head, diskSize, dir); break;
        case "LOOK": result = look(req, head, dir); break;
        case "C-LOOK": result = clook(req, head, dir); break;
    }

    // 🔥 Update stats
    document.getElementById("totalSeekTime").innerText = result.seek;
    document.getElementById("avgSeekTime").innerText = (result.seek / req.length).toFixed(2);

    // 🔥 Fill table
    let tableBody = document.getElementById("resultsTableBody");
    tableBody.innerHTML = "";

    for (let i = 0; i < result.seq.length - 1; i++) {
        let from = result.seq[i];
        let to = result.seq[i + 1];
        let dist = Math.abs(from - to);

        tableBody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${from}</td>
                <td>${to}</td>
                <td>${dist}</td>
                <td><span class="badge">Moved</span></td>
            </tr>
        `;
    }

    // 🔥 Chart Visualization
    const ctx = document.getElementById("headMovementChart").getContext("2d");

    if (window.chart) {
        window.chart.destroy();
    }

    window.chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: result.seq.map((_, i) => i),
            datasets: [{
                label: "Head Movement",
                data: result.seq,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Step" }},
                y: { title: { display: true, text: "Track Position" }}
            }
        }
    });
});