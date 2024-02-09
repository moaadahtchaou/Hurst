import requests

re=requests.get("https://api.myip.com")
print(re.text)
