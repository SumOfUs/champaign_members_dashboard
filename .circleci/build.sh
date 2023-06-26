#!/bin/bash

SHA1=$1
docker login -u $DOCKER_USER -p $DOCKER_PASS

docker build --rm=false -t  soutech/members_dashboard:$SHA1 .
docker push soutech/members_dashboard:$SHA1
