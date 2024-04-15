#!/usr/bin/env bash
set -exou pipefail

KEYFILE=${1:-"keyfile.pem"}
DEST_IP=$2

# bash scripts/upload_to_ec2.sh ${KEYFILE} ./ ${DEST_IP}
# scp -i ${KEYFILE} ~/.aws/credentials ubuntu@${DEST_IP}:~/.aws/credentials
# ssh -i ${KEYFILE} ubuntu@${DEST_IP} -f "sudo mkdir -p /var/www/.aws; sudo cp ~/.aws/credentials /var/www/.aws/credentials; sudo apachectl restart"
ssh -i ${KEYFILE} ubuntu@${DEST_IP} -f "sudo apachectl restart"