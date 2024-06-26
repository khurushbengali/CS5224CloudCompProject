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
For deployment, we need to set the API endpoint in `.env.production`, edit it to point to the production endpoint. Then build the static site using
```
npm run build
```
Create a s3 bucket, say call it `deploy-fyr`
Follow this [guide](https://www.cloudthat.com/resources/blog/step-by-step-guide-to-deploy-reactjs-app-on-aws-s3) to properly set up the permissions of the s3 bucket.
Take note to set the error page to index.html as well.
Make sure your `.aws/credentials` are set correctly
Upload all the contents in `dist` into a s3 bucket
```
aws s3 sync dist s3://deploy-fyr
```
