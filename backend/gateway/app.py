from flask import Flask
from middlewares.rate_limiter import setup_rate_limiter
from middlewares.logger import log_middleware

from routes.gateway_routes import gateway

app = Flask(__name__)

setup_rate_limiter(app)


@app.after_request
def after_request(response):
    return log_middleware(response)


app.register_blueprint(gateway)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug="DEBUG")
