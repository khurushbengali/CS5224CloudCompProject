#!/usr/bin/env bash

KEYFILE=${1:-"keyfile.pem"}
DEST_IP=$2

bash scripts/upload_to_ec2.sh ${KEYFILE} ./ ${DEST_IP}
# scp -i ${KEYFILE} ~/.aws/credentials ubuntuun@${DEST_IP}:~/.aws/credentials
# ssh -i ${KEYFILE} ubuntu@${DEST_IP} -f "sudo mkdir -p /var/www/.aws; sudo cp ~/.aws/credentials /var/www/.aws/credentials"
ssh -i ${KEYFILE} ubuntu@${DEST_IP} -f 'bash scripts/setup_ec2.sh'