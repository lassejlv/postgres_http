# Postgres HTTP

Turns your postgres db into an http server. Great for beginners or just small projects and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/UYtPO2?referralCode=lasse)

## API reference

```bash
- POST /query
  - body: { query: string, args: any[] }
  - headers: { Authorization: Bearer <api_key> }
  - response: { rows: any[] }

- GET /status
     - headers: { Authorization: Bearer  }
     - response: { ok: boolean, ping: number  }
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
ALLOW_DANGEROUS_SQL_COMMANDS=false # This will allow you to run DELETE or DROP or TRUNCATE commands. Set to true if you want to allow this.
```

## Start the server

```bash
bun --watch index.ts
```

## I cant run...

By default you cannot run: `DELETE, DROP, TRUNCATE`.
Update the env variable `ALLOW_DANGEROUS_SQL_COMMANDS` and set it to true if you wanna be doing that.

 ## API key
You will find the api under the variables tab. It's randomly generated under creation.
