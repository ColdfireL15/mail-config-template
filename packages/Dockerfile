# Use official Python image as base
FROM python:3.12-alpine3.21

# Set working directory
WORKDIR /app

# Copy project files
COPY /app .

# Init project dependencies
RUN pip install -r requirements.txt
RUN chmod +x entrypoint.sh

# Expose necessary port(s)
EXPOSE 5000

# HEALTHCHECK
RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Set the entrypoint
ENTRYPOINT ["./entrypoint.sh"]
