#!/usr/bin/env bash
set -exou pipefail

sudo apt-get update
sudo apt-get install -y apache2 libapache2-mod-wsgi-py3 python3-pip

pip3 install virtualenv
python3 -m virtualenv venv

. venv/bin/activate
pip3 install -r requirements.txt

sudo ln -sT ~ /var/www/html/fyr
sudo a2enmod wsgi

sudo cp 000-default.conf /etc/apache2/sites-enabled/000-default.conf
sudo apachectl restart

curl localhost:80/recommendations?uuid=00000c04-4b98-4c0f-935f-3e9227cd71bb # this should work

echo "Setup complete successfully!"