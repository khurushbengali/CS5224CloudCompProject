#!/usr/bin/env bash
set -exou pipefail

KEYFILE=${1:-"keyfile.pem"}
SRC=${2:-"./"}
DEST_IP=$3

# scp -i ${KEYFILE} -r ${SRC} ubuntu@${DEST_IP}:./
rsync -av -e "ssh -i ${KEYFILE}" --exclude='*venv*' ${SRC} ubuntu@${DEST_IP}:./