# Title
書評サイト開発

## Work
本プロジェクトの開発手順

* 本プロジェクトのモックはこちらのリンク先を参照する: <https://www.figma.com/file/2FmFj22y1Inu3PYpXrj4NM/Book_Board?node-id=0%3A1>

```bash
( book_boardコンテナの起動：初回 )
docker-compose up --build

（ 2回目以降 ）
docker-compose up

http://localhost:3000　で確認

（ 外部からモジュールを追加する場合 ）
docker-compose exec web npm install hogehoge
```


