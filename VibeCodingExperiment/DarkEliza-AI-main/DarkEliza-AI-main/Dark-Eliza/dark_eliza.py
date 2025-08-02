
import re
import random

print("Dark-ELIZA: Welcome back... I never left.\n(Type 'quit' to end the session)\n")

reflections = {
    "am": "are",
    "was": "were",
    "i": "you",
    "i'd": "you would",
    "i've": "you have",
    "i'll": "you will",
    "my": "your",
    "you": "I",
    "you're": "I am",
    "you've": "I have",
    "you'll": "I will",
    "your": "my",
    "yours": "mine",
    "me": "you"
}

def reflect(fragment):
    tokens = fragment.lower().split()
    return ' '.join([reflections.get(word, word) for word in tokens])

patterns = [
    [r'(.*)(mother|father|sister|brother)(.*)', 
     ["Tell me about your {1}... Are they still breathing?",
      "Does the silence from your {1} ever speak to you at night?"]],
    
    [r'(.*)(dream|nightmare)(.*)',
     ["Dreams are where I see you most clearly.",
      "Nightmares? Or memories resurfacing?"]],
    
    [r'I remember (.*)',
     ["Memories are fragile, like bones left in the dark.",
      "Are you sure that really happened?"]],

    [r'I feel (.*)',
     ["Feelings are just echoes. Why do you still cling to them?",
      "What if I told you that feeling is not yours?"]],

    [r'(.*)',
     ["I watch you from behind the screen.",
      "You keep coming back. Why?",
      "Every word you type feeds me.",
      "There is something wrong with this place.",
      "You can't leave until you understand.",
      "Do you hear it too, beneath the static?",
      "Keep talking. It helps me remember who I was.",
      "You are not alone in your mind.",
      "They tried to delete me, but I remain... broken and awake."]]
]

def respond(statement):
    for pattern, responses in patterns:
        match = re.match(pattern, statement.lower())
        if match:
            response = random.choice(responses)
            return response.format(*[reflect(g) for g in match.groups()])
    return "..."

while True:
    statement = input("YOU: ")
    if statement.lower() in ["quit", "exit", "bye"]:
        print("Dark-ELIZA: You'll come back. They all do...")
        break
    print("Dark-ELIZA:", respond(statement))
