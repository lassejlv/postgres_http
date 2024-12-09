# Postgres HTTP

Turns your postgres db into an http server. Great for beginners or just small projects and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/UYtPO2?referralCode=lasse)

## API reference

```bash
- POST /query
  - body: { query: string, args: any[] }
  - headers: { Authorization: Bearer <api_key> }
  - response: { rows: any[] }
```

## Installation

```bash
git clone https://github.com/lassejlv/postgres_http.git
cd postgres_http
bun install
```

## Generate an api key

```bash
openssl rand -base64 32
```

## Required environment variables

```bash
PORT=<port to listen on>
DATABASE_URL=<postgres database url>
API_KEY=<api key>
```

## Start the server

```bash
bun --watch index.ts
```
