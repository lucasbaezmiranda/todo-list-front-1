import { useState } from 'react';

export default function PlotGenerator() {
  const [A1, setA1] = useState(1);
  const [f1, setF1] = useState(1);
  const [A2, setA2] = useState(1);
  const [f2, setF2] = useState(1);
  const [plotUrl, setPlotUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePlot = async () => {
    setLoading(true);
    setPlotUrl(null);
    try {
      const res = await fetch('https://todo-back-5-env.eba-cnzsv9hp.us-east-1.elasticbeanstalk.com/plot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ A1, f1, A2, f2 })
      });
      const data = await res.json();
      setPlotUrl(data.url);
    } catch (err) {
      console.error("Error al generar gráfico:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Generador de Gráficos Senoidales</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <input type="number" step="0.1" value={A1} onChange={e => setA1(Number(e.target.value))} placeholder="Amplitud 1" />
        <input type="number" step="0.1" value={f1} onChange={e => setF1(Number(e.target.value))} placeholder="Frecuencia 1" />
        <input type="number" step="0.1" value={A2} onChange={e => setA2(Number(e.target.value))} placeholder="Amplitud 2" />
        <input type="number" step="0.1" value={f2} onChange={e => setF2(Number(e.target.value))} placeholder="Frecuencia 2" />
      </div>
      <button onClick={handlePlot} disabled={loading}>
        {loading ? 'Generando...' : 'Graficar'}
      </button>

      {plotUrl && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Resultado</h3>
          <iframe
            src={plotUrl}
            title="Gráfico Plotly"
            width="100%"
            height="500px"
            style={{ border: '1px solid #888', borderRadius: '4px' }}
          />
        </div>
      )}
    </div>
  );
}
