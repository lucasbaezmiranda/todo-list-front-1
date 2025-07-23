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
  const steps = 37;
  const xValues = Array.from({ length: steps + 1 }, (_, i) => i * (4 * Math.PI / steps));
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

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value, index, values) {
            const tickVal = this.getLabelForValue(value);
            const frac = tickVal / Math.PI;
            if (Number.isInteger(frac * 4) || Math.abs(frac * 4 - Math.round(frac * 4)) < 0.01) {
              const n = Math.round(frac * 4) / 4;
              if (n === 0) return '0';
              if (n === 1) return 'π';
              return `${n}\u03C0`; // π unicode
            }
            return '';
          }
        },
        title: {
          display: true,
          text: 'x'
        }
      },
      y: {
        title: {
          display: true,
          text: 'y = sin(x)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const x = context.label;
            const y = context.parsed.y;
            return `(${x.toFixed(2)}, ${y.toFixed(1)})`;
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '2rem auto' }}>
      <Line data={data} options={options} />
    </div>
  );
}
