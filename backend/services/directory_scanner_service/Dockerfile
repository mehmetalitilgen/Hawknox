FROM python:3.9-slim

WORKDIR /app

COPY ./backend/services/directory_scanner_service /app

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5007

RUN mkdir -p utils && touch utils/word_list.txt

CMD ["python", "app.py"]
