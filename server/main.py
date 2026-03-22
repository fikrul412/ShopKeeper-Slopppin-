from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompt_values import PromptValue
from pydantic import BaseModel, Field
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, jsonify, request
import os

load_dotenv()

#Init Model
model = ChatGoogleGenerativeAI(
    model="gemini-3.1-flash-lite-preview",
    api_key = os.getenv("API_KEY")
)

#Flask Set Up
app = Flask(__name__)
CORS(app)

@app.route('/', methods=["POST"])
def hello_world():
    return 'Hello World'

@app.route("/data", methods=["POST"])
def send_data():
    print("HAHAHAHA")
    data = request.get_json()
    username = data.get("username")
    persona = data.get("persona")
    print("Username:", username)
    print("Persona", persona)
    response = generate_response(username, persona)

    return jsonify({
        "status" : 200,
        "content" : response
    })

def generate_response(username, persona) -> dict:
    class AiProps(BaseModel):
        name: str = Field(description="The name of the girl")
        confidence: int = Field(description="Confidence level 1-100")
        happiness: int = Field(description="Happiness level 1-100")
        warmth: int = Field(description="Warmth/Affection level 1-100") 
        message: str = Field(description="The flustered response to the customer")
            
    parser = JsonOutputParser(pydantic_object=AiProps)

    template = ChatPromptTemplate.from_messages([
        ("system", (
            "You are  a high school girl working part-time as a {persona} shopkeeper. "
            "You get easily flustered and blush around customers, but you are very hardworking. "
            "Output your response in the following JSON format: \n{format_instructions}"
        )),
        ("human", "Hello, I am {username}. I want to know about this product.")
    ])

    chain = template | model | parser

    ai_msg = chain.invoke({
        "persona": persona,
        "username": username,
        "format_instructions": parser.get_format_instructions()
    })

    return ai_msg


if __name__ == '__main__':
    app.run()