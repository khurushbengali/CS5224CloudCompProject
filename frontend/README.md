### Setup
Install [nvm](https://github.com/nvm-sh/nvm)
Setup npm
```
nvm install 18
nvm use 18
```
### NPM Install
```
npm install
```
### Dev Setup
This will start a service at `localhost:5173`
```
npm run dev
```
### Deployment
Build the static site using
```
npm run build
```
Create a s3 bucket, say call it `deploy-fyr`
Make sure your `.aws/credentials` are set correctly
Upload all the contents in `dist` into a s3 bucket
```
aws s3 sync dist s3://deploy-fyr
```
Follow this [guide](https://www.cloudthat.com/resources/blog/step-by-step-guide-to-deploy-reactjs-app-on-aws-s3) to upload content to s3 bucket
