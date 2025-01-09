""" 
A (Address) Kaydı: hackod.com gibi bir alan adının IP adresini döndürür.
MX (Mail Exchange) Kaydı: E-posta sunucusunu ve önceliğini gösterir.
NS (Name Server) Kaydı: Alan adı için yetkili ad sunucularını listeler.
CNAME (Canonical Name) Kaydı: Alan adının diğer bir adla eşleştirildiğini gösterir.
TXT (Text) Kaydı: SPF, DMARC gibi text tabanlı bilgiler sunabilir.
SOA (Start of Authority) Kaydı: Alan adı için otorite bilgilerini (primary DNS sunucusu, sorumlu kişi vb.) içerir.
"""


import dns.resolver
from flask import jsonify

def dns_scan_controller(data):
    domain = data["domain"]
    results = {
        "A": [],
        "MX": [],
        "NS": [],
        "CNAME": [],
        "TXT": [],
        "SOA": {}
    }
    try:
        a_records = dns.resolver.resolve(domain, 'A')
        for ipval in a_records:
            results["A"].append({
                "ip_address": ipval.to_text(),
                "ttl": a_records.rrset.ttl
            })
    except Exception as e:
        results["A"] = {"error": str(e)}

    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        for mx in mx_records:
            results["MX"].append({
                "mail_server": str(mx.exchange),
                "priority": mx.preference,
                "ttl": mx_records.rrset.ttl
            })
    except Exception as e:
        results["MX"] = {"error": str(e)}

    try:
        ns_records = dns.resolver.resolve(domain, 'NS')
        for ns in ns_records:
            results["NS"].append({
                "name_server": str(ns.target),
                "ttl": ns_records.rrset.ttl
            })
    except Exception as e:
        results["NS"] = {"error": str(e)}

    try:
        cname_records = dns.resolver.resolve(domain, 'CNAME')
        for cname in cname_records:
            results["CNAME"].append({
                "canonical_name": str(cname.target),
                "ttl": cname_records.rrset.ttl
            })
    except Exception as e:
        results["CNAME"] = {"error": str(e)}

    # TXT (Text) kayıtları sorgusu
    try:
        txt_records = dns.resolver.resolve(domain, 'TXT')
        for txt in txt_records:
            results["TXT"].append({
                "text_record": txt.to_text(),
                "ttl": txt_records.rrset.ttl
            })
    except Exception as e:
        results["TXT"] = {"error": str(e)}

    # SOA (Start of Authority) kayıtları sorgusu
    try:
        soa_records = dns.resolver.resolve(domain, 'SOA')
        for soa in soa_records:
            results["SOA"] = {
                "primary_name_server": str(soa.mname),
                "responsible_party": str(soa.rname),
                "serial_number": soa.serial,
                "refresh_interval": soa.refresh,
                "retry_interval": soa.retry,
                "expire_limit": soa.expire,
                "minimum_ttl": soa.minimum
            }
    except Exception as e:
        results["SOA"] = {"error": str(e)}

    return jsonify(results)
