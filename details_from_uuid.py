from flask import Flask, request, jsonify
import pandas as pd

# Load the CSV file into a DataFrame
df = pd.read_csv('NLB_updated.csv')

recommendation_df = pd.read_csv('recommendation.csv')

app = Flask(__name__)

@app.route('/book-info', methods=['GET'])
def get_book_info():
    # Get the UUID from the request arguments
    uuid = request.args.get('uuid')

    # Check if UUID is provided
    if not uuid:
        return jsonify({'error': 'UUID parameter is missing'}), 400

    # Find the row with the given UUID
    book_info = df[df['identifier_uuid'] == uuid]

    # Check if the UUID exists in the DataFrame
    if book_info.empty:
        return jsonify({'error': 'Book not found'}), 404

    # Convert the row to a dictionary and return
    return jsonify(book_info.iloc[0].to_dict())

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
    for col in recommendation_df.columns[1:]:  # Skip the first column
        rec_uuid = a.iloc[0][col]
        recommendations_info.append(rec_uuid)
    # return a list of recommended book UUID
    return jsonify(recommendations_info)

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
