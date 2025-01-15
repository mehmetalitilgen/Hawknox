from flask import Flask
from flask_cors import CORS
from middlewares.rate_limiter import setup_rate_limiter
from middlewares.logger import log_middleware
from routes.gateway_routes import gateway

app = Flask(__name__)

# CORS eklenmesi (React uygulamasına izin verme)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

setup_rate_limiter(app)

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return log_middleware(response)

app.register_blueprint(gateway)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
