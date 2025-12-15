const quizzes = {
    chess: [
        {
            question: "How many squares are there on a standard chessboard?",
            options: ["32", "48", "64", "72"],
            correct: 2
        },
        {
            question: "Which piece can only move diagonally?",
            options: ["Rook", "Bishop", "Knight", "Queen"],
            correct: 1
        },
        {
            question: "What is it called when a pawn reaches the opposite end of the board?",
            options: ["Promotion", "Coronation", "Evolution", "Advancement"],
            correct: 0
        },
        {
            question: "Which piece can jump over other pieces?",
            options: ["Bishop", "Rook", "Knight", "Queen"],
            correct: 2
        },
        {
            question: "What is the term for a draw in chess where a player has no legal moves but is not in check?",
            options: ["Checkmate", "Stalemate", "Deadlock", "Tie"],
            correct: 1
        },
        {
            question: "How many pieces does each player start with in chess?",
            options: ["12", "14", "16", "18"],
            correct: 2
        },
        {
            question: "What special move allows the king and rook to move simultaneously?",
            options: ["Castling", "En passant", "Fork", "Pin"],
            correct: 0
        },
        {
            question: "Which chess piece is worth approximately 3 points in material value?",
            options: ["Pawn", "Knight", "Rook", "Queen"],
            correct: 1
        },
        {
            question: "What is 'en passant'?",
            options: ["A type of checkmate", "A special pawn capture", "A opening strategy", "A endgame technique"],
            correct: 1
        },
        {
            question: "Who is considered the first official World Chess Champion?",
            options: ["Bobby Fischer", "Wilhelm Steinitz", "Garry Kasparov", "Emanuel Lasker"],
            correct: 1
        }
    ],
    programming: [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            correct: 0
        },
        {
            question: "Which programming language is known as the 'mother of all languages'?",
            options: ["Python", "C", "Assembly", "FORTRAN"],
            correct: 1
        },
        {
            question: "What year was JavaScript created?",
            options: ["1993", "1995", "1997", "2000"],
            correct: 1
        },
        {
            question: "What does SQL stand for?",
            options: ["Simple Query Language", "Structured Question Language", "Structured Query Language", "Standard Query Language"],
            correct: 2
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            options: ["//", "#", "/*", "<!--"],
            correct: 0
        },
        {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            correct: 1
        },
        {
            question: "Which data structure uses LIFO (Last In First Out)?",
            options: ["Queue", "Stack", "Array", "Tree"],
            correct: 1
        },
        {
            question: "What does API stand for?",
            options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Integration", "Automated Programming Interface"],
            correct: 0
        },
        {
            question: "Which company created the Python programming language?",
            options: ["Microsoft", "Google", "Guido van Rossum (individual)", "Oracle"],
            correct: 2
        },
        {
            question: "What is the default port for HTTP?",
            options: ["21", "80", "443", "8080"],
            correct: 1
        }
    ],
    it: [
        {
            question: "What does RAM stand for?",
            options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Remote Access Memory"],
            correct: 0
        },
        {
            question: "Which company manufactured the first commercial microprocessor?",
            options: ["AMD", "Intel", "IBM", "Motorola"],
            correct: 1
        },
        {
            question: "What does CPU stand for?",
            options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Unit", "Central Processor Utility"],
            correct: 0
        },
        {
            question: "What is the brain of the computer called?",
            options: ["RAM", "Hard Drive", "CPU", "Motherboard"],
            correct: 2
        },
        {
            question: "Which protocol is used to send emails?",
            options: ["HTTP", "FTP", "SMTP", "TCP"],
            correct: 2
        },
        {
            question: "What does USB stand for?",
            options: ["Universal Serial Bus", "Universal System Bus", "Unified Serial Bus", "United System Bus"],
            correct: 0
        },
        {
            question: "How many bits are in a byte?",
            options: ["4", "8", "16", "32"],
            correct: 1
        },
        {
            question: "What does IP in IP Address stand for?",
            options: ["Internet Protocol", "Internal Protocol", "Internet Process", "Internal Process"],
            correct: 0
        },
        {
            question: "Which storage device uses spinning platters?",
            options: ["SSD", "HDD", "USB Flash Drive", "RAM"],
            correct: 1
        },
        {
            question: "What is the maximum length of a standard Ethernet cable (Cat5e/Cat6)?",
            options: ["50 meters", "100 meters", "150 meters", "200 meters"],
            correct: 1
        }
    ],
    horror: [
        {
            question: "In which horror film does the character Freddy Krueger appear?",
            options: ["Friday the 13th", "Halloween", "A Nightmare on Elm Street", "Scream"],
            correct: 2
        },
        {
            question: "What is the name of the hotel in 'The Shining'?",
            options: ["The Overlook Hotel", "The Stanley Hotel", "The Grand Hotel", "The Mountain Hotel"],
            correct: 0
        },
        {
            question: "Who wrote the novel 'It' featuring Pennywise the clown?",
            options: ["Stephen King", "Dean Koontz", "H.P. Lovecraft", "Clive Barker"],
            correct: 0
        },
        {
            question: "In 'The Ring', how many days do people have after watching the cursed videotape?",
            options: ["3 days", "5 days", "7 days", "10 days"],
            correct: 2
        },
        {
            question: "What possessed doll appears in 'The Conjuring' universe?",
            options: ["Chucky", "Billy", "Annabelle", "Brahms"],
            correct: 2
        },
        {
            question: "In 'The Exorcist', what is the name of the possessed girl?",
            options: ["Carol Anne", "Regan", "Carrie", "Samara"],
            correct: 1
        },
        {
            question: "Which horror film features the Cenobites led by Pinhead?",
            options: ["Hellraiser", "Evil Dead", "Event Horizon", "The Omen"],
            correct: 0
        },
        {
            question: "What year was the original 'Halloween' movie released?",
            options: ["1975", "1978", "1980", "1982"],
            correct: 1
        },
        {
            question: "In 'Saw', what does the Jigsaw Killer make his victims do?",
            options: ["Solve riddles", "Play deadly games", "Find keys", "Run mazes"],
            correct: 1
        },
        {
            question: "What is the name of the Nostromo's computer in 'Alien'?",
            options: ["HAL", "MOTHER", "GLaDOS", "Skynet"],
            correct: 1
        }
    ]
};

let currentCategory = '';
let quizData = [];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const categorySelection = document.getElementById('category-selection');
const quizSection = document.getElementById('quiz-section');
const categoryTitle = document.getElementById('category-title');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const questionNumberElement = document.getElementById('question-number');
const totalQuestionsElement = document.getElementById('total-questions');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const finalScoreElement = document.getElementById('final-score');
const finalTotalElement = document.getElementById('final-total');
const percentageElement = document.getElementById('percentage');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');
const backBtn = document.getElementById('back-btn');

function selectCategory(category) {
    currentCategory = category;
    quizData = quizzes[category];
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    scoreElement.textContent = score;

    const titles = {
        chess: '♔ CHESS QUIZ ♔',
        programming: '⌨ PROGRAMMING QUIZ ⌨',
        it: '💾 IT & TECH QUIZ 💾',
        horror: '🎃 HORROR QUIZ 🎃'
    };

    categoryTitle.textContent = titles[category];
    categorySelection.style.display = 'none';
    quizSection.style.display = 'block';
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    totalQuestionsElement.textContent = quizData.length;
    loadQuestion();
}

function goHome() {
    categorySelection.style.display = 'block';
    quizSection.style.display = 'none';
}

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    nextBtn.style.display = 'none';

    currentQuizData.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });

    questionNumberElement.textContent = currentQuestion + 1;
}

function selectOption(index) {
    if (selectedAnswer !== null) return;

    selectedAnswer = index;
    const options = document.querySelectorAll('.option');
    const correctAnswer = quizData[currentQuestion].correct;

    options.forEach((option, idx) => {
        option.classList.add('disabled');
        if (idx === correctAnswer) {
            option.classList.add('correct');
        }
        if (idx === selectedAnswer && idx !== correctAnswer) {
            option.classList.add('incorrect');
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        scoreElement.textContent = score;
    }

    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreElement.textContent = score;
    finalTotalElement.textContent = quizData.length;

    const percentage = Math.round((score / quizData.length) * 100);
    percentageElement.textContent = `You got ${percentage}% correct!`;

    if (percentage >= 80) {
        percentageElement.textContent += ' Excellent! You\'re a chess master!';
    } else if (percentage >= 60) {
        percentageElement.textContent += ' Good job! Keep learning!';
    } else {
        percentageElement.textContent += ' Keep practicing!';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    scoreElement.textContent = score;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
homeBtn.addEventListener('click', goHome);
backBtn.addEventListener('click', goHome);

// Facts data array
const factsData = [
    {
        title: "🦠 FIRST COMPUTER VIRUS",
        subtitle: "CREEPER (1971)",
        content: [
            'The first computer virus was called "Creeper" and displayed the message: "I\'M THE CREEPER, CATCH ME IF YOU CAN!"',
            "It was created by Bob Thomas as an experimental self-replicating program on ARPANET.",
            "Creeper infected DEC PDP-10 computers running the TENEX operating system.",
            "The virus would move between computers, deleting itself from the previous machine - a primitive form of self-replication.",
            "It wasn't malicious - just a proof-of-concept experiment to see if a program could spread itself.",
            "This led to the creation of the first antivirus program, Reaper, which would hunt down and remove Creeper.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Creeper_and_Reaper" target="_blank">https://en.wikipedia.org/wiki/Creeper_and_Reaper</a>'
        ]
    },
    {
        title: "🛡️ FIRST ANTIVIRUS",
        subtitle: "REAPER (1971)",
        content: [
            'To combat Creeper, the first antivirus program "Reaper" was created. It would chase Creeper and delete it!',
            "The very first cyber security battle in history!",
            "Reaper was also written by Bob Thomas (or possibly Ray Tomlinson - sources differ).",
            "Like Creeper, Reaper was a self-replicating program, but its purpose was to seek out and destroy Creeper.",
            "Ironically, the first antivirus was also technically a virus since it replicated itself across the network.",
            "This set the precedent for the ongoing cat-and-mouse game between viruses and antivirus software.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Creeper_and_Reaper" target="_blank">https://en.wikipedia.org/wiki/Creeper_and_Reaper</a>'
        ]
    },
    {
        title: "📧 FIRST EMAIL",
        subtitle: "RAY TOMLINSON (1971)",
        content: [
            'Ray Tomlinson sent the first email in 1971. He also chose the "@" symbol for email addresses!',
            'The first email was just a test message: "QWERTYUIOP" or something similar. He doesn\'t remember exactly!',
            "Tomlinson was working on ARPANET, the precursor to the Internet, when he created email.",
            'He chose "@" because it meant "at" and wasn\'t used in names, making it perfect for user@host addressing.',
            "Before this, you could only send messages to users on the same computer.",
            "Email revolutionized communication and became one of the Internet's killer apps.",
            "Today, over 300 billion emails are sent daily worldwide!",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Ray_Tomlinson" target="_blank">https://en.wikipedia.org/wiki/Ray_Tomlinson</a>'
        ]
    },
    {
        title: "🕹️ FIRST VIDEO GAME",
        subtitle: "PONG (1972)",
        content: [
            "Pong was the first commercially successful video game. It was so popular that the prototype broke because it was filled with too many quarters!",
            "Created by Atari founder Nolan Bushnell and programmed by Allan Alcorn.",
            "The game was a simple 2D tennis simulation - revolutionary for its time!",
            "The prototype was tested at Andy Capp's Tavern in Sunnyvale, California.",
            "Within a few days, the machine stopped working because the coin box was overflowing.",
            "Pong launched the video game industry and made Atari a household name.",
            "Note: Earlier games like Spacewar! (1962) and Tennis for Two (1958) existed but weren't commercially released.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Pong" target="_blank">https://en.wikipedia.org/wiki/Pong</a>'
        ]
    },
    {
        title: "💾 FLOPPY DISK",
        subtitle: "1971 - 8 INCH!",
        content: [
            "The first floppy disk was 8 inches in diameter and could hold 80 KB of data.",
            "By comparison, a single photo today is often 3-5 MB!",
            "Invented by IBM engineer Alan Shugart and his team in the late 1960s.",
            "Originally developed as a way to load microcode into IBM System/370 mainframes.",
            "The disk was called 'floppy' because it was made of flexible plastic, unlike rigid hard disks.",
            "Later versions: 5.25-inch (1976) with 360 KB, and 3.5-inch (1982) with 1.44 MB.",
            "Floppy disks were the primary storage medium until CDs and USB drives replaced them in the 2000s.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Floppy_disk" target="_blank">https://en.wikipedia.org/wiki/Floppy_disk</a>'
        ]
    },
    {
        title: "🌐 FIRST WEBSITE",
        subtitle: "1991 - CERN",
        content: [
            "The first website went live on August 6, 1991, at CERN. It explained what the World Wide Web was!",
            "Created by Tim Berners-Lee, a British scientist at CERN in Switzerland.",
            "The site provided information about the World Wide Web project and how to create web pages.",
            "Original URL: http://info.cern.ch/hypertext/WWW/TheProject.html (still accessible today!)",
            "The first web server was a NeXT computer with a label: 'This machine is a server. DO NOT POWER IT DOWN!!'",
            "Berners-Lee also invented HTML, HTTP, and URLs - the foundation of the modern web.",
            "By 1993, CERN made the WWW technology freely available to everyone.",
            'Visit the first website: <a href="http://info.cern.ch/hypertext/WWW/TheProject.html" target="_blank">http://info.cern.ch/hypertext/WWW/TheProject.html</a>'
        ]
    },
    {
        title: "🎮 GAME BOY",
        subtitle: "1989 - 118 MILLION SOLD",
        content: [
            "The original Game Boy had a greenish screen, no backlight, and used 4 AA batteries lasting 15 hours!",
            "Tetris was the pack-in game and became the best-seller.",
            "Designed by Gunpei Yokoi and released by Nintendo on April 21, 1989 in Japan.",
            "The monochrome display (4 shades of green) was chosen for longer battery life.",
            "Game Boy outsold technically superior competitors like Sega Game Gear and Atari Lynx.",
            "It survived a Gulf War bombing - the damaged unit is displayed at the Nintendo New York store!",
            "The Game Boy line (including Color, Advance) sold over 200 million units total.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Game_Boy" target="_blank">https://en.wikipedia.org/wiki/Game_Boy</a>'
        ]
    },
    {
        title: "💿 CD-ROM",
        subtitle: "1985 - 700 MB",
        content: [
            "The first CD-ROMs could hold 700 MB - equivalent to hundreds of floppy disks!",
            "Early CD-ROM drives had 1x speed (150 KB/s). Modern drives are 52x or faster!",
            "CD-ROM stands for Compact Disc Read-Only Memory.",
            "Developed jointly by Sony and Philips, building on audio CD technology from 1982.",
            "The 700 MB capacity could store about 80 minutes of audio or 450,000 pages of text.",
            "First used for software distribution, encyclopedias (Encarta!), and multimedia.",
            "CD-ROMs revolutionized software distribution - no more disk swapping!",
            'Learn more: <a href="https://en.wikipedia.org/wiki/CD-ROM" target="_blank">https://en.wikipedia.org/wiki/CD-ROM</a>'
        ]
    },
    {
        title: "🖱️ COMPUTER MOUSE",
        subtitle: "1964 - WOODEN!",
        content: [
            "The first computer mouse was invented by Douglas Engelbart in 1964 and was made of wood!",
            "It had only one button and was called a mouse because the cord looked like a tail.",
            "Engelbart called it an 'X-Y position indicator for a display system.'",
            "The prototype featured two perpendicular wheels that tracked movement.",
            "First demonstrated publicly at 'The Mother of All Demos' in 1968 - a legendary presentation!",
            "Xerox PARC refined the design with a ball mouse in the 1970s.",
            "The mouse became mainstream with Apple Macintosh (1984) and later Windows PCs.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Computer_mouse" target="_blank">https://en.wikipedia.org/wiki/Computer_mouse</a>'
        ]
    },
    {
        title: "👾 SPACE INVADERS",
        subtitle: "1978 - YEN SHORTAGE",
        content: [
            "Space Invaders was so popular in Japan that it caused a temporary shortage of 100-yen coins!",
            "The government had to increase coin production to meet demand.",
            "Created by Tomohiro Nishikado and released by Taito in 1978.",
            "The game's increasing difficulty (aliens speed up as you destroy them) was actually a hardware limitation!",
            "As fewer aliens remained on screen, the processor had less to render, making them faster.",
            "Space Invaders is credited with launching the golden age of arcade games.",
            "It's one of the highest-grossing video games of all time, earning billions in quarters.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Space_Invaders" target="_blank">https://en.wikipedia.org/wiki/Space_Invaders</a>'
        ]
    },
    {
        title: "📟 FIRST SPAM EMAIL",
        subtitle: "1978 - DEC",
        content: [
            "The first spam email was sent in 1978 by Gary Thuerk, marketing DEC computers to 400 people.",
            "It actually resulted in $13 million in sales!",
            "Sent on May 3, 1978, over ARPANET to promote DEC's new DECSYSTEM-20 computers.",
            "The recipients were ARPANET users on the West Coast - many complained about the unwanted message.",
            "Thuerk is now known as the 'Father of Spam' (not a title to be proud of!).",
            "Today, spam makes up about 45-50% of all email traffic worldwide.",
            "The term 'spam' for unwanted messages comes from a Monty Python sketch.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Email_spam#History" target="_blank">https://en.wikipedia.org/wiki/Email_spam</a>'
        ]
    },
    {
        title: "🎵 FIRST MP3 PLAYER",
        subtitle: "1997 - MPMAN F10",
        content: [
            "The first portable MP3 player was the MPMan F10 with 32 MB of memory (about 8 songs).",
            "It came out 2 years before the iPod!",
            "Developed by South Korean company SaeHan Information Systems and released in March 1998.",
            "The MPMan F10 cost about $250 and had a small LCD screen.",
            "Memory could be expanded to 64 MB with a SmartMedia card.",
            "Other early competitors: Diamond Rio PMP300 (1998), Creative NOMAD (1999).",
            "The iPod (2001) popularized MP3 players with its 'click wheel' interface and iTunes integration.",
            "MP3 players have since been replaced by smartphones for most users.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/MPMan" target="_blank">https://en.wikipedia.org/wiki/MPMan</a>'
        ]
    },
    {
        title: "⚙️ C LANGUAGE",
        subtitle: "1972 - DENNIS RITCHIE",
        content: [
            "C was created by Dennis Ritchie at Bell Labs between 1972 and 1973 to develop the UNIX operating system.",
            "It's called 'C' because it was based on an earlier language called 'B'.",
            "C is a procedural, compiled language that provides low-level access to memory and requires minimal runtime support.",
            "C is still widely used today in operating systems (Linux, Windows kernel), embedded systems, and game engines.",
            "The classic first program 'Hello, World!' was introduced in the C Programming Language book (1978) by Kernighan & Ritchie.",
            "Key features: Pointers, manual memory management, structs, preprocessor directives.",
            "C standards: K&R C (1978), ANSI C/C89 (1989), C99 (1999), C11 (2011), C17 (2017), C23 (2023).",
            'Learn more: <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank">https://en.wikipedia.org/wiki/C_(programming_language)</a>'
        ]
    },
    {
        title: "🔧 C++ LANGUAGE",
        subtitle: "1985 - BJARNE STROUSTRUP",
        content: [
            "C++ was created by Bjarne Stroustrup in 1985 as an extension of C with object-oriented features.",
            "Originally called 'C with Classes', the name C++ comes from the increment operator (++), suggesting it's one step beyond C.",
            "C++ is a multi-paradigm language supporting procedural, object-oriented, and generic programming.",
            "Used in major applications: Adobe Photoshop, Microsoft Office, game engines (Unreal Engine, Unity backend), and browsers (Chrome, Firefox).",
            "Key features: Classes, templates, operator overloading, multiple inheritance, RAII, STL (Standard Template Library).",
            "The '++' in C++ is a programmer joke - it returns the old value before incrementing!",
            "Modern C++ standards: C++98, C++03, C++11, C++14, C++17, C++20, C++23.",
            'Official website: <a href="https://isocpp.org/" target="_blank">https://isocpp.org/</a>',
            'Learn more: <a href="https://en.cppreference.com/" target="_blank">https://en.cppreference.com/</a>'
        ]
    },
    {
        title: "🎯 C# LANGUAGE",
        subtitle: "2000 - MICROSOFT",
        content: [
            "C# (C-Sharp) was developed by Microsoft and released in 2000 as part of the .NET initiative.",
            "Led by Anders Hejlsberg, who also designed Turbo Pascal and Delphi.",
            "The name 'C#' comes from musical notation where # (sharp) indicates a semitone higher, implying it's one level above C++.",
            "C# is an object-oriented, type-safe language with automatic memory management (garbage collection).",
            "Used extensively in game development with Unity engine, which powers over 50% of mobile games!",
            "Key features: LINQ, async/await, properties, events, delegates, generics, pattern matching.",
            "Runs on .NET runtime (formerly .NET Framework, now .NET Core/.NET 5+) which is cross-platform.",
            "Popular for: Desktop apps (WPF, WinForms), web apps (ASP.NET), games (Unity), enterprise software.",
            'Official website: <a href="https://dotnet.microsoft.com/languages/csharp" target="_blank">https://dotnet.microsoft.com/languages/csharp</a>',
            'Learn more: <a href="https://learn.microsoft.com/en-us/dotnet/csharp/" target="_blank">https://learn.microsoft.com/en-us/dotnet/csharp/</a>'
        ]
    },
    {
        title: "☕ JAVA LANGUAGE",
        subtitle: "1995 - SUN MICROSYSTEMS",
        content: [
            "Java was created by James Gosling at Sun Microsystems and released in 1995. Now owned by Oracle.",
            "Originally called 'Oak' after an oak tree outside Gosling's office, renamed to 'Java' after the Indonesian coffee.",
            "Famous slogan: 'Write Once, Run Anywhere' (WORA) - code runs on any device with a Java Virtual Machine (JVM).",
            "Java is object-oriented, class-based, and designed for platform independence.",
            "Powers 3 billion devices worldwide, including Android apps (Android SDK), enterprise software, and Minecraft!",
            "Key features: Strong typing, automatic garbage collection, rich standard library, multithreading, exception handling.",
            "Java versions: Java SE (Standard Edition), Java EE (Enterprise Edition), Java ME (Micro Edition).",
            "Popular frameworks: Spring, Hibernate, Apache Struts, JavaFX.",
            'Official website: <a href="https://www.oracle.com/java/" target="_blank">https://www.oracle.com/java/</a>',
            'Learn more: <a href="https://dev.java/" target="_blank">https://dev.java/</a> and <a href="https://docs.oracle.com/en/java/" target="_blank">https://docs.oracle.com/en/java/</a>'
        ]
    },
    {
        title: "📜 JAVASCRIPT",
        subtitle: "1995 - BRENDAN EICH",
        content: [
            "JavaScript was created by Brendan Eich in just 10 days in May 1995 while working at Netscape.",
            "Originally named 'Mocha', then 'LiveScript', finally 'JavaScript' for marketing (despite no relation to Java!).",
            "JavaScript is NOT Java - the names are similar only due to a marketing agreement between Netscape and Sun.",
            "JavaScript is a high-level, dynamic, prototype-based, multi-paradigm language.",
            "Now runs everywhere: browsers, servers (Node.js), mobile apps (React Native), desktop apps (Electron), even robots and IoT devices!",
            "Key features: First-class functions, closures, prototypal inheritance, async/await, promises, dynamic typing.",
            "ECMAScript standards: ES5 (2009), ES6/ES2015 (major update), ES2016-ES2024 (yearly updates).",
            "Popular frameworks: React, Vue, Angular, Next.js, Express.js, Svelte.",
            'Official ECMAScript spec: <a href="https://tc39.es/ecma262/" target="_blank">https://tc39.es/ecma262/</a>',
            'Learn more: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript</a>'
        ]
    },
    {
        title: "🐍 PYTHON LANGUAGE",
        subtitle: "1991 - GUIDO VAN ROSSUM",
        content: [
            "Python was created by Guido van Rossum and first released in 1991.",
            "Named after 'Monty Python's Flying Circus', not the snake! Guido was reading the scripts while implementing Python.",
            "Python is a high-level, interpreted language emphasizing code readability with significant whitespace (indentation).",
            "Python's philosophy: 'There should be one-- and preferably only one --obvious way to do it.' (The Zen of Python - PEP 20)",
            "Used by NASA, Google, Instagram, Spotify, Netflix, and is the #1 language for AI/Machine Learning!",
            "Key features: Dynamic typing, automatic memory management, rich standard library, multiple paradigms (OOP, functional, procedural).",
            "Python versions: Python 2.x (legacy, EOL 2020), Python 3.x (current, backwards incompatible with 2.x).",
            "Popular frameworks: Django, Flask, FastAPI (web), TensorFlow, PyTorch (ML), NumPy, Pandas (data science).",
            'Official website: <a href="https://www.python.org/" target="_blank">https://www.python.org/</a>',
            'Learn more: <a href="https://docs.python.org/" target="_blank">https://docs.python.org/</a>'
        ]
    },
    {
        title: "🔥 MALBOLGE",
        subtitle: "1998 - THE HARDEST LANGUAGE",
        content: [
            "Malbolge is considered the hardest programming language ever created, designed by Ben Olmstead in 1998.",
            "Named after the 8th circle of Hell in Dante's Inferno, reserved for fraudsters and deceivers.",
            "The first Malbolge program took 2 YEARS to write - and it was created by a beam search algorithm, not a human!",
            "A simple 'Hello World' program is nearly impossible to write by hand - most programs are generated by computers.",
            "The language uses base-3 arithmetic, self-modifying code, and encryption to make programming nearly impossible.",
            "Instructions are encrypted and the encryption key changes after each instruction executes!",
            "Even the creator couldn't write programs in it - he had to use automated tools to generate code.",
            "Only a handful of Malbolge programs exist, all created by computer search algorithms.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Malbolge" target="_blank">https://en.wikipedia.org/wiki/Malbolge</a>',
            'Try it online: <a href="https://esolangs.org/wiki/Malbolge" target="_blank">https://esolangs.org/wiki/Malbolge</a>'
        ]
    },
    {
        title: "🧠 BRAINFUCK",
        subtitle: "1993 - MINIMALIST MADNESS",
        content: [
            "Created by Urban Müller in 1993, Brainfuck has only 8 commands: > < + - . , [ ]",
            "Despite its simplicity, it's Turing-complete - meaning it can theoretically compute anything computable!",
            "A 'Hello World' program requires over 100 characters of seemingly random symbols.",
            "The name reflects the difficulty - it will literally hurt your brain to write programs in it!",
            "Smallest compiler ever: just 240 bytes! The entire language fits in a tweet.",
            "Each command operates on an array of memory cells (like an infinite tape in a Turing machine).",
            "Commands: > (move right), < (move left), + (increment), - (decrement), . (output), , (input), [ ] (loop).",
            "Inspired many derivatives: Befunge, Ook!, Boolfuck, and hundreds more esoteric languages.",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Brainfuck" target="_blank">https://en.wikipedia.org/wiki/Brainfuck</a>',
            'Try it online: <a href="https://esolangs.org/wiki/Brainfuck" target="_blank">https://esolangs.org/wiki/Brainfuck</a>'
        ]
    },
    {
        title: "🥞 CHEF",
        subtitle: "2002 - PROGRAMS AS RECIPES",
        content: [
            "Chef was designed by David Morgan-Mar in 2002 - programs look like actual cooking recipes!",
            "Variables are 'ingredients', loops are 'mixing', output is 'serving' - completely food-themed.",
            "Example: 'Put asparagus into the mixing bowl' actually means assigning a value to a variable.",
            "A valid Chef program must also be a valid recipe you could theoretically cook!",
            "Hello World starts with: 'Ingredients. 72 g haricot beans. 101 eggs. 108 g lard...' (ASCII values!)",
            "Program structure includes: Title, Comments, Ingredient list, Cooking time, Temperature, Method, and Serves.",
            "Mixing bowls are stacks, baking dishes are output, and the oven can sort values!",
            "Some Chef programs are award-winning recipes - both valid code AND delicious food!",
            'Learn more: <a href="https://esolangs.org/wiki/Chef" target="_blank">https://esolangs.org/wiki/Chef</a>',
            'View recipes: <a href="https://www.dangermouse.net/esoteric/chef.html" target="_blank">https://www.dangermouse.net/esoteric/chef.html</a>'
        ]
    },
    {
        title: "🎨 PIET",
        subtitle: "2002 - CODE AS ART",
        content: [
            "Created by David Morgan-Mar (also made Chef!), Piet programs are abstract paintings!",
            "Named after Dutch painter Piet Mondrian, known for geometric abstract art.",
            "Code is written as colored blocks - the interpreter reads the colors to execute commands.",
            "A 'Hello World' program looks like a colorful abstract artwork you'd hang on a wall!",
            "Pixels and color transitions determine program flow - imagine debugging a painting!",
            "Uses 20 colors: 6 hues (red, yellow, green, cyan, blue, magenta) × 3 lightness levels + black and white.",
            "The language is stack-based - operations push and pop values like RPN calculators.",
            "Color changes determine operations: hue change = operation type, lightness change = operation parameter.",
            "Piet programs have been displayed in art galleries as legitimate artwork!",
            'Learn more: <a href="https://esolangs.org/wiki/Piet" target="_blank">https://esolangs.org/wiki/Piet</a>',
            'Official site: <a href="https://www.dangermouse.net/esoteric/piet.html" target="_blank">https://www.dangermouse.net/esoteric/piet.html</a>'
        ]
    },
    {
        title: "🐄 COW",
        subtitle: "2003 - MOO MOO CODE",
        content: [
            "COW language has only 4 commands, all variations of 'moo': MOO, mOo, moO, and moo (case matters!).",
            "Created by Sean Heber in 2003 as a joke language.",
            "Programs look like this: 'MoO moO MoO mOo MOO OOM MMM moO moO' - just cow sounds!",
            "Despite looking ridiculous, it's Turing-complete and can perform any computation.",
            "Reading COW code out loud sounds like a farm - perfect for cow-themed applications!",
            "The language is a variant of Brainfuck with cow-themed syntax.",
            "Commands: moo (no-op), mOo (move memory pointer), moO (execute conditional), MOO (execute loop), etc.",
            "There's even an interpreter called 'cowsay' (not to be confused with the Unix utility!).",
            'Learn more: <a href="https://esolangs.org/wiki/COW" target="_blank">https://esolangs.org/wiki/COW</a>',
            'Try the interpreter: <a href="https://bigzaphod.github.io/COW/" target="_blank">https://bigzaphod.github.io/COW/</a>'
        ]
    },
    {
        title: "🚀 WHITESPACE",
        subtitle: "2003 - INVISIBLE CODE",
        content: [
            "Whitespace was created in 2003 by Edwin Brady and Chris Morris on April 1st (April Fools!).",
            "ONLY uses whitespace characters: spaces, tabs, and linefeeds. All other characters are ignored!",
            "You can hide Whitespace programs inside normal-looking code in other languages - steganographic programming!",
            "Impossible to read without special tools since the code is literally invisible.",
            "The ultimate troll language - your code editor will show a blank file!",
            "Space = 0, Tab = 1 in the instruction encoding - it's essentially binary programming with whitespace.",
            "The language has stack operations, arithmetic, heap access, flow control, and I/O.",
            "You can embed Whitespace code in the comments of other programs without anyone noticing!",
            "Debugging requires special tools that visualize spaces and tabs (usually as [S] and [T]).",
            'Learn more: <a href="https://en.wikipedia.org/wiki/Whitespace_(programming_language)" target="_blank">https://en.wikipedia.org/wiki/Whitespace_(programming_language)</a>',
            'Official site: <a href="https://web.archive.org/web/20150717140342/http://compsoc.dur.ac.uk/whitespace/" target="_blank">Archive of original site</a>'
        ]
    }
];

// Toggle Retro Facts Dropdown
function toggleRetroFacts() {
    const retroDropdown = document.getElementById('retro-dropdown');
    const progDropdown = document.getElementById('prog-dropdown');
    const esotericDropdown = document.getElementById('esoteric-dropdown');

    if (retroDropdown.style.display === 'none') {
        retroDropdown.style.display = 'block';
        progDropdown.style.display = 'none';
        esotericDropdown.style.display = 'none';
    } else {
        retroDropdown.style.display = 'none';
    }
}

// Toggle Programming Languages Dropdown
function toggleProgLangs() {
    const retroDropdown = document.getElementById('retro-dropdown');
    const progDropdown = document.getElementById('prog-dropdown');
    const esotericDropdown = document.getElementById('esoteric-dropdown');

    if (progDropdown.style.display === 'none') {
        progDropdown.style.display = 'block';
        retroDropdown.style.display = 'none';
        esotericDropdown.style.display = 'none';
    } else {
        progDropdown.style.display = 'none';
    }
}

// Toggle Esoteric Languages Dropdown
function toggleEsoteric() {
    const retroDropdown = document.getElementById('retro-dropdown');
    const progDropdown = document.getElementById('prog-dropdown');
    const esotericDropdown = document.getElementById('esoteric-dropdown');

    if (esotericDropdown.style.display === 'none') {
        esotericDropdown.style.display = 'block';
        retroDropdown.style.display = 'none';
        progDropdown.style.display = 'none';
    } else {
        esotericDropdown.style.display = 'none';
    }
}

// Show individual fact
function showFact(index) {
    const fact = factsData[index];
    const modal = document.getElementById('fact-detail-modal');
    const title = document.getElementById('fact-detail-title');
    const body = document.getElementById('fact-detail-body');

    // Close all dropdowns
    document.getElementById('retro-dropdown').style.display = 'none';
    document.getElementById('prog-dropdown').style.display = 'none';
    document.getElementById('esoteric-dropdown').style.display = 'none';

    // Set content
    title.textContent = `*** ${fact.title} ***`;

    let bodyHTML = `<strong>${fact.subtitle}</strong>`;
    fact.content.forEach(paragraph => {
        bodyHTML += `<p>${paragraph}</p>`;
    });
    body.innerHTML = bodyHTML;

    // Show modal
    modal.style.display = 'flex';
}

// Close fact detail
function closeFact() {
    document.getElementById('fact-detail-modal').style.display = 'none';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const retroDropdown = document.getElementById('retro-dropdown');
    const progDropdown = document.getElementById('prog-dropdown');
    const esotericDropdown = document.getElementById('esoteric-dropdown');
    const dropdownContainer = event.target.closest('.dropdown-container');

    if (!dropdownContainer) {
        if (retroDropdown) retroDropdown.style.display = 'none';
        if (progDropdown) progDropdown.style.display = 'none';
        if (esotericDropdown) esotericDropdown.style.display = 'none';
    }
});

// Toggle Weather Section
function toggleWeather() {
    const weatherModal = document.getElementById('weather-modal');
    const retroDropdown = document.getElementById('retro-dropdown');
    const progDropdown = document.getElementById('prog-dropdown');
    const esotericDropdown = document.getElementById('esoteric-dropdown');

    if (weatherModal.style.display === 'none') {
        weatherModal.style.display = 'flex';
        retroDropdown.style.display = 'none';
        progDropdown.style.display = 'none';
        esotericDropdown.style.display = 'none';
        loadWeather();
    } else {
        weatherModal.style.display = 'none';
    }
}

// Load Weather Data
function loadWeather() {
    const weatherContent = document.getElementById('weather-content');

    // Check if geolocation is available
    if (navigator.geolocation) {
        weatherContent.innerHTML = '<div class="weather-display"><p class="blink">ACQUIRING COORDINATES...</p></div>';

        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(lat, lon);
            },
            error => {
                // Default to a major city if geolocation fails
                weatherContent.innerHTML = `
                    <div class="weather-display">
                        <p style="color: #ff0000;">ERROR: GEOLOCATION DENIED</p>
                        <p>USING DEFAULT LOCATION: NEW YORK CITY</p>
                    </div>`;
                fetchWeatherData(40.7128, -74.0060);
            }
        );
    } else {
        weatherContent.innerHTML = `
            <div class="weather-display">
                <p style="color: #ff0000;">ERROR: GEOLOCATION NOT SUPPORTED</p>
                <p>USING DEFAULT LOCATION: NEW YORK CITY</p>
            </div>`;
        fetchWeatherData(40.7128, -74.0060);
    }
}

// Fetch Weather from Open-Meteo API (free, no key required)
function fetchWeatherData(lat, lon) {
    const weatherContent = document.getElementById('weather-content');

    // First get weather data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`;

    // Get location name using reverse geocoding
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`;

    Promise.all([
        fetch(weatherUrl).then(r => r.json()),
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            .then(r => r.json())
            .catch(() => ({ city: 'Unknown Location', locality: '' }))
    ])
        .then(([weatherData, locationData]) => {
            const temp = Math.round(weatherData.current.temperature_2m);
            const humidity = weatherData.current.relative_humidity_2m;
            const windSpeed = Math.round(weatherData.current.wind_speed_10m);
            const weatherCode = weatherData.current.weather_code;
            const weatherDesc = getWeatherDescription(weatherCode);

            // Get city name
            const cityName = locationData.city || locationData.locality || locationData.principalSubdivision || 'Unknown Location';
            const countryName = locationData.countryName || '';

            weatherContent.innerHTML = `
                <div class="weather-display">
                    <div class="weather-info">
                        <p>╔════════════════════════════════╗</p>
                        <p>║  CURRENT WEATHER CONDITIONS   ║</p>
                        <p>╚════════════════════════════════╝</p>
                        <p></p>
                        <p>LOCATION: ${cityName}, ${countryName}</p>
                        <p>COORDINATES: ${lat.toFixed(2)}°, ${lon.toFixed(2)}°</p>
                        <p>CONDITIONS: ${weatherDesc}</p>
                        <p class="temp-large">${temp}°C</p>
                        <p>HUMIDITY: ${humidity}%</p>
                        <p>WIND SPEED: ${windSpeed} km/h</p>
                        <p></p>
                        <p class="blink">[ DATA UPDATED SUCCESSFULLY ]</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            weatherContent.innerHTML = `
                <div class="weather-display">
                    <p style="color: #ff0000;">ERROR: FAILED TO RETRIEVE WEATHER DATA</p>
                    <p>SYSTEM MESSAGE: ${error.message}</p>
                    <p></p>
                    <p>PLEASE CHECK YOUR INTERNET CONNECTION</p>
                    <p>AND TRY AGAIN LATER</p>
                </div>
            `;
        });
}

// Weather code descriptions
function getWeatherDescription(code) {
    const descriptions = {
        0: 'CLEAR SKY',
        1: 'MAINLY CLEAR',
        2: 'PARTLY CLOUDY',
        3: 'OVERCAST',
        45: 'FOGGY',
        48: 'DEPOSITING RIME FOG',
        51: 'LIGHT DRIZZLE',
        53: 'MODERATE DRIZZLE',
        55: 'DENSE DRIZZLE',
        61: 'SLIGHT RAIN',
        63: 'MODERATE RAIN',
        65: 'HEAVY RAIN',
        71: 'SLIGHT SNOW',
        73: 'MODERATE SNOW',
        75: 'HEAVY SNOW',
        80: 'SLIGHT RAIN SHOWERS',
        81: 'MODERATE RAIN SHOWERS',
        82: 'VIOLENT RAIN SHOWERS',
        95: 'THUNDERSTORM',
        96: 'THUNDERSTORM WITH HAIL',
        99: 'THUNDERSTORM WITH HEAVY HAIL'
    };
    return descriptions[code] || 'UNKNOWN CONDITIONS';
}
