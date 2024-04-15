# CS5224CloudCompProject

## Code organisations
```
|-- notebooks
```
This stores the python notebooks used to process data, see the readme for more details
```
|-- db
```
This stores the eventual data files to load to dynamodb, see the readme for more details
```
|-- backend
```
This contains the backend codes for our ec2 instance. Built using python flask and using aws's boto3 client to access dynamodb
```
|-- frontend
```
This contains the frontend codes to for our static website. Built using vite + react + material ui

## To deploy
### Prerequisite
You will need to have an aws account and configure the credentials in `.aws/credentials`. If using aws lab, this can be obtained by copying the file content in `.aws/credentials` from the terminal after starting a lab instance. Else this can be done by `aws configure`.

### Deployment sequence
See individual sections' readme on how to deploy, frontend should comes last because the endpoint url of the backend is required.
1. DB
2. Backend
3. Frontend - code change requires to point to production endpoint
