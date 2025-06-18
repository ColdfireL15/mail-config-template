import os
from flask import Flask
from dotenv import load_dotenv
from routes.index import index_bp

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SESSION_TOKEN')
DEBUG = os.getenv('DEBUG').lower() == 'true'

app.register_blueprint(index_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=DEBUG) 