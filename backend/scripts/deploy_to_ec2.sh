#!/usr/bin/env bash

KEYFILE=${1:-"keyfile.pem"}
DEST_IP=$2

bash scripts/upload_to_ec2.sh ${KEYFILE} ./ ${DEST_IP}
ssh -i ${KEYFILE} ubuntu@${DEST_IP} -f 'bash scripts/setup_ec2.sh'