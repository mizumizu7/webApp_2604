# Pokemon Web App

FastAPIとReactを用いて作成したポケモン管理Webアプリです。  
ポケモンの一覧表示やユーザ認証機能、お気に入り登録機能を持っています。

# ✨ Features

<details open>
<summary>機能一覧</summary>

| 機能名 | 機能詳細 |
|------|------|
| 📋 ポケモン一覧表示 | ・ポケモンの画像・ID・名前を一覧表示<br>・APIからデータを取得して表示 |
| 👤 ユーザー認証 | ・ユーザー登録・ログイン機能<br>・JWTによる認証管理<br>・ログイン状態に応じて機能を制御 |
| ⭐ お気に入り機能 | ・ポケモンをお気に入り登録 / 解除<br>・お気に入りは最大6体まで登録可能（ユーザーごとに個別管理）<br>・Contextを使用してグローバルに状態管理 |
| 🏆 ランキング機能（実装予定） | ・データベースをもとにお気に入り登録数を集計してランキングを表示<br>・ポケモンごとの人気度（お気に入り数）を可視化<br>・登録数が多い順にソートして上位から表示 |
| 🧭 レイアウト | ・ヘッダー固定<br>・サイドバー付きレイアウト<br>・メインエリアのみルーティングで切り替え |
| 🔁 ルーティング（react-router-dom） | ・`/` : ポケモン一覧<br>・`/favorites` : お気に入り一覧<br>・`/ranking` : お気に入り登録数順ランキング表示 |
| 💾 データベース（SQLite） | ・SQLiteを使用してデータを永続化<br>・ユーザー情報・お気に入り情報を保存<br>・API経由でデータのCRUD操作を実装 |

</details>

# 🚀 技術スタック 詳細

## Full Stack App (FastAPI + React)

このプロジェクトは **FastAPIを用いたバックエンド**と  
**React + Viteによるフロントエンド**で構成されたフルスタックWebアプリケーションです。

ユーザー管理やデータ操作をREST API経由で行う構成になっています。

## Backend

- Python 3.14
- FastAPI
- SQLAlchemy
- Alembic（マイグレーション管理）
- Uvicorn
- Pydantic
- JWT認証（python-jose）
- bcrypt / passlib（パスワードハッシュ）

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- ESLint

---

## 📁 ディレクトリ構成

<details>
<summary>ディレクトリ構成（クリックして展開）</summary>

```
.
├─ backend
│ ├─ alembic # DBマイグレーション
│ ├─ db # DB関連処理
│ ├─ routers # APIルーティング
│ ├─ utils # 共通処理
│
├─ frontend
│ ├─ public # 静的ファイル
│ └─ src
│ ├─ api # API通信
│ ├─ assets # 画像など
│ ├─ components
│ │ ├─ pokemon # ポケモン関連UI
│ │ ├─ favorites # お気に入りUI
│ │ ├─ ranking # ランキングUI
│ │ └─ users # ユーザー関連UI
│ ├─ contexts # Context管理
│ └─ hooks # カスタムフック
```

</details>

---

## ⚙️ 環境構築

<details>

### リポジトリをクローン

```bash
git clone <repository-url>
cd <project-folder>
```

### 🐍 Backend（FastAPI）

```bash
1. 仮想環境作成
cd backend
python -m venv venv
仮想環境の起動
Windows
venv\Scripts\activate
Mac / Linux
source venv/bin/activate
2. 依存関係インストール
pip install -r requirements.txt
3. データベースマイグレーション (現状実行する必要なし)
alembic upgrade head
4. サーバー起動
uvicorn main:app --reload
📍 Backend URL
API: http://127.0.0.1:8000
Swagger UI: http://127.0.0.1:8000/docs
```

### ⚛️ Frontend（React + Vite）

```bash
1. 依存関係インストール
cd frontend
npm install
2. 開発サーバー起動
npm run dev
📍 Frontend URL

http://localhost:5173
```

</details>

---


## 📚 学習内容

<details>

🔗 API通信
フロントエンドでは Axios を使用してバックエンドAPIと通信します。
axios.get("http://localhost:8000/users")

🔐 認証機能
JWT（JSON Web Token）による認証
bcryptによるパスワードハッシュ化
ログイン後にトークンを使用してAPIアクセス制御

🐍 Python / FastAPI
REST API設計
FastAPIによるルーティング設計
SQLAlchemyによるORM操作
Alembicによるマイグレーション管理
JWT認証の実装
Pydanticによるバリデーション
非同期処理（async/await）

⚛️ JavaScript / React
コンポーネント設計
Hooks（useState / useEffect / custom hooks）
React Routerによるページ遷移
Context APIによる状態管理
AxiosによるAPI通信
Viteによる開発環境構築

🧠 今後の改善予定
TypeScript導入による型安全性向上
テスト追加（pytest / React Testing Library）
Docker対応
CI/CD導入

APIドキュメントの強化
📌 注意事項
.env ファイルは各自で作成してください
DB接続情報やSECRET_KEYは環境変数で管理してください

</details>
