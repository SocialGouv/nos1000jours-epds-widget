FROM node:16-alpine

WORKDIR /app

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN yarn --production --frozen-lockfile --prefer-offline && yarn cache clean
RUN yarn build

USER node

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DEBUG=0

CMD ["yarn", "start"]
