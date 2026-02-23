//getting elements and their ID's
const dataEntryForm = document.getElementById('data-entry-form');
const nameInput = document.getElementById('name');
const regNoInput = document.getElementById('regNo');
const catInput = document.getElementById('cat');
const examInput = document.getElementById('exam');
const resultsContainer = document.getElementById('results-container');

let students = []; //Array to store student data
let table; //Array to store table data

dataEntryForm.addEventListener('submit', function(event) {
    event.preventDefault(); //prevents page from reloading
    
    //acquiring values from inputs 
    const name = nameInput.value;
    const regNo = regNoInput.value;
    const cat = parseFloat(catInput.value);
    const exam = parseFloat(examInput.value);
    
    if (!name || !regNo || catInput.value === "" || examInput.value === "") {
        showNotification("Empty field detected");
        return;
    }//ensures there is no empty field

    if (cat < 0 || cat > 30) {
        showNotification("CAT marks must be between 0 and 30");
        return;
    }//validates mark ranges

    if (exam < 0 || exam > 70) {
        showNotification("Exam marks must be between 0 and 70");
        return;
    }//validates mark ranges

    //grade calculation  
    const total = cat + exam; 
    let grade;

    if (total >= 70 && total <= 100) grade = "A";
    else if (total >= 60) grade = "B";
    else if (total >= 50) grade = "C";
    else if (total >= 40) grade = "D";
    else  if (total>=0 && total<=39) grade = "Fail";
    else grade="Invalid Input";

    //student object
    const student = {
        name: name,
        regNo: regNo,
        cat: cat,
        exam: exam,
        grade: grade,
        total: total
    };
    
    students.push(student);//adding object to array
    createTable();//calling the funstion 
    showNotification("Student added successfully.");
    dataEntryForm.reset();//clears form input
});

function createTable() {
    resultsContainer.innerHTML = "";//clears container before creating new table

    table = document.createElement('table');

    if (students.length > 0) {
        const totalSum = students.reduce((sum, student) => sum + student.total, 0);
        const average = (totalSum / students.length).toFixed(2);
        const topStudent = students.reduce((top, current) => current.total > top.total ? current : top);

        const statsDiv = document.createElement("div");
        statsDiv.classList.add("stats"); // class name

        const averagePara = document.createElement("p");
        averagePara.innerHTML = "Class Average: <strong>" + average + "</strong>";

        const topPara = document.createElement("p");
        topPara.innerHTML = "Top Student: <strong>" + topStudent.name + " (" + topStudent.regNo + ") - " + topStudent.total + " marks</strong>";

        statsDiv.appendChild(averagePara);
        statsDiv.appendChild(topPara);
        resultsContainer.appendChild(statsDiv);
    }

    //creation of headers
    const headerRow = document.createElement('tr');
    const headers = ['Full Name', 'Reg No', 'Total Marks', 'Grade', 'Action'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    //creation of rows
    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        const regCell = document.createElement("td");
        regCell.textContent = student.regNo;
        const totalCell = document.createElement("td");
        totalCell.textContent = student.total;
        const gradeCell = document.createElement("td");
        gradeCell.textContent = student.grade;

        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            students.splice(index, 1);
            createTable();
            showNotification("Student deleted successfully.");
        });
        deleteBtn.classList.add("delete-btn");
        deleteCell.appendChild(deleteBtn);

        row.appendChild(nameCell);
        row.appendChild(regCell);
        row.appendChild(totalCell);
        row.appendChild(gradeCell);
        row.appendChild(deleteCell);

        table.appendChild(row);
    });

    resultsContainer.appendChild(table);//appends table to container
}

const banner = document.getElementById("banner-text");
let position = window.innerWidth; // start from the right side

function moveBanner() {
    position--; //decreases position by 1 pixel
    if (position < -banner.offsetWidth) {
        position = window.innerWidth; // reset to right
    }
    banner.style.position = "relative";
    banner.style.left = position + "px";
}

setInterval(moveBanner, 10); // update every 10ms

function showNotification(message, duration = 3000) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    // Hide after the duration
    setTimeout(() => {
        notification.classList.remove("show");
    }, duration);
}