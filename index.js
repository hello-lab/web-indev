
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(cors());



app.use(express.static('src'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/stuff.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/projects.html'));
});

app.get('/getinvolved', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/getinvolved.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/home.html'));
});
app.get('/home1', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/home1.html'));
});










app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/stuff.html'));
});
app.post('/signup', async (req, res) => {
    const { username, password, email ,institute} = req.body;
console.log(req.body)
    try {
      
        const hashedPassword = await bcrypt.hash(password, 10);

      
        const result = await query(
            'INSERT INTO users (username, password, email,institute) VALUES (?, ?, ?,?)',
            [username, hashedPassword, email,institute]
        );

        res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
    
        const result = await query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        const user = result[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('jwt', token, { httpOnly: true, secure: true }); // Use 'secure: true' in production
        res.redirect('home');
        ///store jwt token in file
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

app.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await query(
            'SELECT id, username, email FROM users WHERE id = ?',
            [decoded.id]
        );

        const user = result[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

//for real?
const fr = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req.cookie)
 //console.log(token.split(' ')[1])
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
 
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
 
        req.user = user;
        next();
    });
};
 
// 


//ai shi

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  };
  
  async function gib_ques(no,subj,topic) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "generate a 5 question quiz of physics units and measurements in json format dont include any other text except the json"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "\n[\n  {\n    \"question\": \"What is the SI unit of time?\",\n    \"options\": [\"second\", \"minute\", \"hour\", \"day\"],\n    \"answer\": \"second\"\n  },\n  {\n    \"question\": \"What is the symbol for the prefix 'kilo'?\",\n    \"options\": [\"k\", \"m\", \"c\", \"n\"],\n    \"answer\": \"k\"\n  },\n  {\n    \"question\": \"Which of the following is a derived unit?\",\n    \"options\": [\"meter\", \"second\", \"kilogram\", \"joule\"],\n    \"answer\": \"joule\"\n  },\n  {\n    \"question\": \"What is the unit of measurement for power?\",\n    \"options\": [\"watt\", \"joule\", \"newton\", \"ampere\"],\n    \"answer\": \"watt\"\n  },\n  {\n    \"question\": \"How many millimeters are there in one centimeter?\",\n    \"options\": [\"1\", \"10\", \"100\", \"1000\"],\n    \"answer\": \"10\"\n  }\n]\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("generate a "+no+" question quiz of "+ subj +" "+topic +"in json format dont include any other text except the json");
   return (JSON.parse(result.response.text()));
  }
  
  async function kotha(batra) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    
    });
  
    const result = await chatSession.sendMessage("help the person with the problem  use html to format text\n"+batra);
   return ((result.response.text()));
  }
  


  app.post('/ques', fr, (req, res) => {
    //console.log(req.body)
    gib_ques(req.body.no, req.body.subject ,req.body.topic).then((ques)=>
res.send((ques))
)
});
//textile e ashe chat gulo format it arghya
app.post('/chatai', fr, (req, res) => {
    //console.log(req.body)
    kotha(req.body.chat).then((chaat)=>
res.send((chaat))
)
});


//forums
app.post('/getforum', fr, (req, res) => {
    //console.log(req.body)
    //console.log(req.user.username)
    query(
        'SELECT username,chat FROM chats '
    ).then((chats)=>{res.send(chats)})
});

app.post('/sendchat', fr, (req, res) => {
    //console.log(req.body)
    //console.log(req.user.username)
     query(
        'INSERT INTO chats (username, chat) VALUES (?, ?)',
        [req.user.username,  req.body.chat]
    ).then(()=> res.status(200).send('ok'))
});















app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
