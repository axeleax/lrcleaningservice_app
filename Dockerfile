FROM node:12.14.1 as node-stage
LABEL authors="Omar Axel Del Angel Torres"

RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb
RUN npm i -g @angular/cli
RUN npm i puppeteer

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN ng build --prod
# Run Dev
#EXPOSE 4200
#CMD ng serve --prod --host 0.0.0.0

# Run Prod
FROM nginx:1.17.8
COPY --from=node-stage usr/src/app/dist/lr-qcleaningservice-app/ /usr/share/nginx/html
COPY --from=node-stage usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf



