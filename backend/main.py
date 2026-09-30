import numpy as np
import pickle
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "crop_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

app = FastAPI(title="Crop Recommendation API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
scaler = None
label_encoder = None


@app.on_event("startup")
def load_models():
    global model, scaler, label_encoder
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    with open(ENCODER_PATH, "rb") as f:
        label_encoder = pickle.load(f)
    print("Models loaded successfully!")


class CropRequest(BaseModel):
    nitrogen: float = Field(..., ge=0, le=140, description="Nitrogen content in soil (0-140)")
    phosphorus: float = Field(..., ge=5, le=145, description="Phosphorus content in soil (5-145)")
    potassium: float = Field(..., ge=5, le=205, description="Potassium content in soil (5-205)")
    temperature: float = Field(..., ge=8.83, le=43.68, description="Temperature in Celsius (8.83-43.68)")
    humidity: float = Field(..., ge=14.26, le=99.98, description="Relative humidity (14.26-99.98)")
    ph_value: float = Field(..., ge=3.50, le=9.94, description="Soil pH value (3.50-9.94)")
    rainfall: float = Field(..., ge=20.21, le=298.56, description="Rainfall in mm (20.21-298.56)")


class CropResponse(BaseModel):
    predicted_crop: str


@app.get("/")
def health_check():
    return {"status": "healthy", "message": "Crop Recommendation API"}


@app.post("/predict", response_model=CropResponse)
def predict_crop(request: CropRequest):
    if model is None or scaler is None or label_encoder is None:
        raise HTTPException(status_code=500, detail="Models not loaded")

    features = np.array([[
        request.nitrogen,
        request.phosphorus,
        request.potassium,
        request.temperature,
        request.humidity,
        request.ph_value,
        request.rainfall,
    ]])

    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)
    crop_name = label_encoder.inverse_transform(prediction)[0]

    return CropResponse(predicted_crop=crop_name)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
