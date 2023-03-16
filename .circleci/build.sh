#!/bin/bash
set -eu -o pipefail

docker build --rm=false -t  soutech/members_dashboard:$CIRCLE_SHA1 .

docker login -u $DOCKER_USER -p $DOCKER_PASS
docker push soutech/members_dashboard:$CIRCLE_SHA1
