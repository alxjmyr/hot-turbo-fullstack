# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:latest as build-stage

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY ./ /app/

# Comment out the next line to disable tests
# RUN npm run tesst:unit
# RUN npm run build

ARG VITE_APP_ENV
ARG VITE_API_BASE_URL
ARG VITE_API_V1_PREFIX

ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_V1_PREFIX=$VITE_API_V1_PREFIX

RUN npm install -g vite && vite build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

# get rid of default nginx assets then copy prod build of the app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf