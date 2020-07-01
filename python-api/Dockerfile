FROM python:3

COPY /databases /app/databases

ENV CATBOT_DB_PATH /app/databases/

COPY python-api/requirements.txt /app/

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

COPY python-api /app

EXPOSE 8080

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0","--port", "8080"]

