from quart import Quart, jsonify, request
from port_scanner_controller import scan_port_controller_async

app = Quart(__name__)

@app.route('/health', methods=['GET'])
def port_scanner_health_check():
    return jsonify({"status": "Port Scanner Service is running"}), 200

@app.route("/port-scan", methods=["POST"])
async def scan_port():
    data = await request.get_json()
    result = await scan_port_controller_async(data)  
    return jsonify({"Port": result}), 202

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5003, debug=True)
