import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing import image
import requests
from io import BytesIO
from PIL import Image
from flask_cors import CORS  # Import CORS

# Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load model
model = tf.keras.models.load_model('my_model.h5')

# Define your class indices (adjust to match your dataset)
class_indices = {
    'cataract': 0,
    'diabetic_retinopathy': 1,
    'glaucoma': 2,
    'normal': 3,
}
labels = {v: k for k, v in class_indices.items()}
@app.route('/test', methods=['GET'])
def test():
    return jsonify({"status": "Flask is running"})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    if 'image_url' not in data:
        return jsonify({'error': 'No image URL provided'}), 400

    image_url = data['image_url']

    try:
        # Download image
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content)).convert('RGB')
        img = img.resize((256, 256))  # Same as model's input size

        # Convert to array and preprocess
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        # Predict
        prediction = model.predict(img_array)
        predicted_index = np.argmax(prediction, axis=1)[0]
        predicted_label = labels[predicted_index]

        return jsonify({
            'prediction': predicted_label,
            'confidence': float(np.max(prediction))
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8080)
