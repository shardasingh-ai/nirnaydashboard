// Function to fetch data based on SID
function getStudentData() {
  const sid = document.getElementById('sidInput').value;
  
  if (!sid) {
    alert('Please enter a SID');
    return;
  }

  // Sending SID to the backend
  fetch(`https://your-backend-url.onrender.com/student-dashboard/${sid}`)
    .then(response => response.json())
    .then(data => {
      // Display student data
      if (data && data.sid) {
        document.getElementById('studentData').style.display = 'block';
        document.getElementById('sidDisplay').innerText = `Student SID: ${data.sid}`;

        // Display chart for student activity (for example, time spent)
        renderChart(data);
      } else {
        alert('No data found for this SID');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    });
}

// Function to render student activity chart (using Chart.js)
function renderChart(data) {
  const ctx = document.getElementById('activityChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.activities.map(activity => activity.name),
      datasets: [{
        label: 'Time Spent',
        data: data.activities.map(activity => activity.timeSpent),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
