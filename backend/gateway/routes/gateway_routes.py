from flask import Blueprint, request, jsonify
import requests

gateway = Blueprint("gateway",__name__)

SERVICES = {
    "directory_scanner": "http://directory_scanner_service:5007",
    "dns_scanner": "http://dns_scanner_service:5004",
    "js_file_scanner": "http://js_file_scanner_service:5006",
    "port_scanner": "http://port_scanner_service:5003",
    "ssl_scanner": "http://ssl_scanner_service:5002",
    "whois_scanner": "http://whois_scanner_service:5005"
}


@gateway.route("/health-check",methods=["GET"])
def health_check():
    return jsonify({"status": "API Gateway is healthy!"}), 200


@gateway.route("/directory-scan",methods=['POST'])
def directory_scan():
    try:
        data = request.get_json()
        response = requests.post(f"{SERVICES['directory_scanner']}/directory-scan")
        return jsonify(response.json()),response.status_code
    except Exception as e:
        return jsonify({"error":str(e)}),500
    

@gateway.route('/dns-scan', methods=['POST'])
def dns_scan():
    try:
        data = request.get_json()
        response = requests.post(f"{SERVICES['dns_scanner']}/dns-scan", json=data)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@gateway.route('/js-file-scan', methods=['POST'])
def js_file_scan():
    try:
        data = request.get_json()
        response = requests.post(f"{SERVICES['js_file_scanner']}/js-file-scan", json=data)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@gateway.route('/port-scan', methods=['POST'])
def port_scan():
    try:
        data = request.get_json()
        response = requests.post(f"{SERVICES['port_scanner']}/port-scan", json=data)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@gateway.route('/ssl-scan', methods=['POST'])
def ssl_scan():
    try:
        data = request.get_json()
        response = requests.post(f"{SERVICES['ssl_scanner']}/ssl-scan", json=data)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@gateway.route('/whois-scan', methods=['POST'])
def whois_scan():
    try:
        data = request.get_json()
        response = requests.post(f"{SERVICES['whois_scanner']}/whois-scan", json=data)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500