from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import redis



def setup_rate_limiter(app):
    try:
        limiter = Limiter(
            get_remote_address,
            app=app,
            default_limits=["50 per hour"],
            storage_uri=f"redis://localhost:6379/0"
        )
        limiter.init_app(app)
        return limiter
    except redis.ConnectionError as e:
        app.logger.error("Redis connection failed. Rate limiting disabled")