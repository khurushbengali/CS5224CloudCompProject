## Backend

## Dev
Setup virtual venv if not so
```
pip install virtualvenv
```
Create a virualt env at `./venv`
```
python -m venv venv
```
Activate environment
```
. venv/bin/activate
```
Install libraries
```
pip install -r requirements.txt
```
Start flask server
```
python src/app.py
```

## Deploy to aws
Create a EC2 instance with http public in-bound security group configured. You might need to customise a security group for that. Also create `keyfile.pem`, this will be used to setup the ec2 instance. Note down the location of your `keyfile.pem`. You can put it in this directory for convenience. After setup, note down the ec2's public ip address.

***Important***: Run the following script from this directory
```
bash script/deploy_to_ec2.sh <your-keyfile-location> <your-ec2-public-ip>
```
Eg:
```
bash script/deploy_to_ec2.sh ./keyfile.pem 54.89.188.190
```

### To test on aws
The following scripts allow testing new changes on aws. Similarly, use this script in this directory. Sync files with ec2
```
bash script/deploy_to_ec2.sh <your-keyfile-location> ./ <your-ec2-public-ip>
```
ssh into your ec2 instance
```
ssh -i <your-keyfile-location> ubuntu@<your-ec2-public-ip>
```
restart apache on ec2 instance
```
sudo apachectl restart
```
to watch logs on ec2 instance
```
tail -f /var/log/apache2/error.log
```