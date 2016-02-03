from dashboard import app
from flask import render_template


@app.route('/')
def index():
	#can make dict of values and just return as a var in render_templates, lik good 'ol django
	return render_template('index.html')
