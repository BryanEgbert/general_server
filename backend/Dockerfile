FROM python:3.11-bullseye

RUN apt-get update
RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN mkdir -p ml_models

RUN wget https://github.com/BryanEgbert/sentiment140_ml/releases/download/v1.0/rf_v1.2_dill.joblib -P ./ml_models
RUN wget https://github.com/BryanEgbert/emotion_classification/releases/download/v1.1/lr_chain_v1.0.joblib -P ./ml_models
RUN wget https://github.com/BryanEgbert/pet_bowl_cnn/releases/download/v1.0/pet_bowl_cnn.tflite -P ./ml_models

RUN pip install -U -r requirements.txt && pip uninstall -y pytest && pip uninstall -y httpx

CMD ["uvicorn", "main:app", "--root-path", "/api/v1", "--host", "0.0.0.0"]