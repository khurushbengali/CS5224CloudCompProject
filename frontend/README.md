### Setup
Install [nvm](https://github.com/nvm-sh/nvm)
Setup npm
```
nvm install 18
nvm use 18
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
Upload all the contents in `dist` into a s3 bucket
Follow this [guide](https://www.cloudthat.com/resources/blog/step-by-step-guide-to-deploy-reactjs-app-on-aws-s3) to upload content to s3 bucket