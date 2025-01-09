from flask import Flask, request, jsonify
from js_file_scanner_controller import js_file_scan_controller

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def js_file_scanner_health_check():
    return jsonify({"status": "DNS Scanner Service is running"}), 200

@app.route("/js-file-scan", methods=["POST"])
def scan_js_file():
    data = request.get_json()
    scan_results = js_file_scan_controller(data)
    return scan_results

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5006, debug=True)
