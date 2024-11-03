const ctx1 = document.getElementById('chart1').getContext('2d');
const ctx2 = document.getElementById('chart2').getContext('2d');
const ctx3 = document.getElementById('chart3').getContext('2d');
const ctx4 = document.getElementById('chart4').getContext('2d');
const ctx5 = document.getElementById('chart5').getContext('2d');

function Gradient(ctx) {
    let gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradient.addColorStop(0, "#A7C6ED");
    gradient.addColorStop(1, "#6EC6F5");
    return gradient;
}

let chart1 = new Chart(ctx1, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: 'Real-Time User Engagement',
            data: [],
            backgroundColor: 'rgba(0, 198, 255, 0.5)',
            borderColor: '#6EC6F5',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 15
            }
        }
    }
});

let chart2 = new Chart(ctx2, {
    type: "pie",
    data: {
        labels: ['New Users', 'Returning Users', 'Guests'],
        datasets: [{
            label: 'User Types',
            data: [40, 35, 25],
            backgroundColor: [
                "#A7C6ED",
                "#A1C8E6",
                "#6EC6F5"
            ]
        }]
    },
    options: {
        responsive: true
    }
});

let chart3 = new Chart(ctx3, {
    type: "doughnut",
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'User Likes',
            data: [62, 50, 30, 81, 33, 44, 40],
            backgroundColor: [
                "#A7C6ED",
                "#A1C8E6",
                "#9BC9E1",
                "#95CBE2",
                "#8FD2E5",
                "#6EC6F5",
                "#5DBEF1"
            ]
        }]
    },
    options: {
        responsive: true
    }
});

let chart4 = new Chart(ctx4, {
    type: "bubble",
    data: {
        datasets: [
            {
                label: 'User Interaction Stats',
                data: [],
                backgroundColor: 'rgba(0, 198, 255, 0.5)',
                borderColor: 'rgba(0, 198, 255, 0)'
            }
        ]
    },
    options: {
        responsive: true,
       
    }
});

let chart5 = new Chart(ctx5, {
    type: "bar",
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Monthly Logins',
            data: [65, 59, 80, 81, 56, 55, 90],
            backgroundColor: Gradient(ctx5),
            borderRadius: 15
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const socket = io('https://data.gdscnsut.com');
let bubbleChartIndex = 0;

socket.on('random_number', function (data) {
    const timestamp = new Date().toLocaleTimeString();
    chart1.data.labels.push(timestamp);
    chart1.data.datasets[0].data.push(data.number);
    if (chart1.data.labels.length > 10) {
        chart1.data.labels.shift();
        chart1.data.datasets[0].data.shift();
    }
    chart1.update();
    document.getElementById('userStats1').innerText = `Users Online: ${data.number}`;
    chart4.data.datasets[0].data.push({ x: bubbleChartIndex++, y: data.number, r: 10 });
    if (chart4.data.datasets[0].data.length > 10) {
        chart4.data.datasets[0].data.shift();
    }
    chart4.update();
});

function updateDailyStats() {
    const totalUsers = Math.floor(Math.random() * 1000);
    const newSignups = Math.floor(Math.random() * 50);
    const activeSessions = Math.floor(Math.random() * 300);
    document.getElementById('userStats2').innerText = `Total Users: ${totalUsers}`;
    document.getElementById('userStats3').innerText = `New Signups Today: ${newSignups}`;
    document.getElementById('userStats4').innerText = `Active Sessions: ${activeSessions}`;
}

updateDailyStats();
setInterval(updateDailyStats, 24 * 60 * 60 * 1000);
