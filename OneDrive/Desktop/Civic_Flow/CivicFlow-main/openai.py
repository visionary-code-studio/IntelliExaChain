from openai import OpenAI

client = OpenAI(
  api_key="sk-1234abcd1234abcd1234abcd1234abcd1234abcd"
)

response = client.responses.create(
  model="gpt-5.4-mini",
  input="write a haiku about ai",
  store=True,
)

print(response.output_text);
