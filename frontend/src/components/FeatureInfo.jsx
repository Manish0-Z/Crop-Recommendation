import { useState } from 'react';

const INFO = [
  {
    title: 'Nitrogen (N)',
    range: '0 - 140 kg/ha',
    desc: 'Essential for leaf growth and chlorophyll production. High nitrogen promotes vegetative growth. Cotton and jute require high nitrogen, while legumes fix their own.',
  },
  {
    title: 'Phosphorus (P)',
    range: '5 - 145 kg/ha',
    desc: 'Important for root development, flowering, and fruiting. Apple and grapes need high phosphorus. Most crops need moderate levels.',
  },
  {
    title: 'Potassium (K)',
    range: '5 - 205 kg/ha',
    desc: 'Regulates water uptake and disease resistance. Grapes and apple require very high potassium. Most cereals need moderate amounts.',
  },
  {
    title: 'Temperature',
    range: '8.83 - 43.68 \u00b0C',
    desc: 'Affects germination, growth rate, and yield. Rice and sugarcane prefer warm temperatures. Wheat and chickpea prefer cooler conditions.',
  },
  {
    title: 'Humidity',
    range: '14.26 - 99.98 %',
    desc: 'Relative humidity affects transpiration and disease risk. Coconut and muskmelon thrive in high humidity. Chickpea prefers dry conditions.',
  },
  {
    title: 'pH Value',
    range: '3.50 - 9.94',
    desc: 'Soil acidity/alkalinity affects nutrient availability. Most crops prefer pH 5.5-7.5. Apple prefers slightly acidic soil. Blackgram tolerates alkaline soil.',
  },
  {
    title: 'Rainfall',
    range: '20.21 - 298.56 mm',
    desc: 'Water availability is critical for crop growth. Rice requires very high rainfall. Muskmelon and mothbeans need minimal rainfall.',
  },
];

export default function FeatureInfo() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h5 className="card-title mb-3">About the Features</h5>
        <p className="text-muted mb-3">Click on a feature to learn more about what it means and its acceptable range.</p>
        <div className="accordion" id="featureAccordion">
          {INFO.map((item, i) => (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${openIndex !== i ? 'collapsed' : ''}`}
                  type="button"
                  onClick={() => toggle(i)}
                >
                  <span className="fw-semibold">{item.title}</span>
                  <span className="ms-auto badge bg-secondary">{item.range}</span>
                </button>
              </h2>
              <div className={`accordion-collapse collapse ${openIndex === i ? 'show' : ''}`}>
                <div className="accordion-body text-muted">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
