from flask import Flask, request, jsonify
from dns_scanner_controller import dns_scan_controller

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def dns_scanner_health_check():
    return jsonify({"status": "DNS Scanner Service is running"}), 200

@app.route("/dns-scan", methods=["POST"])
def scan_dns():
    data = request.get_json()
    scan_results = dns_scan_controller(data)
    return scan_results

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004, debug=True)
