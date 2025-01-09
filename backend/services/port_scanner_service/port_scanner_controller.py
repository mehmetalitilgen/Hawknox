import json
import asyncio

port_json = "utils/port_json.json"
open_ports = {}

async def scan_single_port(host, port, service_name):
    try:
        reader, writer = await asyncio.open_connection(host=host, port=port)
        open_ports[port] = service_name  
        writer.close()
        await writer.wait_closed() 
    except (asyncio.TimeoutError, ConnectionRefusedError):
        pass  
    except Exception as e:
        print(f"An error occurred while scanning port {port}: {e}")

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
        print(f"Error: File '{path}' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{path}'.")
        return None