FROM 1science/nginx
COPY build /webapp
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
