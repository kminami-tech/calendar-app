# Next.js Template

社内向け Next.js アプリケーションのリポジトリテンプレートです。

[`create-next-app`](https://nextjs.org/docs/app/getting-started/installation) で作成した構成を
ベースに、ESLint、Prettier、Lefthook、GitHub Actions を設定しています。

プロジェクトに合わせて設定を追加・更新して使用してください。

## 前提条件

- [Node.js](https://nodejs.org/) 24 系
- [pnpm](https://pnpm.io/) 11 系

## 使い方

依存関係をインストールします。

```bash
pnpm install
```

`pnpm install` 後、`prepare` script によって Lefthook の Git hooks もセットアップされます。

開発サーバーを起動します。

```bash
pnpm dev
```

ブラウザで http://localhost:3000 を開きます。

## コマンド

| コマンド                 | 内容                                                      |
| ------------------------ | --------------------------------------------------------- |
| `pnpm dev`               | 開発サーバーを起動します。                                |
| `pnpm build`             | 本番ビルドを実行します。                                  |
| `pnpm start`             | ビルド済みアプリケーションを起動します。                  |
| `pnpm lint`              | ESLint で静的解析を実行します。                           |
| `pnpm lint:fix`          | ESLint の自動修正を実行します。                           |
| `pnpm typecheck`         | Next.js の型生成後、TypeScript の型チェックを実行します。 |
| `pnpm format`            | Prettier でコードをフォーマットします。                   |
| `pnpm format:check`      | Prettier のフォーマット差分を確認します。                 |
| `pnpm prepare`           | Lefthook の Git hooks を手動でインストールします。        |
| `pnpm lefthook:validate` | Lefthook の設定を検証します。                             |

## 技術構成

### Next.js

[`create-next-app`](https://nextjs.org/docs/app/getting-started/installation) を以下の設定で
実行した構成をベースにしています。

| 項目           | 設定   |
| -------------- | ------ |
| TypeScript     | Yes    |
| Linter         | ESLint |
| React Compiler | No     |
| Tailwind CSS   | Yes    |
| `src/`         | No     |
| App Router     | Yes    |
| Import alias   | `@/*`  |
| AGENTS.md      | No     |

主なバージョンは以下です。

| ライブラリ                                   | バージョン |
| -------------------------------------------- | ---------- |
| [Next.js](https://nextjs.org)                | 16         |
| [React](https://react.dev/)                  | 19         |
| [TypeScript](https://www.typescriptlang.org) | 5          |
| [Tailwind CSS](https://tailwindcss.com)      | 4          |

### TypeScript

型チェックは以下のコマンドで実行します。

```bash
pnpm typecheck
```

このコマンドでは、`next typegen` で Next.js の型を生成した後、`tsc --noEmit` を実行します。

### Lint

[ESLint](https://eslint.org) 9 の Flat Config を使用しています。

TypeScript は type-aware lint を有効にし、Next.js 推奨ルール、import / export の並び替え、
Prettier と競合するルールの無効化を設定しています。

主な構成は以下です。

- `@eslint/js`: JavaScript の基本推奨ルール
- [`eslint-config-next/core-web-vitals`](https://nextjs.org/docs/app/api-reference/config/eslint):
  Next.js 向けルール
- [`typescript-eslint`](https://typescript-eslint.io/): TypeScript 向けの strict type checked
  config
- [`eslint-plugin-simple-import-sort`](https://github.com/lydell/eslint-plugin-simple-import-sort):
  import / export の並び順を検査
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier): Prettier と
  競合する ESLint ルールを無効化

### Format

[Prettier](https://prettier.io/) 3 を使用しています。

Tailwind CSS の class の並び替えには[`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) を使用しています。

### Git Hooks

[Lefthook](https://lefthook.dev/) を使用しています。

通常は `pnpm install` 後に `prepare` script で Lefthook がインストールされます。
`--ignore-scripts` を使った場合や hooks が入らない場合は、`pnpm prepare` を手動で実行して
ください。

pre-commit では staged files を対象に以下を実行し、自動修正されたファイルを再 stage します。

- Prettier
- ESLint

pre-push では以下を実行します。

- `pnpm lint`
- `pnpm typecheck`
- `pnpm format:check`

### GitHub Actions

[GitHub Actions](https://docs.github.com/actions) で CI を設定しています。

CI の実行対象は以下です。

- `main` への push
- `main` 向けの pull request

CI では以下を実行します。

- 依存関係のインストール
- Next.js cache の復元
- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
