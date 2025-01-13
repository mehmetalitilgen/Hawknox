from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import redis

def setup_rate_limiter(app):
    try:
        # Limiter başlatma (app parametresi olmadan)
        limiter = Limiter(
            key_func=get_remote_address,  # Client IP adresi ile limitleme
            default_limits=["50 per hour"],
            storage_uri="redis://redis:6379/0"
        )
        limiter.init_app(app)  # Flask uygulamasına Limiter'ı uygula
        return limiter
    except redis.ConnectionError as e:
        app.logger.error("Redis connection failed. Rate limiting disabled.")
        # Redis bağlantısı başarısızsa fallback limiti ayarla
        limiter = Limiter(
            key_func=get_remote_address,
            default_limits=["10 per minute"]
        )
        limiter.init_app(app)
        return limiter
