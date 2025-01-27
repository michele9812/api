from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# URL del JSON pubblico su GitHub
JSON_URL = "https://raw.githubusercontent.com/michele9812/Accessibility/main/Visualreference.json"

@app.route("/get-reference", methods=["GET"])
def get_reference():
    component_name = request.args.get("component_name")
    if not component_name:
        return jsonify({"error": "Il parametro 'component_name' è obbligatorio"}), 400

    # Scarica il file JSON
    response = requests.get(JSON_URL)
    if response.status_code != 200:
        return jsonify({"error": "Impossibile scaricare il file JSON"}), 500

    # Cerca il componente
    components = response.json()
    for component in components:
        if component["name"].lower() == component_name.lower():
            return jsonify(component)

    return jsonify({"error": "Componente non trovato"}), 404

if __name__ == "__main__":
    app.run(debug=True)
