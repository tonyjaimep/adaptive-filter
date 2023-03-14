import { Line } from "react-chartjs-2";
import { options } from "./constants";

export const SignalLine = ({ data }: { data: number[] }) => {
  const lineData = {
    labels: Object.keys(data),
    datasets: [{ label: "Signal", data, borderColor: "blue" }],
  };

  return <Line data={lineData} options={options} />;
};
