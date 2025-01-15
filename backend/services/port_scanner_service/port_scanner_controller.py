import json
import asyncio

port_json = "utils/port_json.json"

# Tarama sonuçları her tarama için sıfırlanacak
async def scan_single_port(host, port, service_name):
    try:
        reader, writer = await asyncio.open_connection(host=host, port=port)
        writer.close()
        await writer.wait_closed() 
        return port, service_name  # Port açıksa, sonuç döndür
    except (asyncio.TimeoutError, ConnectionRefusedError):
        return None, None  # Port kapalıysa None döndür
    except Exception as e:
        print(f"An error occurred while scanning port {port}: {e}")
        return None, None

async def scan_port_controller_async(data):
    # Global dictionary kaldırıldı ve her taramada sıfırlama eklendi
    open_ports = {}  # Tarama öncesi açık portları sıfırla
    ports = read_json_file(port_json)
    if not ports:
        return {}

    tasks = []  

    for port_str, service_name in ports.items():
        port = int(port_str)
        tasks.append(scan_single_port(data["url"], port, service_name))

    # Asenkron taramayı başlat
    results = await asyncio.gather(*tasks) 

    for port, service_name in results:
        if port:
            open_ports[port] = service_name  # Açık portları ekle

    return open_ports

def read_json_file(path):
    try:
        with open(path, "r") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Error: File '{path}' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{path}'.")
        return None
