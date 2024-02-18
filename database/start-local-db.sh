docker run -d \
    --name relationship_memo_db \
    -p 5432:5432 \
    --env-file ../.env.local \
	-v ./data:/var/lib/postgresql/data \
	postgres:alpine