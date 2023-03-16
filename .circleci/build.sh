#!/bin/bash
set -eu -o pipefail

SHA1=$1

docker build --rm=false -t  soutech/members_dashboard:$SHA1 .

docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push soutech/members_dashboard:$SHA1
