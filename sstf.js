function sstf(requests, head) {
    let seek = 0;
    let sequence = [head];
    let visited = Array(requests.length).fill(false);

    for (let i = 0; i < requests.length; i++) {
        let min = Infinity, index = -1;

        for (let j = 0; j < requests.length; j++) {
            if (!visited[j]) {
                let dist = Math.abs(head - requests[j]);
                if (dist < min) {
                    min = dist;
                    index = j;
                }
            }
        }

        visited[index] = true;
        seek += min;
        head = requests[index];
        sequence.push(head);
    }

    return { sequence, seek };
}