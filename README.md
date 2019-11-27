# OtokogiApp
漢気ジャンケン管理アプリケーション
---

## ページ構成
* Point input 画面
* Event regist 画面
* TBU: Member regist 画面
* TBU: Power word 画面


## 技術構成

### frontend

* vue cli
  * vue環境CLI
* vue 2.5.2
  * フレームワーク
* fontawesome
  * フリーフォントアイコン
* axios
  * HTTP通信ライブラリ
* bootstrap-vue
  * CSS簡易化

### backend

* Node.js
  * バックエンド向けJS
* express
  * バックエンドAPIフレームワーク
* mongoose
  * MongoDB連携ライブラリ

### インフラ

* firebase
  * frontend サーバー
* Heroku
  * Backend サーバー
* MongoDB atlas
  * Mongo DB cloud ツール

## コマンド
### デプロイ
* Heroku
  ```
    heroku login
    git subtree push --prefix backend/ heroku master
  ```
* Firebase
  ```
    firebase login
    firebase deploy
  ```
