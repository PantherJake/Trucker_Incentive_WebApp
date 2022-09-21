import requests

api_url = "https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users"
response = requests.get(api_url)
response.status_code
response.headers["content-Type"]
response.json()

print("Ending")

