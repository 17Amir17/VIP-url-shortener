import { errorToast } from './toast';
import Chart from 'chart.js/auto';

const resultsSection = document.querySelector('#results');
const urlElem = document.querySelector('.url');
const shortElem = document.querySelector('.short');
const clicksElem = document.querySelector('.clicks');
const createdElem = document.querySelector('.created');
const lastClickElem = document.querySelector('.last');
const chartCanvasElem = document.querySelector('.chart-canvas');
const deleteBtn = document.querySelector('#delete-btn');
let currentChart;

export function displayAnalytics(data) {
  try {
    hideResults();
    urlElem.innerText = data.url;
    urlElem.href = data.url;
    shortElem.innerText = data.shortened;
    shortElem.href = data.shortened;
    clicksElem.innerText = data.clicks;
    createdElem.innerText = data.date;
    lastClickElem.innerText = data.lastClicked || 'Never';
    deleteBtn.dataset.id = data._id;
    showGraph(data.clickDates);
    showResults();
  } catch (error) {
    errorToast('Something went wrong');
  }
}

function showResults() {
  resultsSection.hidden = false;
  resultsSection.classList.remove('hidden');
}

export function hideResults() {
  resultsSection.hidden = true;
  resultsSection.classList.add('hidden');
  if (currentChart) {
    currentChart.destroy();
    currentChart = undefined;
  }
}

function showGraph(rawData) {
  if (!rawData) {
    chartCanvasElem.hidden = true;
    return;
  }
  chartCanvasElem.hidden = false;
  const graphData = JSON.parse(rawData);
  currentChart = createGraph(graphData);
}

function createGraph(graphData) {
  const labels = Object.keys(graphData).slice(-14); //Only want last 14
  const dataSliced = Object.values(graphData).slice(-14);
  const colors = getColors(Object.keys(graphData).length);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Clicks Per Day (dates without click are not included)',
        data: dataSliced,
        backgroundColor: colors.backC,
        borderColor: colors.borderC,
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    },
  };
  return new Chart(chartCanvasElem, config);
}

function getColors(len) {
  console.log(len);
  const colors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
  ];
  const borderColors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
  ];
  const backC = [];
  const borderC = [];
  let colIndex = 0;
  for (let i = 0; i < len; i++) {
    if (colIndex >= colors.length) colIndex = 0;
    backC.push(colors[colIndex]);
    borderC.push(borderColors[colIndex]);
    colIndex += 1;
  }
  return { backC, borderC };
}
