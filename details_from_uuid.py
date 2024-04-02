from flask import Flask, request, jsonify
import pandas as pd

# Load the CSV file into a DataFrame
df = pd.read_csv('NLB_updated.csv')

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

if __name__ == '__main__':
    app.run(debug=True)
