#! /bin/bash

SHA1=$1
2bc1d5b952da457437d764fd8324aa7a09abd817

docker push soutech/members_dashboard:3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37

EB_BUCKET=members-dashboard-deployment
DOCKERRUN_FILE=3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37-Dockerrun.aws.json
aws configure set default.region us-west-2

sed "s/<TAG>/3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37/" < Dockerrun.aws.json.template > 3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37-Dockerrun.aws.json
aws s3 cp 3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37-Dockerrun.aws.json s3://members-dashboard-deployment/3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37-Dockerrun.aws.json
aws elasticbeanstalk create-application-version --application-name members-dashboard \
  --version-label 3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37 --source-bundle S3Bucket=members-dashboard-deployment,S3Key=3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37-Dockerrun.aws.json

aws elasticbeanstalk update-environment --environment-name members-dashboard-env-production \
    --version-label 3558c1a9dc9c4b1d0db955a4f0e1ef546ff54b37
