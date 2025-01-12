from flask import Flask
from middlewares.rate_limiter import setup_rate_limiter


app = Flask(__name__)

setup_rate_limiter(app)

@app.before_request
def before_request():
    pass

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug="DEBUG")
