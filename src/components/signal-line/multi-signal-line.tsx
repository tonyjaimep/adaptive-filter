import { Line } from "react-chartjs-2";
import { options } from "./constants";

export const MultiSignalLine = ({
  data,
  colors,
}: {
  data: number[][];
  colors: string[];
}) => {
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
