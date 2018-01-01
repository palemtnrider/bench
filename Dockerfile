FROM nginx:alpine

COPY bench.html /usr/share/nginx/html/index.html
COPY bench.js /usr/share/nginx/html

EXPOSE 8080

