import { useState } from 'react';

const FEATURES = [
  { key: 'nitrogen', label: 'Nitrogen (N)', min: 0, max: 140, step: 1, unit: 'kg/ha', desc: 'Nitrogen content in soil' },
  { key: 'phosphorus', label: 'Phosphorus (P)', min: 5, max: 145, step: 1, unit: 'kg/ha', desc: 'Phosphorus content in soil' },
  { key: 'potassium', label: 'Potassium (K)', min: 5, max: 205, step: 1, unit: 'kg/ha', desc: 'Potassium content in soil' },
  { key: 'temperature', label: 'Temperature', min: 8.83, max: 43.68, step: 0.01, unit: '\u00b0C', desc: 'Temperature in Celsius' },
  { key: 'humidity', label: 'Humidity', min: 14.26, max: 99.98, step: 0.01, unit: '%', desc: 'Relative humidity' },
  { key: 'ph_value', label: 'pH Value', min: 3.50, max: 9.94, step: 0.01, unit: '', desc: 'Soil pH value' },
  { key: 'rainfall', label: 'Rainfall', min: 20.21, max: 298.56, step: 0.01, unit: 'mm', desc: 'Rainfall in mm' },
];

const DEFAULT_VALUES = {
  nitrogen: 90,
  phosphorus: 42,
  potassium: 43,
  temperature: 20.88,
  humidity: 82.0,
  ph_value: 6.5,
  rainfall: 202.94,
};

export default function PredictionForm({ onPredict, onReset, loading }) {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value === '' ? '' : parseFloat(value) || value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(values);
  };

  const handleReset = () => {
    setValues(DEFAULT_VALUES);
    onReset();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h5 className="card-title mb-4">Enter Soil & Weather Conditions</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {FEATURES.map((f) => (
              <div className="col-md-6" key={f.key}>
                <label className="form-label fw-semibold">{f.label}</label>
                <input
                  type="number"
                  className="form-control"
                  value={values[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  required
                />
                <input
                  type="range"
                  className="form-range mt-1"
                  value={values[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                />
                <small className="text-muted">
                  {f.desc} ({f.min} - {f.max} {f.unit})
                </small>
              </div>
            ))}
          </div>
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-success btn-lg px-4" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Predicting...
                </>
              ) : (
                'Predict Crop'
              )}
            </button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={handleReset} disabled={loading}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
