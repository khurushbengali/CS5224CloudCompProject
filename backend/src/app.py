from flask import Flask, request, jsonify
import flask
import pandas as pd
import os

src_directory = os.path.dirname(os.path.realpath(__file__))
resource_directory = f"{src_directory}/../resources"

def load_book_info(file):
    df = pd.read_csv(file)
    df = df.rename(columns={"identifier_uuid": "uuid", "nlb_type": "type"})
    df = df.fillna("nan")
    df = df.set_index("uuid", drop=False)
    return df

def load_recommendations(file):
    df = pd.read_csv(file)
    df = df.set_index("UUID")
    return df

def _get_book_info(uuid):
    if uuid not in book_info_df.index:
        return None
    return book_info_df.loc[uuid].to_dict()

def _get_book_infos(uuids):
    return book_info_df.loc[uuids].to_dict("records")

book_info_df = load_book_info(f'{resource_directory}/NLB_updated.csv')
recommendation_df = load_recommendations(f'{resource_directory}/recommendation.csv')

app = Flask(__name__)


@app.route('/books', methods=['GET'])
def get_books():
    response = flask.jsonify(book_info_df.to_dict("records"))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/book-info', methods=['GET'])
def get_book_info():
    # Get the UUID from the request arguments
    uuid = request.args.get('uuid')

    # Check if UUID is provided
    if not uuid:
        return jsonify({'error': 'UUID parameter is missing'}), 400
    
    book_info = _get_book_info(uuid)
    print(book_info)

    if book_info is None:
        return jsonify({'error': 'Book not found'}), 404

    # Convert the row to a dictionary and return
    response = flask.jsonify(book_info)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    uuid = request.args.get('uuid')
    if not uuid:
        return jsonify({'error': 'UUID parameter is missing'}), 400
    
    # If no recommendations found, return an error
    if uuid not in recommendation_df.index:
        return jsonify({'error': 'No recommendations found for the given UUID'}), 404
    
    recommended_uuids = recommendation_df.loc[uuid]
    
    # Get book information for each recommended UUID
    book_infos = _get_book_infos(recommended_uuids)
    response = flask.jsonify(book_infos)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Use this code instead if want to return all recommended book information
'''
@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    uuid = request.args.get('uuid')
    if not uuid:
        return jsonify({'error': 'UUID parameter is missing'}), 400
    
    # Fetch the recommended books' UUIDs for the given UUID
    recommended_uuids = recommendation_df[recommendation_df['UUID'] == uuid]
    
    # If no recommendations found, return an error
    if recommended_uuids.empty:
        return jsonify({'error': 'No recommendations found for the given UUID'}), 404
    
    # Get book information for each recommended UUID
    recommendations_info = []
    for col in recommendation_df.columns[1:]:  # Skip the 'Book UUID' column
        rec_uuid = recommended_uuids.iloc[0][col]
        book_info = get_book_info_for_uuid(rec_uuid)  
        if book_info:
            recommendations_info.append(book_info)

    return jsonify(recommendations_info)

def get_book_info_for_uuid(uuid):
    book_info = df[df['identifier_uuid'] == uuid]
    if not book_info.empty:
        return book_info.iloc[0].to_dict()
    return None
'''

if __name__ == '__main__':
    app.run(debug=True)
