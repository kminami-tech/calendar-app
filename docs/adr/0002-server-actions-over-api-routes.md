# ADR 0002: データ操作に Server Actions を使用する

## Status

Accepted

## Context

カレンダーの予定を作成・更新・削除する際に、サーバーサイドの SQLite（Drizzle ORM 経由）を操作する必要がある。Next.js では以下の2つのアプローチがある。

1. **API Route**（`app/api/...`）— REST エンドポイントを定義し、クライアントから `fetch` で呼び出す
2. **Server Actions** — `"use server"` を付けた関数をクライアントから直接呼び出す

## Decision

**Server Actions** を使用し、API Route は作成しない。

## Consequences

### メリット

- API Route のボイラープレート（ルートファイル・`Request`/`Response` の型定義・`fetch` 呼び出し）が不要
- TypeScript の型が Server Action 呼び出しまで一貫して通る
- `revalidatePath` / `revalidateTag` で Next.js のキャッシュと直接統合できる
- フォームの `action` 属性に直接渡せる（`useFormState` / `useActionState` との親和性）

### デメリット・制約

- 外部から REST API として叩く想定がない前提（本アプリはローカル専用のためこれは許容）
- Server Actions に不慣れな開発者にはコードの流れが不明瞭に見える場合がある
