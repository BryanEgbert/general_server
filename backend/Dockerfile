FROM python:3.11-alpine3.18

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN wget https://github.com/BryanEgbert/sentiment140_ml/releases/download/v1.0/rf_v1.2_dill.joblib
RUN pip install -U -r requirements.txt

ENV env=prod

CMD ["uvicorn", "main:app", "--root-path", "/api/v1"]