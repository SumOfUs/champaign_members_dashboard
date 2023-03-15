FROM 1science/nginx
RUN echo hello \
  # comment
  world
COPY build /webapp
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
