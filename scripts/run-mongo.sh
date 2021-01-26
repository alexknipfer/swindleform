MONGO_DATA="/Users/$USER/.mongodb/$(echo "${PWD##*/}")/data"
mkdir -p "$MONGO_DATA"


docker start typeform_mongo || docker run -d --name typeform_mongo -p 27017:27017 -e MONGODB_USERNAME=typeform_user -e MONGODB_PASSWORD=localhost -e MONGODB_DATABASE=typeform_db -v $MONGO_DATA:/bitnami bitnami/mongodb:latest