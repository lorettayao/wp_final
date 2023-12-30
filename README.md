# (Group 14) GRE StudEE

## Run the project

### Install dependencies

```bash
yarn
```

### Environment variables

Create a `.env.local` file in the root of the project and add the following variables:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/hack2

AUTH_SECRET=<ANY_RANDOM_STRING>
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### Get Github OAuth credentials

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

### Database

1. Start database

```bash
docker compose up -d
```

2. Run migrations

```bash
yarn migrate
```

### Start the server

```bash
yarn dev
```

## Work Distribution
- 姚雲起 B10901037 ：製作寫作database，包含topic,writing內容的儲存和user mapping。撰寫前端rank
- 林新晨 B10901041 :製作單字database，包含user,project,biglist之間關係。撰寫後段function，後端rank
- 夏良語 B09901049 ：製作網頁Homepage，ui設計。整合Homepage和所有component的連結，以及設計單字答題考試。

## Demo 
link: https://youtu.be/9kVBmebtXHU

## Despcription

## Deployed Link
https://wp-final.vercel.app/
## Github Link (optional)

## Reference
Hack 2 in WP1121
