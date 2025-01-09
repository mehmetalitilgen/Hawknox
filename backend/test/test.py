""" 
A (Address) Kaydı: hackod.com gibi bir alan adının IP adresini döndürür.
MX (Mail Exchange) Kaydı: E-posta sunucusunu ve önceliğini gösterir.
NS (Name Server) Kaydı: Alan adı için yetkili ad sunucularını listeler.
CNAME (Canonical Name) Kaydı: Alan adının diğer bir adla eşleştirildiğini gösterir.
TXT (Text) Kaydı: SPF, DMARC gibi text tabanlı bilgiler sunabilir.
SOA (Start of Authority) Kaydı: Alan adı için otorite bilgilerini (primary DNS sunucusu, sorumlu kişi vb.) içerir.
"""


import dns.resolver

# A (Address) kayıtları sorgusu
print("🔹 A (Address) Kayıtları: ")
try:
    a_records = dns.resolver.resolve('hackod.com', 'A')
    for ipval in a_records:
        print(f"IP Adresi: {ipval.to_text()} - TTL: {a_records.rrset.ttl} saniye")
except Exception as e:
    print(f"A kaydı hatası: {e}")

# MX (Mail Exchange) kayıtları sorgusu
print("\n🔹 MX (Mail Exchange) Kayıtları: ")
try:
    mx_records = dns.resolver.resolve('google.com', 'MX')
    for mx in mx_records:
        print(f"Mail Sunucusu: {mx.exchange} - Öncelik: {mx.preference} - TTL: {mx_records.rrset.ttl} saniye")
except Exception as e:
    print(f"MX kaydı hatası: {e}")

# NS (Name Server) kayıtları sorgusu
print("\n🔹 NS (Name Server) Kayıtları: ")
try:
    ns_records = dns.resolver.resolve('google.com', 'NS')
    for ns in ns_records:
        print(f"Name Server: {ns.target} - TTL: {ns_records.rrset.ttl} saniye")
except Exception as e:
    print(f"NS kaydı hatası: {e}")

# CNAME (Canonical Name) kayıtları sorgusu
print("\n🔹 CNAME (Canonical Name) Kayıtları: ")
try:
    cname_records = dns.resolver.resolve('www.google.com', 'CNAME')
    for cname in cname_records:
        print(f"Canonical Name: {cname.target} - TTL: {cname_records.rrset.ttl} saniye")
except Exception as e:
    print(f"CNAME kaydı hatası: {e}")

# TXT (Text) kayıtları sorgusu
print("\n🔹 TXT (Text) Kayıtları: ")
try:
    txt_records = dns.resolver.resolve('google.com', 'TXT')
    for txt in txt_records:
        print(f"TXT Kaydı: {txt.to_text()} - TTL: {txt_records.rrset.ttl} saniye")
except Exception as e:
    print(f"TXT kaydı hatası: {e}")

# SOA (Start of Authority) kayıtları sorgusu
print("\n🔹 SOA (Start of Authority) Kayıtları: ")
try:
    soa_records = dns.resolver.resolve('google.com', 'SOA')
    for soa in soa_records:
        print(f"Primary Name Server: {soa.mname}")
        print(f"Responsible Party: {soa.rname}")
        print(f"Serial Number: {soa.serial}")
        print(f"Refresh Interval: {soa.refresh} saniye")
        print(f"Retry Interval: {soa.retry} saniye")
        print(f"Expire Limit: {soa.expire} saniye")
        print(f"Minimum TTL: {soa.minimum} saniye")
except Exception as e:
    print(f"SOA kaydı hatası: {e}")
