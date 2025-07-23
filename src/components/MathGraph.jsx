import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

export default function MathGraph() {
  const xValues = Array.from({ length: 100 }, (_, i) => i / 10);
  const yValues = xValues.map(x => Math.sin(x));

  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'y = sin(x)',
        data: yValues,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Gráfico de función matemática</h2>
      <Line data={data} />
    </div>
  );
}
