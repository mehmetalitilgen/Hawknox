import requests
import urllib3
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def normalize_base_url(base_url):
    if not base_url.startswith(("http://", "https://")):
        base_url = "https://" + base_url  # Default to 'https://'
    return base_url

def format_base_url(base_url):
    normalized_url = normalize_base_url(base_url)
    parsed_url = urlparse(normalized_url)
    if not parsed_url.netloc:
        raise ValueError("Invalid URL format")
    
    return parsed_url.netloc

def scan_directory(base_url, directory):
    """
    Scan a single directory and return the result.
    """
    full_url = f"https://{base_url}/{directory}"
    result = {"url": full_url, "status": False}  # Default to False

    try:
        response = requests.get(full_url, verify=True, timeout=6)
        if response.status_code == 200:
            result["status"] = True  # Found
        else:
            result["status"] = False  # Not Found or Forbidden
    except requests.exceptions.SSLError:
        result["status"] = False  # SSL Error
    except requests.exceptions.RequestException:
        result["status"] = False  # Timeout or Connection Error

    return result

def directory_scan_controller(data):
    """
    Start scanning directories for the given base URL.
    """
    base_url = data.get("base_url")
    if not base_url:
        return [{"error": "Base URL is missing"}]

    try:
        base_url = format_base_url(base_url)
    except ValueError:
        return [{"error": "Invalid URL format"}]

    word_list = read_word_list()
    if not word_list:
        return [{"error": "Wordlist file not found"}]

    threads = 100  # Maximum concurrent threads

    results = []  # List to store all results

    with ThreadPoolExecutor(max_workers=threads) as executor:
        futures = [executor.submit(scan_directory, base_url, directory) for directory in word_list]
        for future in as_completed(futures):
            result = future.result()  # Retrieve the result of each directory scan
            results.append(result)

    return results  # Return all results

def read_word_list():
    """
    Read the wordlist file and return it as a list.
    """
    wordlist_path = "utils/word_list.txt"
    try:
        with open(wordlist_path, "r") as file:
            word_list = file.read().splitlines()
        return word_list
    except FileNotFoundError:
        print(f"[!] Wordlist file not found: {wordlist_path}")
        return []
