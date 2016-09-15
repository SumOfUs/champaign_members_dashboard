FROM 1science/nginx
COPY dist /webapp
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
