import { Line } from "react-chartjs-2";
import { options } from "./constants";

const colors = ["#FF8360", "#A52422", "#88A"];

export const MultiSignalLine = ({ data }: { data: number[][] }) => {
  const lineData = {
    labels: Object.keys(data[0]),
    datasets: data.map((signal, index) => ({
      label: `Signal ${index}`,
      data: signal,
      borderColor: colors[index],
    })),
  };

  return <Line data={lineData} options={options} />;
};
