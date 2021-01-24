ROOT_DIR=$(pwd)
PG_DATA="$ROOT_DIR/data/postgres"

mkdir -p "$PG_DATA"

docker start localgripeform || docker run -d --name localgripeform -p 5432:5432 -e POSTGRES_USER=gripeformapp -e POSTGRES_PASSWORD=localhost -e POSTGRES_DB=gripeform_db -e PGDATA=/var/lib/postgresql/data -v $PG_DATA:/var/lib/postgresql/data postgres:12