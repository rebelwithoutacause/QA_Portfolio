# 🕯️ Harvester Trivia - Lodge Master Edition 🕯️

A dark and atmospheric horror trivia game inspired by the cult classic video game "Harvester" (1996). Test your knowledge of one of gaming's most controversial and bizarre horror adventures while immersed in a blood-dripping, haunting interface.

**All trivia questions are based on the original Harvester (1996) game story, characters, and lore.**

> 🎬 **Inspiration**: [Harvester (1996) on IMDb](https://www.imdb.com/title/tt0219075/)

## 🎮 About the Game

**Harvester Trivia** pays homage to DigiFX Interactive's notorious 1996 point-and-click adventure game "Harvester" - a game that pushed the boundaries of violence and horror in gaming. This trivia experience captures the eerie atmosphere of the original game with:

- **Dark Gothic Interface** - Blood dripping effects and haunting typography
- **Atmospheric Audio** - Background music featuring "The Lodge Theme"
- **Lodge Master Persona** - You are welcomed by the mysterious Lodge that watches your every move
- **Score Tracking** - Your trivia performance is recorded in the "Scrolls"
- **Graveyard System** - View the scores of all who came before you

## 🌟 Features

### 🎯 Core Gameplay
- **Multiple Choice Questions** about Harvester lore, characters, and gameplay
- **Real-time Feedback** with correct/incorrect animations
- **Score Tracking** with persistent local storage
- **Personal History** - Review your past performances in the "Scrolls"
- **Global Leaderboard** - See all players' scores in the "Graveyard"

### 🎨 Visual & Audio Design
- **Horror Aesthetic** - Dark red color scheme with gothic fonts (Nosifer, Chiller, Creepster)
- **Animated Blood Drops** - Continuous dripping effect across the screen
- **Flickering Text Effects** - Eerie animations on titles and interface elements
- **Background Music** - Atmospheric lodge theme music with toggle controls
- **Responsive Design** - Works on desktop and mobile devices

### 💾 Data Persistence
- **Local Storage** - Scores and player names saved between sessions
- **Score History** - Track your improvement over multiple playthroughs
- **Global Records** - Community leaderboard of all players

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Audio support for background music (optional)

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rebelwithoutacause/HarvesterTrivia.git
   cd HarvesterTrivia
   ```

2. **Open the Game**
   - Simply open `HarvesterTrivia.html` in your web browser
   - No build process or dependencies required!

3. **Optional: Local Server**
   For best audio performance, serve via local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if you have http-server installed)
   npx http-server
   ```

## 🎪 How to Play

1. **Enter Your Name** - The Lodge must know who dares to enter
2. **Choose Your Fate** from the main menu:
   - **🎯 Begin the Trial** - Start the trivia challenge
   - **📜 View Scrolls** - See your personal score history
   - **⚰️ Visit Graveyard** - Browse all players' scores
3. **Answer Questions** - Multiple choice questions about Harvester
4. **Receive Judgment** - Get immediate feedback on your answers
5. **View Final Score** - Your performance is recorded for eternity

## 📂 Project Structure

```
HarvesterTrivia/
├── HarvesterTrivia.html          # Main game file
├── style.css                     # All styling and animations
├── The Lodge Theme (Full) - Samus345.mp3  # Background music
├── harvester666.png              # Character image (if present)
└── README.md                     # This documentation
```

## 🎨 Technical Implementation

### Frontend Technologies
- **HTML5** - Semantic structure and audio elements
- **CSS3** - Advanced animations, gradients, and responsive design
- **Vanilla JavaScript** - Game logic, DOM manipulation, and local storage
- **Google Fonts** - Horror-themed typography (Nosifer, Chiller, Creepster)

### Key Features
- **CSS Animations** - Blood dripping, text flickering, hover effects
- **Local Storage API** - Persistent score tracking
- **Audio API** - Background music with user controls
- **Responsive Design** - Mobile-friendly interface
- **Event-Driven Architecture** - Clean separation of game states

### CSS Highlights
- Custom blood drop animations with staggered timing
- Flickering text effects using keyframe animations
- Hover transformations with smooth transitions
- Dark horror color palette with strategic use of reds
- Typography mixing for atmospheric effect

## 🎵 Audio Credits

- **Background Music**: "The Lodge Theme (Full)" by Samus345
- **Format**: MP3, looped for continuous atmosphere
- **Controls**: Toggle on/off with musical note icon

## 🕯️ Inspiration & Tribute

This project is a love letter to **Harvester** (1996), one of the most infamous games in horror gaming history. Known for its:

- **Extreme Violence** - Pushing the boundaries of what was acceptable in gaming
- **Surreal Storyline** - A bizarre mix of horror, comedy, and social commentary
- **Cult Following** - Despite (or because of) its controversy, it gained a devoted fanbase
- **The Lodge** - The mysterious organization central to the game's plot
- **Dark Humor** - Satirical take on violence in media and American culture

The game was developed by **DigiFX Interactive** and published by **Merit Studios**, becoming notorious for its graphic content and strange narrative choices. Our trivia celebrates this unique piece of gaming history while maintaining respect for its cult status.

## 🔧 Customization

### Adding Questions
Questions are stored in the JavaScript section of `HarvesterTrivia.html`. To add more:

1. Locate the `questions` array in the script section
2. Add new question objects with this format:
   ```javascript
   {
       question: "Your question text here?",
       options: ["Option A", "Option B", "Option C", "Option D"],
       correct: 0  // Index of correct answer (0-3)
   }
   ```

### Styling Modifications
- **Colors**: Modify the CSS color variables in `style.css`
- **Fonts**: Change the Google Fonts import and font-family declarations
- **Animations**: Adjust keyframe animations for different effects
- **Layout**: Modify the responsive breakpoints and container sizes

### Audio Changes
- Replace `The Lodge Theme (Full) - Samus345.mp3` with your own audio file
- Update the audio source in the HTML file
- Modify audio controls styling in CSS

## 🌐 Browser Compatibility

- ✅ **Chrome** 60+
- ✅ **Firefox** 55+
- ✅ **Safari** 12+
- ✅ **Edge** 79+
- ⚠️ **IE** - Not supported (uses modern CSS and JS features)

## 📱 Mobile Support

The game is fully responsive and works on:
- **iOS** Safari 12+
- **Android** Chrome 60+
- **Mobile Firefox** 55+

Mobile-specific optimizations:
- Touch-friendly button sizes
- Responsive typography scaling
- Optimized animations for performance
- Audio playback controls for mobile restrictions

## 🤝 Contributing

Contributions are welcome! Whether you want to:

- **Add more Harvester questions** - Help expand the trivia database
- **Improve the horror atmosphere** - Enhance visual or audio elements
- **Fix bugs** - Help improve the user experience
- **Add features** - Implement new game modes or mechanics

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**Note**: This is a fan tribute project. "Harvester" is the intellectual property of its original creators. This trivia game is created for educational and entertainment purposes only.

## 🎭 Disclaimer

This trivia game contains references to mature themes from the original Harvester game, including:
- Horror imagery and themes
- References to violence (in trivia context only)
- Dark atmospheric content

The game is intended for mature audiences familiar with horror gaming culture.

## 🏆 Hall of Fame

Will you join the ranks of those who have mastered the Lodge's trials? Your score awaits in the Graveyard...

---

*"The Lodge watches your every move..."*

🕯️ **Enter if you dare** 🕯️

## 🔗 Links

- **Play the Game**: Open `HarvesterTrivia.html` in your browser
- **Report Issues**: [GitHub Issues](https://github.com/rebelwithoutacause/HarvesterTrivia/issues)
- **Original Game**: Learn more about Harvester (1996)

---

*Created with 💀 by a fan of classic horror gaming*