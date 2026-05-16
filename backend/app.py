from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient,ASCENDING,DESCENDING
import os

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
history = client["resistors"]["history"]


@app.route("/") 
def home():
    try:
        # Test the connection
        client.admin.command("ping")

        # Access database and collection
        history = client["resistors"]["history"]

        # Insert a test document
        history.insert_one({"test": "working"})

        return jsonify({
            "status": "success",
            "message": "MongoDB Atlas is connected!"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/save-band",methods=["POST"])
def saveBand():
    data = request.get_json()
    for doc in history.find():
        if doc["index"]>9:
            history.delete_one({"_id":doc["_id"]})
        else:
            history.update_one({"_id":doc["_id"]},{"$set":{"index":doc["index"]+1}})
    data["index"] = 1
    history.insert_one(data)
    return jsonify({"response" : "Saved"})

@app.route("/get-bands")
def getBands():
    historyList = list(history.find().sort("index",ASCENDING).limit(10))
    for doc in historyList:
        doc["_id"] = str(doc["_id"])
    return jsonify(historyList)

if __name__=="__main__":
    app.run(debug=True)