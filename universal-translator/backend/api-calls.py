import os
import requests
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
openai.Model.list()

# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
audio_file= open("testing/Bosnian_Recording.m4a", "rb")
transcript = openai.Audio.translate("whisper-1", audio_file)

print(transcript.text)