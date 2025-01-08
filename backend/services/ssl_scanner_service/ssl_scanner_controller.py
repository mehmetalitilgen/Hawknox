import ssl
import socket
from datetime import datetime

def ssl_scan_controller(data):
    hostname = data["domain"]
    port = 443
    context = ssl.create_default_context()
   

    server_info = {}

    try:
        with socket.create_connection((hostname, port), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()

                server_info["subject"] = dict(x[0] for x in cert["subject"])
                server_info["issuer"] = dict(x[0] for x in cert["issuer"])

                not_before_str = cert["notBefore"]
                not_after_str = cert["notAfter"]

                nb = datetime.strptime(not_before_str, "%b %d %H:%M:%S %Y %Z")
                na = datetime.strptime(not_after_str, "%b %d %H:%M:%S %Y %Z")
                server_info["not_before"] = nb
                server_info["not_after"] = na

                server_info["days_until_expiry"] = (na - datetime.utcnow()).days

               
                if "subjectAltName" in cert:
                    san_entries = [entry[1] for entry in cert["subjectAltName"] if entry[0] == "DNS"]
                    server_info["subject_alt_name"] = san_entries

                server_info["tls_version"] = ssock.version()

            
                server_info["cipher"] = ssock.cipher()
    
        return server_info

    except Exception as e:
        print(f"Hata oluştu: {e}")
        return None
