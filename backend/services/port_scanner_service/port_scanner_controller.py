import json
import asyncio

port_json = "utils/port_json.json"
open_ports = {}

async def scan_single_port(host, port, service_name):
    try:
        # Asenkron bağlantı aç
        reader, writer = await asyncio.open_connection(host=host, port=port)
        open_ports[port] = service_name  # Port açıksa kaydet
        writer.close()
        await writer.wait_closed()  # Bağlantının tamamen kapanmasını bekle
    except (asyncio.TimeoutError, ConnectionRefusedError):
        pass  # Zaman aşımı veya bağlantı reddedilirse boş geç
    except Exception as e:
        print(f"Port {port} taranırken hata oluştu: {e}")

async def scan_port_controller_async(data):
    ports = read_json_file(port_json)
    if not ports:
        return {}

    tasks = []  
    for port_str, service_name in ports.items():
        port = int(port_str)
        tasks.append(scan_single_port(data["url"], port, service_name))

    await asyncio.gather(*tasks) 
    return open_ports

def read_json_file(path):
    try:
        with open(path, "r") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Hata: '{path}' dosyası bulunamadı.")
        return None
    except json.JSONDecodeError:
        print(f"Hata: '{path}' dosyasının JSON formatı geçerli değil.")
        return None
