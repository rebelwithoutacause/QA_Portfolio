import random
import time

dice_faces = {
    1: ("+-------+",
        "|       |",
        "|   o   |",
        "|       |",
        "+-------+"),
    2: ("+-------+",
        "| o     |",
        "|       |",
        "|     o |",
        "+-------+"),
    3: ("+-------+",
        "| o     |",
        "|   o   |",
        "|     o |",
        "+-------+"),
    4: ("+-------+",
        "| o   o |",
        "|       |",
        "| o   o |",
        "+-------+"),
    5: ("+-------+",
        "| o   o |",
        "|   o   |",
        "| o   o |",
        "+-------+"),
    6: ("+-------+",
        "| o   o |",
        "| o   o |",
        "| o   o |",
        "+-------+")
}

spooky_quotes = [
    "The shadows watch you roll...",
    "Did you hear that whisper?",
    "Something's behind you... or is it?",
    "This dice is cursed.",
    "The room just got colder...",
    "You were warned..."
]

def roll_dice():
    roll = random.randint(1, 6)
    print("\nYou roll the dice...")
    time.sleep(1.5)
    for line in dice_faces[roll]:
        print(line)
    print("\n" + random.choice(spooky_quotes))
    return roll

def main():
    print("☠️ Welcome to the Spooky Dice Roller ☠️")
    while True:
        input("\nPress Enter to roll the cursed dice...")
        roll_dice()

        again = input("\nDo you dare roll again? (y/n): ").lower()
        if again != 'y':
            print("Farewell... if you make it out.")
            break

if __name__ == "__main__":
    main()
