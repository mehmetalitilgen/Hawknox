import json
import asyncio

port_json = "utils/port_json.json"

def normalize_base_url(base_url):
    if base_url.startswith(("http://", "https://")):
        base_url = base_url.split("//")[1]
    if base_url.endswith("/"):
        base_url = base_url[:-1]
    return base_url

async def scan_single_port(host, port, service_name):
    try:
        reader, writer = await asyncio.open_connection(host=host, port=port)
        writer.close()
        await writer.wait_closed()
        return port, service_name
    except (asyncio.TimeoutError, ConnectionRefusedError):
        return None, None
    except Exception as e:
        print(f"An error occurred while scanning port {port}: {e}")
        return None, None

async def scan_port_controller_async(data):
    open_ports = {}
    ports = read_json_file(port_json)
    if not ports:
        return {}

    tasks = []

    # URL'yi normalize edip host kısmını çıkarıyoruz
    base_url = normalize_base_url(data["url"])

    for port_str, service_name in ports.items():
        port = int(port_str)
        tasks.append(scan_single_port(base_url, port, service_name))

    results = await asyncio.gather(*tasks)

    for port, service_name in results:
        if port:
            open_ports[port] = service_name

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
