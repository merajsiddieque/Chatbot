from flask import Flask, send_from_directory, request, jsonify
import os

app = Flask(__name__, static_folder="../react/dist", static_url_path="")

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_react(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    return jsonify({"reply": f"You said: {user_message}"})

if __name__ == "__main__":
    app.run(debug=True)
