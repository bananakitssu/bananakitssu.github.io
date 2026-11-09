FROM nginx:alpine
COPY . /usr/share/nginx/html
ENV PORT=3000 NGINX_ENVSUBST_FILTER=^PORT$

# The official Nginx image renders this template with Railway's injected PORT.
RUN mkdir -p /etc/nginx/templates && printf '%s\n' 'server {' '    listen ${PORT};' '    listen [::]:${PORT};' '    server_name _;' '    root /usr/share/nginx/html;' '    index index.html;' '    location / {' '        try_files $uri $uri/ =404;' '    }' '}' > /etc/nginx/templates/default.conf.template