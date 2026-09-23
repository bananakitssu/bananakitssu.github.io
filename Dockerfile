FROM nginx:alpine
COPY . /usr/share/nginx/html

# Banana detected an HTML-only site.
# Vercel injects PORT for the container runtime.
CMD ["sh", "-c", "sed -i 's/listen       80;/listen       ${PORT:-3000};/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]