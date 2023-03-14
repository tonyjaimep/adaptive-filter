export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      suggestedMin: -1,
      suggestedMax: 1,
    },
  },
  animation: {
    duration: 0,
  },
  elements: {
    point: {
      pointStyle: false,
    },
    line: {
      borderColor: "blue",
      borderWidth: 2,
    },
  },
} as const;
