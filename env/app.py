from datetime import time
from utils import yaml_loader
from flask import Flask, app
import flask
from flask.helpers import url_for
from flask.templating import render_template
from werkzeug.utils import redirect


app = Flask(__name__)


@app.route("/")
@app.route("/index/")
def index():
    return render_template("/index.html")


@app.route("/problem0/")
def problem0():
    data = yaml_loader("./static/data/yaml/problem_0.yml")
    return render_template("/problem0.html", context=data)


@app.route("/problem1/")
def problem1():
    data = yaml_loader("./static/data/yaml/problem_1.yml")
    return render_template("/problem1.html", context=data)


@app.route("/problem2/")
def problem2():
    data = yaml_loader("./static/data/yaml/problem_2.yml")
    return render_template("/problem2.html", context=data)


@app.route("/problem3/")
def problem3():
    data = yaml_loader("./static/data/yaml/problem_3.yml")
    return render_template("/problem3.html", context=data)

@app.route("/hi/")
def testerere():
    return render_template("tester1.html")


if __name__ == "__main__":
    app.run(debug=True)
