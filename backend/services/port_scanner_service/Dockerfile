FROM python:3.9-slim

WORKDIR /app

COPY ./backend/services/port_scanner_service /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5003

CMD ["python", "app.py"]
