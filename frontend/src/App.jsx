import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { predictCrop } from './api';
import './App.css';
import FeatureInfo from './components/FeatureInfo';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (features) => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await predictCrop(features);
      setPrediction(result.predicted_crop);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        const details = err.response.data.detail;
        if (Array.isArray(details)) {
          setError(details.map((d) => d.msg).join(', '));
        } else {
          setError(details);
        }
      } else {
        setError('Failed to connect to the server. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Crop Recommendation System</h1>
          <p>Enter your soil and weather conditions to get the best crop recommendation</p>
        </div>
      </header>

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <PredictionForm onPredict={handlePredict} onReset={handleReset} loading={loading} />
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {prediction && <ResultCard crop={prediction} />}
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            <FeatureInfo />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container text-center">
          <p>Crop Recommendation System | Powered by SVM Machine Learning</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
