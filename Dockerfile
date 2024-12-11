FROM oven/bun:latest

ARG PORT
ARG DATABASE_URL
ARG API_KEY
ARG ALLOW_DANGEROUS_SQL_COMMANDS

WORKDIR /app
COPY . .
RUN bun install --no-save
RUN bun run build && bun run compile

EXPOSE $PORT

CMD ["./dist/server"]
