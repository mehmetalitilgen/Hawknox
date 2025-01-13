# Python base image
FROM python:3.9-slim

WORKDIR /app

COPY ./backend/services/js_file_scanner_service /app

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5006

CMD ["python", "app.py"]
