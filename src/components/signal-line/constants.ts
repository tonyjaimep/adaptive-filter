export const colors = {
  source: "blue",
  noisy: "hsl(80deg, 70%, 40%)",
  smooth: "orangered",
};

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
      borderColor: colors.source,
      borderWidth: 1,
    },
  },
} as const;
