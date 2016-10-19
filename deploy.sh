#! /bin/bash

SHA1=$1
EB_BUCKET=$2
ENVIRONMENT_NAME=$3
export URL=$4

docker push soutech/members_dashboard:$SHA1

DOCKERRUN_FILE=$SHA1-Dockerrun.aws.json
aws configure set default.region $AWS_REGION

sed "s/<TAG>/$SHA1/" < Dockerrun.aws.json.template > $DOCKERRUN_FILE

cat config/nginx.conf | envsubst '$URL' >tmp
mv tmp config/nginx.conf

aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE

aws elasticbeanstalk create-application-version --application-name members-dashboard \
  --version-label $SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE

aws elasticbeanstalk update-environment --environment-name $ENVIRONMENT_NAME --version-label $SHA1
