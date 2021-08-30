# Readme Poor Man's LeetCode

# Poor Man's Leetcode

Basically a Flask app of Leetcode with less features. A person can complete coding challenges. The last submission's code will be saved so if the user leaves the session and comes back, the code that they ran for the last submission will be there. This is done through updating the code saved to the browser each time the code is run. Other features include dark mode and different themes for the code editor.

## What I used

The text editor is created with [CodeMirror](https://github.com/codemirror/codemirror) and the python is enabled to run in browser with [Pyodide](https://pyodide.org/en/stable/usage/quickstart.html)

## How to Run

For Linux/Mac users

Activate the virtual environment and then install the dependencies

```python
source venv/bin/activate
pip3 install -r requirements.txt
```

To start the local server

```python
python3 app.py
```
