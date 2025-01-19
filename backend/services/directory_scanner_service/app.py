from flask import Flask, request, jsonify
from directory_scanner_controller import directory_scan_controller

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def directory_scanner_health_check():
    return jsonify({"status": "DNS Scanner Service is running"}), 200

@app.route("/directory-scan", methods=["POST"])
def scan_directory():
    data = request.get_json()
    scan_results = directory_scan_controller(data)
    return jsonify(scan_results), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5007, debug=True)
