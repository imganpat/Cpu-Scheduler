const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const processes = document.getElementById("processes").value;
    const processesArray = processes.split(" ");

    const arivalTime = document.getElementById("arival-time").value;
    const arivalTimeArray = arivalTime.split(" ");

    const burstTime = document.getElementById("burst-time").value;
    const burstTimeArray = burstTime.split(" ");

    let ProcessObject = new Object();

    ProcessObject.name = processesArray;
    ProcessObject.arivalTime = arivalTimeArray;
    ProcessObject.burstTime = burstTimeArray;

    const algorithm = document.getElementById("algorithm").value;

    switch (algorithm) {
        case "fcfs":
            fcfs(ProcessObject.name, ProcessObject.arivalTime, ProcessObject.burstTime)
            break;
    }

})

function printTable(processName, processAT, processBT, processCT, processTAT, processWT, averageTAT, averageWT) {
    const resultTable = document.querySelectorAll(".visible");
    Array.from(resultTable);
    resultTable.forEach(element => {
        element.classList.remove("hidden");
    });
    const table = document.getElementById("result");
    table.innerHTML = "";
    const headings = `<tr>
                        <th> Process </th>
                        <th> Arival Time </th>
                        <th> Burst Time </th>
                        <th> Completion Time </th>
                        <th> Turn Around Time </th>
                        <th> Waiting Time </th>
                    </tr>`
    table.innerHTML += headings;

    for (let i = 0; i < processName.length; i++) {
        let data = `<tr> 
                        <td>${processName[i]}</td> 
                        <td>${processAT[i]}</td>
                        <td>${processBT[i]}</td>
                        <td>${processCT[i]}</td>
                        <td>${processTAT[i]}</td>
                        <td>${processWT[i]}</td>
                    </tr>`;
        table.innerHTML += data;
    }
    const average = `<tr> 
                        <td colspan="4"> Average </td>
                        <td>${averageTAT}</td>
                        <td>${averageWT}</td>
                    </tr>`
    table.innerHTML += average;

}

function printGanttChart(processName, processAT, processBT) {
    const gantChart = document.querySelector('.gantt-chart-container');
    gantChart.innerHTML = "";
    let timeArray = [];
    let time = parseInt(processAT[0]);
    for (let i = 0; i < processName.length; i++) {
        processBT[i] = parseInt(processBT[i]);
        const box = document.createElement('div');
        if (i === 0)
            box.setAttribute('data-content2', processAT[0]);
        time += processBT[i]
        timeArray[i] = time;
        box.setAttribute('data-content', time);
        box.setAttribute('class', 'gantt-process');
        box.innerText = processName[i];
        gantChart.appendChild(box);
    }
    return timeArray;
}



function fcfs(processName, processAT, processBT) {
    let processCT;
    let processTAT = [];
    let processWT = [];

    let indices = processAT.map((at, index) => index);
    indices.sort((a, b) => processAT[a] - processAT[b]);

    processName = indices.map(index => processName[index]);
    processAT = indices.map(index => processAT[index]);
    processBT = indices.map(index => processBT[index]);

    //prints the gantt chart as well as counts the complete time  
    processCT = printGanttChart(processName, processAT, processBT);

    let totalTAT = 0;
    let totalWT = 0;
    for (let i = 0; i < processName.length; i++) {
        processTAT[i] = processCT[i] - processAT[i];
        totalTAT += processTAT[i];
        processWT[i] = processTAT[i] - processBT[i];
        totalWT += processWT[i];
    }

    let averageTAT = totalTAT / processTAT.length;
    let averageWT = totalWT / processWT.length;

    averageTAT = averageTAT.toFixed(2);
    averageWT = averageWT.toFixed(2);

    printTable(processName, processAT, processBT, processCT, processTAT, processWT, averageTAT, averageWT, averageTAT, averageWT)

}

