FROM python:3.11-alpine3.18

RUN apk update
RUN apk --no-cache add build-base
RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN wget https://github.com/BryanEgbert/sentiment140_ml/releases/download/v1.0/rf_v1.2_dill.joblib
RUN wget https://github.com/BryanEgbert/emotion_classification/releases/download/v1.1/lr_chain_v1.0.joblib
RUN pip install -U -r requirements.txt && pip uninstall -y pytest && pip uninstall -y httpx


CMD ["uvicorn", "main:app", "--root-path", "/api/v1", "--host", "0.0.0.0"]