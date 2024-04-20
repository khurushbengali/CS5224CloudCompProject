## DB
We use dynamodb

### Setup
Create a s3 bucket to store the data files to be loaded to dynamodb
Move data to s3
```
aws s3 sync resources <your bucket>
```
Load the books data to books db
```
aws dynamodb import-table \
	--s3-bucket-source S3Bucket=<your bucket>,S3KeyPrefix=books.csv \
	--input-format CSV \
	--table-creation-parameters '{"TableName":"books","KeySchema": [{"AttributeName":"key","KeyType":"HASH"}],"AttributeDefinitions":[{"AttributeName":"key","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}'
```
Load the book-info data to book-info db
```
aws dynamodb import-table \
	--s3-bucket-source S3Bucket=<your bucket>,S3KeyPrefix=book_info.csv \
	--input-format CSV \
	--table-creation-parameters '{"TableName":"book_info","KeySchema": [{"AttributeName":"uuid","KeyType":"HASH"}],"AttributeDefinitions":[{"AttributeName":"uuid","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}'
```
Load the recommendation data to recommendations db
```
aws dynamodb import-table \
	--s3-bucket-source S3Bucket=<your bucket>,S3KeyPrefix=recommendations.csv \
	--input-format CSV \
	--table-creation-parameters '{"TableName":"recommendations","KeySchema": [{"AttributeName":"uuid","KeyType":"HASH"}],"AttributeDefinitions":[{"AttributeName":"uuid","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}'
```

If you are using aws lab account, your credentials as `~/.aws/credentials` by default allows you to use dynamodb to import-table and read the data and the backend code should work fine. If not you will need to add the following to the IAM role you are using: refer to:
1. [IAM roles for import-table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataImport.Requesting.html)
2. [IAM roles for read](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_dynamodb_specific-table.html)