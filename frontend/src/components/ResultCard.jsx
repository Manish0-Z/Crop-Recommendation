const CROP_INFO = {
  Apple: { emoji: '🍎', color: '#e74c3c', season: 'Winter', water: 'Low' },
  Banana: { emoji: '🍌', color: '#f1c40f', season: 'Year-round', water: 'High' },
  Blackgram: { emoji: '🫘', color: '#2c3e50', season: 'Kharif', water: 'Moderate' },
  ChickPea: { emoji: '🫛', color: '#d4a574', season: 'Rabi', water: 'Low' },
  Coconut: { emoji: '🥥', color: '#8b4513', season: 'Year-round', water: 'High' },
  Coffee: { emoji: '☕', color: '#6f4e37', season: 'Monsoon', water: 'Moderate' },
  Cotton: { emoji: '🧵', color: '#ecf0f1', season: 'Kharif', water: 'Moderate' },
  Grapes: { emoji: '🍇', color: '#8e44ad', season: 'Winter', water: 'Low' },
  Jute: { emoji: '🌿', color: '#27ae60', season: 'Kharif', water: 'High' },
  KidneyBeans: { emoji: '🫘', color: '#c0392b', season: 'Kharif', water: 'Moderate' },
  Lentil: { emoji: '🫘', color: '#e67e22', season: 'Rabi', water: 'Low' },
  Maize: { emoji: '🌽', color: '#f39c12', season: 'Kharif', water: 'Moderate' },
  Mango: { emoji: '🥭', color: '#f1c40f', season: 'Summer', water: 'Moderate' },
  MothBeans: { emoji: '🫘', color: '#d35400', season: 'Kharif', water: 'Low' },
  MungBean: { emoji: '🫘', color: '#2ecc71', season: 'Kharif', water: 'Moderate' },
  Muskmelon: { emoji: '🍈', color: '#f39c12', season: 'Summer', water: 'High' },
  Orange: { emoji: '🍊', color: '#e67e22', season: 'Winter', water: 'Moderate' },
  Papaya: { emoji: '🍈', color: '#f1c40f', season: 'Year-round', water: 'High' },
  PigeonPeas: { emoji: '🫘', color: '#8bc34a', season: 'Kharif', water: 'Moderate' },
  Pomegranate: { emoji: '🍎', color: '#c0392b', season: 'Winter', water: 'Low' },
  Rice: { emoji: '🌾', color: '#27ae60', season: 'Kharif', water: 'Very High' },
  Watermelon: { emoji: '🍉', color: '#27ae60', season: 'Summer', water: 'High' },
};

export default function ResultCard({ crop }) {
  const info = CROP_INFO[crop] || { emoji: '🌱', color: '#27ae60', season: 'N/A', water: 'N/A' };

  return (
    <div className="card mt-3 border-0 shadow result-card">
      <div className="card-body text-center p-4">
        <div className="crop-emoji mb-3">{info.emoji}</div>
        <h6 className="text-muted mb-1">Recommended Crop</h6>
        <h2 className="crop-name mb-3" style={{ color: info.color }}>
          {crop}
        </h2>
        <div className="d-flex justify-content-center gap-4">
          <div className="info-badge">
            <span className="badge bg-light text-dark">Season: {info.season}</span>
          </div>
          <div className="info-badge">
            <span className="badge bg-light text-dark">Water: {info.water}</span>
          </div>
        </div>
        <p className="text-muted mt-3 mb-0">
          Based on your soil and weather conditions, we recommend growing <strong>{crop}</strong>.
        </p>
      </div>
    </div>
  );
}
