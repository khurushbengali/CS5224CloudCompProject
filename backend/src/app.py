from flask import Flask, request, jsonify, make_response
from flask_caching import Cache
import pandas as pd
import os
import boto3
import json
from itertools import chain

dynamodb = boto3.resource('dynamodb', region_name="us-east-1")

# src_directory = os.path.dirname(os.path.realpath(__file__))
# resource_directory = f"{src_directory}/../resources"

# book_info_read_columns = [
#     "identifier_uuid",
#     "nlb_type",
#     "language",
#     "abstract",
#     "date_created",
#     "identifier_image_uri",
#     "merged_creator",
#     "title"
# ]

# def load_book_info(file):
#     df = pd.read_csv(file, usecols=book_info_read_columns)
#     df = df.rename(columns={"identifier_uuid": "uuid", "nlb_type": "type"})
#     df = df.fillna("unknown")
#     df = df.set_index("uuid", drop=False)
#     return df

# def load_recommendations(file):
#     df = pd.read_csv(file)
#     df = df.set_index("UUID")
#     return df

# def _get_book_info(uuid):
#     if uuid not in book_info_df.index:
#         return None
#     return book_info_df.loc[uuid].to_dict()

# def _get_book_infos(uuids):
#     return book_info_df.loc[uuids].to_dict("records")

# book_info_df = load_book_info(f'{resource_directory}/NLB_updated.csv')
# recommendation_df = load_recommendations(f'{resource_directory}/recommendation.csv')

app = Flask(__name__)
config = {
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
}
app.config.from_mapping(config)
cache = Cache(app)

def cors(name):
    def inner_func(func):
        class InnerFunc:
            __name__ = name
            def __call__(self, *args, **kwargs):
                response, error_code = func(*args, **kwargs)
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response, error_code
        return InnerFunc()
    return inner_func

@app.route('/ping', methods=['GET'])
@cors(name="ping")
def ping():
    return jsonify({}), 200

@app.route('/books', methods=['GET'])
@cache.cached(timeout=9999999)
@cors(name="get_books")
def get_books():
    N = 10
    response = dynamodb.batch_get_item(
        RequestItems={
            "books": {
                "Keys": [
                    {"key": str(i)} for i in range(N)
                ]
            }
        }
    )
    if "Responses" not in response:
        return jsonify({'error': 'books not found'}), 404
    results = list(chain(*[json.loads(chunk["data"]) for chunk in response["Responses"]["books"]]))
    return jsonify(results), 200

@app.route('/book-info', methods=['GET'])
@cors("get_book_info")
def get_book_info():
    # Get the UUID from the request arguments
    uuid = request.args.get('uuid')

    # Check if UUID is provided
    if not uuid:
        return jsonify({'error': 'UUID parameter is missing'}), 400
    
    response = dynamodb.Table("book_info").get_item(Key={"uuid": uuid})
    if "Item" not in response:
        return jsonify({'error': 'Book not found'}), 404
    
    return jsonify(response["Item"]), 200


@app.route('/recommendations', methods=['GET'])
@cors("get_recommenations")
def get_recommendations():
    uuid = request.args.get('uuid')
    if not uuid:
        return jsonify({'error': 'UUID parameter is missing'}), 400
    
    response = dynamodb.Table("recommendations").get_item(Key={"uuid": uuid})
    if "Item" not in response:
        return jsonify({'error': 'No recommendations found for the given UUID'}), 404
    uuids = eval(response["Item"]["data"])

    response = dynamodb.batch_get_item(
        RequestItems={
            "book_info": {
                "Keys": [
                    {"uuid": uuid} for uuid in uuids
                ]
            }
        }
    )
    if "Responses" not in response:
        return jsonify({'error': 'Book info not found on recommended items'}), 404
    return make_response(response["Responses"]["book_info"]), 200

if __name__ == '__main__':
    app.run(debug=True)
