FROM 1science/nginx
COPY build /static
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
