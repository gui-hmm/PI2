fetch("./oscar_age_female.csv")
  .then(response => response.text())
  .then(result =>  {let data = parseCSV(result);
    createChart("actressesChart", data, "oscar", "black");
    console.log(result);
  });

  fetch("./oscar_age_male.csv")
  .then(response => response.text())
  .then(result =>  {let data = parseCSV(result);
    createChart("actorsChart", data, "oscar", "blue");
    console.log(result);
  });

  
    function parseCSV(csvData) {
      const lines = csvData.split("\n");
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",");
        data.push({
            name: parts[3],
            age: parseInt(parts[2])
        });
      }
      return data;
    }

   
    function createChart(canvasId, data, label, backgroundColor) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.name),
          datasets: [{
            label: label,
            data: data.map(item => item.age),
            backgroundColor: backgroundColor,
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

  
    fetch('actresses.csv')
      .then(response => response.text())
      .then(data => {
        const actressesData = parseCSV(data);
        createChart('actressesChart', actressesData, 'Atrizes', 'rgba(255, 99, 132, 0.7)');
      });

    fetch('actors.csv')
      .then(response => response.text())
      .then(data => {
        const actorsData = parseCSV(data);
        createChart('actorsChart', actorsData, 'Atores', 'rgba(54, 162, 235, 0.7)');
      });

    
    Promise.all([
      fetch('oscar_age_female.csv').then(response => response.text()),
      fetch('oscar_age_male.csv').then(response => response.text())
    ]).then(data => {
      const actressesData = parseCSV(data[0]);
      const actorsData = parseCSV(data[1]);

      const combinedData = {
        labels: actressesData.map(item => item.name),
        datasets: [
          {
            label: 'Atrizes',
            data: actressesData.map(item => item.age),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            yAxisID: 'y-axis-1',
          },
          {
            label: 'Atores',
            data: actorsData.map(item => item.age),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            yAxisID: 'y-axis-2',
          }
        ]
      };

      const ctx = document.getElementById('combinedChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: combinedData,
        options: {
          scales: {
            y: [
              {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Idade de Atrizes'
                }
              },
              {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Idade de Atores'
                }
              }
            ]
          }
        }
      });
    });
 