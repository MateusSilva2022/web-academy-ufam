# WACAD012 - Mapeando Portas

docker build -t webacademy-nginx .

docker run -d --name webacademy -p 7000:7000 webacademy-nginx

Acesse:
http://localhost:7000
