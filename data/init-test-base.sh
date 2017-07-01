clear
rm cv_base.db
sqlite3 cv_base.db < create-db.sql
sqlite3 cv_base.db < feed-test-datas.sql