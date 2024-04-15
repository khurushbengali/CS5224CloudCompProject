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
	--s3-bucket-source S3Bucket=dynamodb-resources-fyr,S3KeyPrefix=books.csv \
	--input-format CSV \
	--table-creation-parameters '{"TableName":"books","KeySchema": [{"AttributeName":"key","KeyType":"HASH"}],"AttributeDefinitions":[{"AttributeName":"key","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}'
```
Load the book-info data to book-info db
```
aws dynamodb import-table \
	--s3-bucket-source S3Bucket=dynamodb-resources-fyr,S3KeyPrefix=book_info.csv \
	--input-format CSV \
	--table-creation-parameters '{"TableName":"book_info","KeySchema": [{"AttributeName":"uuid","KeyType":"HASH"}],"AttributeDefinitions":[{"AttributeName":"uuid","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}'
```
Load the recommendation data to recommendations db
```
aws dynamodb import-table \
	--s3-bucket-source S3Bucket=dynamodb-resources-fyr,S3KeyPrefix=recommendations.csv \
	--input-format CSV \
	--table-creation-parameters '{"TableName":"recommendations","KeySchema": [{"AttributeName":"uuid","KeyType":"HASH"}],"AttributeDefinitions":[{"AttributeName":"uuid","AttributeType":"S"}],"BillingMode":"PAY_PER_REQUEST"}'
```