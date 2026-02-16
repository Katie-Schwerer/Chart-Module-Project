let width, height, gradient;

function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgb(54, 162, 235)');
        gradient.addColorStop(0.5, 'rgb(255, 205, 86)');
        gradient.addColorStop(1, 'rgb(255, 99, 132)');
    }

    return gradient;
}

Papa.parse('dataM.csv', {
    download: true,
    header: true,
    complete: function (results) {
        const labels = results.data.map(row => row['Ind Date Anchor']);
        const data = results.data.map(row => parseFloat(row['Ind Rate']))
        let chartOpen = $('#openTable');
        let tableOpened = false;
        let table = $('#chartTable');

        chartOpen.on('click', function () {
            console.log('Button clicked');
            if (!tableOpened) {
                tableOpened = true;
                table.empty();
                table.append('<tr><th>Ind Date Anchor</th><th>Ind Rate</th></tr>');
                results.data.forEach(row => {
                    table.append(`<tr><td>${row['Ind Date Anchor']}</td><td>${row['Ind Rate']}</td></tr>`);
                });
            } else {
                tableOpened = false;
                table.empty();
            }
        });

        let ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ind Rate',
                    data: data,
                    borderColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            // This case happens on initial chart load
                            return null;
                        }

                        return getGradient(ctx, chartArea);
                    },
                    pointHoverRadius: 20,
                    pointHoverBackgroundColor: "rgba(128, 128, 128, 1)",
                    pointHoverBorderColor: "rgba(128, 128, 128, 1)",
                    borderWidth: 3,
                    segment: {
                        borderWidth: (ctx) => {
                            return Math.round(ctx.p0.parsed.y * 1.25);
                        }
                    },
                    tension: 0.4,
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: "nearest",
                    axis: "x",
                    intersect: false,
                },
                elements: {
                    line: {
                        tension: 0.4,
                    },
                    point: {
                        radius: 0,
                        hoverRadius: 10,
                        hitRadius: 10,
                    }
                },
                scales: {
                    x: {
                        type: 'linear', // Required for stepSize on a numeric x-axis
                        ticks: {
                            stepSize: 5,
                            callback: function (value, index, ticks) {
                                return value.toString();
                            },
                        }
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                        }
                    },
                    tooltip: {
                        enabled: true,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return `Value: ${context.parsed.y}`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Line Chart with Gradient and Variable Thickness',
                        font: {
                            size: 18,
                        },
                        align: 'start',
                    },
                    subtitle: {
                        display: true,
                        text: 'Data Source: North Carolina Overdose Rates',
                        font: {
                            size: 14,
                        },
                        align: 'start',
                    }
                }
            },
        });


    },
});