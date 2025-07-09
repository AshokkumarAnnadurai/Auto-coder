import google.generativeai as genai
genai.configure(api_key="AIzaSyB_BhcicXNbnwoaaXPoCAKA6QHr9VHoR0A")
models = genai.list_models()

for m in models:
    print(m.name, m.supported_generation_methods)
