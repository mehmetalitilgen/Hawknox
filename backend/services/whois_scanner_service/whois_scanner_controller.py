import whois


def whois_scan_controller(data):
    domain = data["domain"]

    whois_info =  whois.whois(domain)

    return whois_info