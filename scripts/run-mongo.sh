MONGO_DATA="/Users/$USER/.mongodb/$(echo "${PWD##*/}")/data"
mkdir -p "$MONGO_DATA"


docker start swindleform_mongo || docker run -d --name swindleform_mongo -p 27017:27017 -e MONGODB_USERNAME=swindleform_user -e MONGODB_PASSWORD=localhost -e MONGODB_DATABASE=swindleform_db -v $MONGO_DATA:/bitnami bitnami/mongodb:latest