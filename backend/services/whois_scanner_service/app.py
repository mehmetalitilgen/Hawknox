from flask import Flask, request, jsonify
from whois_scanner_controller import whois_scan_controller


app = Flask(__name__)

@app.route('/health', methods=['GET'])
def whois_scanner_health_check():
    return jsonify({"status": "SSL Scanner Service is running"}), 200

@app.route("/whois-scan", methods=["POST"])
def scan_whois():
    data = request.get_json()
    whois_results = whois_scan_controller(data)  
    return jsonify(whois_results) 

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5005, debug=True)
