from flask import Flask, request, jsonify
from ssl_scanner_controller import ssl_scan_controller


app = Flask(__name__)

@app.route('/health', methods=['GET'])
def ssl_scanner_health_check():
    return jsonify({"status": "SSL Scanner Service is running"}), 200

@app.route("/ssl-scan", methods=["POST"])
def scan_ssl():
    data = request.get_json()
    scan_results = ssl_scan_controller(data)  # Capture the returned results
    return jsonify(scan_results)  # Return the results as JSON

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)
