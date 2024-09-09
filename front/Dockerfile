FROM node as vite-app

# Define build arguments for environment variables
ARG VITE_CATS_API_KEY
ARG VITE_APP_API_URL

# Set environment variables during the build process
ENV VITE_CATS_API_KEY=$VITE_CATS_API_KEY
ENV VITE_APP_API_URL=$VITE_APP_API_URL

WORKDIR /app/client
COPY . .

RUN npm ci
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html && mkdir html

WORKDIR /

COPY ./nginx.conf /etc/nginx
COPY --from=vite-app ./app/client/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
