import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "Crop_Recommendation.csv")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "crop_model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")
ENCODER_PATH = os.path.join(os.path.dirname(__file__), "label_encoder.pkl")

def main():
    print("Loading dataset...")
    cr = pd.read_csv(DATA_PATH)
    print(f"Dataset shape: {cr.shape}")
    print(f"Columns: {list(cr.columns)}")
    print(f"Missing values:\n{cr.isnull().sum()}\n")

    X = cr.drop("Crop", axis=1)
    y = cr["Crop"]

    print("Encoding labels...")
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    print(f"Classes ({len(label_encoder.classes_)}): {list(label_encoder.classes_)}\n")

    print("Splitting data (80/20)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )
    print(f"Train size: {X_train.shape[0]}, Test size: {X_test.shape[0]}\n")

    print("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    print("Training SVM (kernel=linear, C=1.0)...")
    svm_model = SVC(kernel="linear", C=1.0, random_state=42)
    svm_model.fit(X_train_scaled, y_train)

    y_pred = svm_model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nSVM Accuracy: {accuracy:.4f}")
    print(f"\nClassification Report:\n{classification_report(y_test, y_pred, target_names=label_encoder.classes_)}")

    print("Saving model, scaler, and encoder...")
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(svm_model, f)
    with open(SCALER_PATH, "wb") as f:
        pickle.dump(scaler, f)
    with open(ENCODER_PATH, "wb") as f:
        pickle.dump(label_encoder, f)

    print(f"\nSaved: {MODEL_PATH}")
    print(f"Saved: {SCALER_PATH}")
    print(f"Saved: {ENCODER_PATH}")
    print("\nDone!")

if __name__ == "__main__":
    main()
