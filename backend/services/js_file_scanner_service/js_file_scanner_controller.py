import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin

def js_file_scan_controller(data):
    domain = data.get("domain")
    scan_results = {"domain": domain, "scanned_files": [], "issues": []}

    try:
        response = requests.get(domain, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        js_files = []
        for script_tag in soup.find_all("script"):
            src = script_tag.get("src")
            if src:  
                full_domain = urljoin(domain, src)
                js_files.append({"type": "external", "url": full_domain})
            else:  
                if script_tag.string:
                    js_files.append({"type": "inline", "content": script_tag.string.strip()})

        for js_file in js_files:
            if js_file["type"] == "external":
                scan_result = scan_external_js(js_file["url"])
            else:
                scan_result = scan_inline_js(js_file["content"])

            if scan_result:
                scan_results["issues"].append(scan_result)

            scan_results["scanned_files"].append(js_file)

        return scan_results

    except requests.RequestException as e:
        return {"error": f"Failed to fetch domain: {str(e)}"}

def scan_external_js(js_url):
    try:
        response = requests.get(js_url, timeout=10)
        response.raise_for_status()
        js_content = response.text
        return scan_js_for_patterns(js_content, js_url)
    except requests.RequestException:
        return {"file": js_url, "error": "Failed to fetch JS file"}

def scan_inline_js(js_content):
    return scan_js_for_patterns(js_content, "inline JS")

def scan_js_for_patterns(js_content, source):
    patterns = {
        "eval usage": r'\beval\(',
        "document.write": r'document\.write\(',
        "innerHTML assignment": r'\.innerHTML\s*=',
        "XHR Requests": r'XMLHttpRequest\(',
        "fetch API": r'\bfetch\(',
    }
    findings = {}
    for pattern_name, regex in patterns.items():
        matches = re.findall(regex, js_content)
        if matches:
            findings[pattern_name] = len(matches)

    if findings:
        return {"source": source, "suspicious_patterns": findings}

    return None
