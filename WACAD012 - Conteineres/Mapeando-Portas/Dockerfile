FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean

RUN sed -i 's/listen 80 default_server;/listen 7000 default_server;/' /etc/nginx/sites-available/default

COPY index.html /var/www/html/index.html

EXPOSE 7000

CMD ["nginx", "-g", "daemon off;"]
