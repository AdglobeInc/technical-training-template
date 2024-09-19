# 目次

- [Git](#git)
  - [ソースコードのダウンロード](#git-clone)
- [Frontend](#frontend)
  - [初期設定](#frontend-initialize)
  - [起動](#frontend-run)
  - [停止](#frontend-stop)
  - [ビルド](#frontend-build)
- [Backend](#backend)
  - [初期設定](#backend-initialize)
  - [起動](#backend-run)
  - [停止](#backend-stop)
- [VSCode](#vscode)
  - [拡張機能のインストール](#vscode-extensions)
- [開発](#develop)
- [pgweb の操作方法](#pgweb)
  - [表示](#pgweb-login)
  - [テーブルの内容を確認する](#pgweb-show-table)
  - [SQLの実行](#pgweb-execute-sql)
- [デプロイ](#deploy)
  - [Render への登録](#deploy-register-render)
  - [データベースの作成](#deploy-create-database)
  - [バックエンドの構築（Laravel）](#deploy-create-backend)
  - [フロントエンドの構築（Nuxt.js）](#deploy-create-frontend)
  - [疎通確認（フロント↔バック）](#deploy-connectivity-check)
  - [デプロイ環境のDB確認方法](#deploy-database-viewer)

<a id="git"></a>

# Git

<a id="git-clone"></a>

## ソースコードのダウンロード

Ubuntu のターミナルを開き、任意のディレクトリで以下のコマンドを実行します。

```bash
git clone <このリポジトリのURL>
cd <リポジトリ名>
code .
```

VSCode 起動後は[拡張機能のインストール](#vscode-extensions)を行ってください。  
インストール後は VSCode を閉じてしまって問題ありません。

<a id="frontend"></a>

# Frontend

<a id="frontend-initialize"></a>

## 初期設定

Ubuntu ターミナルで以下のコマンドを実行し、起動に必要なパッケージのインストールを行います。

```bash
# nvm(Node.js バージョン管理ツール) のインストール
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
# バージョン確認
nvm -v
# command not found と表示される場合、Ubuntu ターミナルの再起動を行う

# Node.js のインストール
nvm install --lts
# バージョン確認
node -v

# npmのバージョン確認
npm -v
```

Ubuntu ターミナルで以下のコマンドを実行し、VSCode を起動します。

```bash
code frontend/
```

VSCode 起動後は[拡張機能のインストール](#vscode-extensions)を行ってください。

<a id="frontend-run"></a>

## 起動

VSCode で `Shift + Ctrl + @` を押下してターミナルを表示し、以下のコマンドを実行してください。

```bash
# .env ファイルの生成
cp .env.example .env
# パッケージのインストールとアプリの起動
npm install && npm run dev
```

起動後は以下の URL に接続できますので、実際にアクセスして確認してください。

- http://localhost:3000

<a id="frontend-stop"></a>

## 停止

起動コマンドを入力した VSCode のターミナルで `Ctrl + C` を入力します。

<a id="frontend-build"></a>

## ビルド

ビルドを行うには以下のコマンドを実行してください。

```bash
# ビルドコマンド
npm run build
# ビルド後に実行するコマンド
# Nuxt3 はビルド後に .env を読み込んでくれないため、HOST と PORT は起動時に設定する必要がある
source .env && HOST=$HOST PORT=$PORT node .output/server/index.mjs
```

<a id="backend"></a>

# Backend

<a id="backend-initialize"></a>

## 初期設定

Ubuntu ターミナルで以下のコマンドを実行し、VSCode を起動します。

```bash
code backend/
```

VSCode 起動後は[拡張機能のインストール](#vscode-extensions)を行ってください。

その後 `Shift + Ctrl + @` を押下し、ターミナルを表示して以下のコマンドを実行してください。

```bash
# .env ファイルの生成
cp .env.example .env
# Composer パッケージの初期化
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
# sail のエイリアス
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

<a id="backend-run"></a>

## 起動

VSCode のターミナルで以下のコマンドを実行します。

```bash
sail up -d
```

初回起動時は続けて以下のコマンドを実行してください。

```bash
sail artisan key:generate
```

起動後は以下の URL に接続できますので、実際にアクセスして確認してください。

- Laravel: http://localhost:8000
- pgweb(DB 管理): http://localhost:8081

<a id="backend-stop"></a>

## 停止

VSCode のターミナルで以下のコマンドを実行します。

```bash
sail down
```

<a id="vscode"></a>

# VSCode

<a id="vscode-extensions"></a>

## 拡張機能のインストール

VSCode が起動したら右下に画像のような通知が表示されるため、「インストール」を選択します。  
![image](https://user-images.githubusercontent.com/105618751/212531923-9d03069f-8d93-4ccf-bcc1-bb9d3ddae8a9.png)

> **Note**
>
> ### 通知が表示されない・通知を閉じてしまった場合
>
> 1. `Shift + Ctrl + P` を押下し、テキストボックスに `recommend` と入力します。
> 2. 「拡張機能: ワークスペース フォルダーの推奨事項に拡張機能を追加する」を選択します。
>    ![image](https://user-images.githubusercontent.com/105618751/212533529-977c4078-6d5e-4db8-b7c3-2a3f7892c319.png)
>    - または `Shift + Ctrl + X` を押下し、テキストボックスに `@recommended` と入力します。
>      ![image](https://user-images.githubusercontent.com/105618751/212532098-fb170ed1-fdd8-488b-bbe8-c12eecfb5719.png)
> 3. 表示された拡張機能をすべてインストールしてください。

<a id="develop"></a>

# 開発

以下を参考に開発を行ってください。

- [Nuxt.js の開発について](https://wiki.adglobe.co.jp/doc/vuejsnuxtjs-jsQAbcZvZy)
- [Laravel の開発について](https://wiki.adglobe.co.jp/doc/laravel-Stxl3Ci80z)

[/frontend/pages/sample.vue](http://localhost:3000/sample) に API 通信のサンプルを実装してあるため、こちらも参考程度に目を通しておいてください。

<a id="pgweb"></a>

# pgweb の操作方法

<a id="pgweb-login"></a>

## 表示

http://localhost:8081 に接続すると以下の画面が表示されます。  
![](img/pgweb1.png)

<a id="pgweb-show-table"></a>

## テーブルの内容を確認する

1. 画面左メニュー `Tables` から参照したいテーブルを選択します。  
    ![](img/pgweb2.png)
1. 選択したテーブルに登録されているデータが表示されます。  
    ![](img/pgweb3.png)

<a id="pgweb-execute-sql"></a>

## SQLの実行
1. ヘッダメニューから `Query` を選択します。  
    ![](img/pgweb4.png)
1. SQLを入力し `Run Query` をクリックします。  
    ![](img/pgweb5.png)
1. 実行結果が画面下部に表示されます。  
    ![](img/pgweb6.png)

<a id="deploy"></a>

# デプロイ

<a id="deploy-register-render"></a>

## Render への登録

1. [Render](https://render.com/)にアクセスします。
1. `Get Started for Free >` をクリックします。  
    ![](img/render1.png)
1. `GitHub` のSSOを選択します。
    ![](img/render2.png)
1. `Authorize Render` をクリックします。  
    ![](img/render3.png)
1. `Email` 欄にGitHubアカウントのメールアドレス（アドグローブ支給のメールアドレス）を入力し `Create Account` をクリックします。  
    ![](img/render4.png)
1. 次の画面が表示されたらメールを確認してください。  
    ![](img/render5.png)
1. Renderからメールが届いているため、リンクをクリックします。  
    ![](img/render6.png)
1. 最後の質問 `Where is your project hosted?` のみが必須なので `Starting a new project` を選択し `Continue to Render` をクリックします。  
    ![](img/render7.png)
1. ダッシュボード画面が表示されたら登録は完了です。  
    ![](img/render8.png)

<a id="deploy-create-database"></a>

## データベースの作成

1. ヘッダメニューの `New +` から `PostgreSQL` を選択します。  
    ![](img/render9.png)
1. 下表の通りに設定を行います。  
    |項目|設定値|
    |-|-|
    |Name|リポジトリ名（2024-Technical-Training-Team-○）|
    |Database|任意<br>未入力の場合は `Name` をもとに自動生成される|
    |User|任意<br>未入力の場合は `Name` をもとに自動生成される|
    |Region|Singapore (Southeast Asia)|
    |Datadog API Key|未入力|
    |Instance Type|Free|

    ![](img/render10.png)  
    ![](img/render11.png)
1. 設定が完了したら、左下の `Create Database` をクリックします。
    ![](img/render12.png)
1. 次のダイアログが表示される場合は `Close` をクリックしてください。  
    ![](img/render13.png)
1. 次の画面が表示されたらデータベースの作成は完了です。  
    ![](img/render14.png)
1. 作成後の画面中ほど（Connectionsセクション）にデータベースの情報が表示されているため、控えておきましょう。  
    必要な情報は `Hostname` `Port` `Database` `Username` `Password` です。
    ![](img/render15.png)

<a id="deploy-create-backend"></a>

## バックエンドの構築（Laravel）

1. ヘッダメニューの `New +` から `Web Service` を選択します。  
    ![](img/render16.png)
1. デフォルトの選択状態（`Build and deploy from a Git repository`）で `Next` をクリックします。  
    ![](img/render17.png)
1. `Connect Repository` をクリックします。  
    ![](img/render18.png)
1. `Only select ripositories` -> `Select repositories` -> `2024-Technical-Training-Team-○` の順に選択します。  
    ![](img/render19.png)
1. リポジトリが選択されていることを確認し `Install` をクリックします。  
    ![](img/render20.png)
1. GitHubアカウントのパスワードを入力し `Confirm` をクリックします。  
    ![](img/render21.png)
1. 追加したリポジトリで `Connect` をクリックします。  
    ![](img/render22.png)
1. 下表の通りに設定を行います。  
    |項目|設定値|
    |-|-|
    |Name|任意（デフォルトはリポジトリ名）|
    |Region|Singapore (Southeast Asia)|
    |Branch|main|
    |Root directory|backend|
    |Runtime|Docker|
    |Instance Type|Free|

    ![](img/render23.png)
    ![](img/render24.png)
1. `Add from .env` をクリックします。  
    ![](img/render25.png)
1. ローカルの [`backend/.env`](backend/.env) の内容をコピペし `Add variables` をクリックします。  
    ![](img/render26.png)
1. 入力内容を確認してください。  
    その際、下表の通りに値を設定してください。  
    表に記載のないキーはそのままで問題ありません。  
    |キー|値|
    |-|-|
    |APP_ENV|production|
    |APP_DEBUG|false|
    |APP_PORT|10000|
    |DB_HOST|Renderに作成したデータベースの `Hostname`|
    |DB_PORT|Renderに作成したデータベースの `Port`|
    |DB_DATABASE|Renderに作成したデータベースの `Database`|
    |DB_USERNAME|Renderに作成したデータベースの `Username`|
    |DB_PASSWORD|Renderに作成したデータベースの `Password`|

    ![](img/render27.png)
1. 値が未設定となっている項目があれば削除してください。  
    ![](img/render28.png)
1. `Advanced` をクリックします。
    ![](img/render29.png)
1. 展開された項目の中にある `Dockerfile Path` に `Dockerfile.render` と入力してください。  
    ※似た名前の項目があるため注意  
    ![](img/render30.png)
1. ここまでの設定が完了したら、画面最下部の `Create Web Service` をクリックします。
    ![](img/render31.png)
1. デプロイが開始するので待ちます。
    ![](img/render32.png)
1. しばらくするとステータスが `Live` に切り替わるため、リンク先にアクセスしてください。  
    ![](img/render33.png)
1. ページが表示されればデプロイ完了です。  
    お疲れさまでした。  
    デプロイ先のURLはフロントエンドの構築時に必要となりますので、控えておくとよいでしょう。  
    ![](img/render34.png)

<a id="deploy-create-frontend"></a>

## フロントエンドの構築（Nuxt.js）

1. ヘッダメニューの `New +` から `Web Service` を選択します。  
    ![](img/render16.png)
1. デフォルトの選択状態（`Build and deploy from a Git repository`）で `Next` をクリックします。  
    ![](img/render17.png)
1. バックエンドの構築時に追加したリポジトリで `Connect` をクリックします。  
    ![](img/render22.png)
1. 下表の通りに設定を行います。  
    |項目|設定値|
    |-|-|
    |Name|任意（デフォルトはリポジトリ名-1）|
    |Region|Singapore (Southeast Asia)|
    |Branch|main|
    |Root directory|frontend|
    |Runtime|Node|
    |Build Command|`npm install && npm run build`|
    |Start Command|`node .output/server/index.mjs`|
    |Instance Type|Free|

    ![](img/render35.png)
    ![](img/render36.png)
    ![](img/render37.png)
1. `Add from .env` をクリックします。  
    ![](img/render38.png)
1. ローカルの [`frontend/.env`](frontend/.env) の内容をコピペし `Add variables` をクリックします。  
    ![](img/render39.png)
1. 入力内容を確認してください。  
    その際、下表の通りに値を設定してください。  
    表に記載のないキーはそのままで問題ありません。  
    |キー|値|
    |-|-|
    |API_BASE_URL|`<バックエンドのデプロイ先URL>`/api|

    ![](img/render40.png)

1. ここまでの設定が完了したら、画面最下部の `Create Web Service` をクリックします。
    ![](img/render41.png)
1. デプロイが開始するので待ちます。
    ![](img/render32.png)
1. しばらくするとステータスが `Live` に切り替わるため、リンク先にアクセスしてください。  
    ![](img/render42.png)
1. ページが表示されればデプロイ完了です。  
    お疲れさまでした。  
    ![](img/render43.png)

<a id="deploy-connectivity-check"></a>

## 疎通確認（フロント↔バック）

1. アドレスバーに `<フロントエンドのデプロイ先URL>/sample` を入力し、遷移します。  
    ![](img/render49.png)
1. `登録するユーザ情報を入力` エリアの各項目に適当な値を入力し `登録` をクリックします。
    ![](img/render50.png)
1. `最後にログインを行った認証情報` エリアにログイン情報が表示されれば疎通成功です。  
    ![](img/render51.png)

<a id="deploy-database-viewer"></a>

## デプロイ環境のDB確認方法

1. ヘッダメニューの `Dashboard` をクリックします。  
    ![](img/render44.png)
1. リストから [データベースの作成](#deploy-create-database) で作成した `PostgreSQL` を選択します。  
    ![](img/render45.png)
1. Connectionsセクションの `External Database URL` をコピーします。  
    ![](img/render46.png)
1. WSLのターミナル上で以下のコマンドを実行します。  
    `<External Database URL>` の部分は先ほどコピーした内容に置換してください。
    ```bash
    docker run --rm -p 9999:8081 -e PGWEB_DATABASE_URL=<External Database URL> sosedoff/pgweb
    ```  
    ![](img/render47.png)
1. http://localhost:9999 にアクセスすることで、DBの内容を確認することができます。  
    操作方法は [pgweb の操作方法](#pgweb) をご確認ください。  
    ![](img/render48.png)
