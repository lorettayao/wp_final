# Run the project

## Install dependencies

```bash
yarn
```

## Environment variables

Create a `.env.local` file in the root of the project and add the following variables:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/hack2

AUTH_SECRET=<ANY_RANDOM_STRING>
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Get Github OAuth credentials (Optional)

本次考試不會評分 Github 登入的部分，但是如果懶得打帳號密碼，可以參考以下步驟：

- Go to `Settings` tab of your Github account
- Click `Developer settings` on the left sidebar
- Click `OAuth Apps` on the left sidebar
- Click `New OAuth App`
- Enter the following information:
  - `Application name`: `Notion Clone` (or any name you like)
  - `Homepage URL`: `http://localhost:3000`
  - `Authorization callback URL`: `http://localhost:3000/api/auth/callback/github`
- Click `Register application`
- Copy the `Client ID` and `Client Secret` to your `.env.local` file:

  ```text
  AUTH_GITHUB_ID=<Client ID>
  AUTH_GITHUB_SECRET=<Client Secret>
  ```

  Note that in NextAuth v5, the prefix `AUTH_` is required for the env variables.

  Note that you do not have to add those keys to `src/lib/env/private.ts` since they are automatically handled by NextAuth.

## Database

1. Start database

```bash
docker compose up -d
```

2. Run migrations

```bash
yarn migrate
```

## Start the server

```bash
yarn dev
```

## Setup tests

```bash
yarn playwright install chromium # Install Chromium (if not already installed)
yarn playwright install-deps chromium # Install Chromium dependencies (if not already installed)
```

## Run tests

```bash
yarn test
```

# 題目說明
