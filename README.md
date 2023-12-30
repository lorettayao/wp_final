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
- 姚雲起 B10901037
  - 寫作 database，包含 topic, writing 內容的儲存
  - user mapping
  - 前端 ranking
- 林新晨 B10901041
  - 單字 database，包含 user,project,biglist 之間關係
  - 後端 function
  - 後端 ranking
- 夏良語 B09901049
  - UI 設計
  - 製作網站 Homepage
  - 整合 Homepage 和所有 components 的連結
  - 設計單字答題考試
  - Ranking - All Time Ranking

## Demo 
link: https://youtu.be/9kVBmebtXHU

## Despcription

### Motivation

我們的服務針對準備GRE的考生。GRE考試準備著重在單字及寫作，因此我們的服務分為兩個部分，每日單字和寫作練習。

### Features
點選每日單字，會隨機從尚未學過單字中生成一份7個的單字表，使用者學完後可以將其打勾。在退出單字表之前，系統會生成考試，測試使用者是否學好他打勾的單字。如果答對，該單字將不會再出現；反之，單字的勾勾會被取消，單字有機會再出現在其他生字表。

點選寫作練習，系統會有設定好的題目供使用者選擇，使用者可以在下方的輸入欄練習。每一次的練習會儲存到該使用者的帳號下，可以反覆查看。

另外，在HomePage提供一個分數排行榜（答對考試一題得1分），分為三個類別：
1. 各個使用者的當日得分排行。
2. 使用者的每日得分紀錄，方便使用者追蹤自己的學習進度。
3. 各個使用者的歷史總積分排行。

## Deployed Link
https://wp-final.vercel.app/

## Reference
Hack 2 in WP1121
