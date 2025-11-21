import express from "express";

import morgan from "morgan";

const app = express();
app.use(morgan('dev'));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container!", "names": "Andy & Shreya" });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/api/time", (req, res) => {
  res.json({"timezone": "UTC", "currentTime": new Date().toLocaleTimeString()});
})

app.get("/math/circle/:r", (req, res)=> {
  let r = Number(req.params.r);
  let area = Math.PI * r * r; 
  let circumference = Math.PI * r * 2;
  res.json({"area": area, "circumference": circumference});

})

app.get("/math/rectangle/:width/:height", (req, res)=> {
  let width = Number(req.params.width);
  let height = Number(req.params.height);
  let area = width * height; 
  let perimeter = 2 * (width + height); 
  res.json({"area": area, "perimeter": perimeter});

})

app.get("/math/power/:base/:exponent", (req, res)=> {
  let base = Number(req.params.base);
  let exponent = Number(req.params.exponent);
  let result = Math.pow(base, exponent);
  
  if (req.query.root === "true"){
    res.json({"result":result, "root":exponent});}
  else{
    res.json({"result":result});
  }

  })

let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It is not that I am so smart, it is just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];

app.get("/quotebook/categories", (req, res)=> {
  let response = "";
  for (let c of categories) {
    response = response + ( "a possible category is " + c + "\n");
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

app.get("/quotebook/quote/:category", (req, res) => {
  let category = req.params.category;
  let quotes;
  switch (category) {
    case "successQuotes":
      quotes = successQuotes;
      break;
    case "perseveranceQuotes":
      quotes = perseveranceQuotes;
      break;
    case "happinessQuotes":
      quotes = happinessQuotes;
      break;
    default:
      return res
      .status(404)
      .json({ error: `no category listed for ${category}` });
  }
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  res.json(randomQuote);
});

app.post("/quotebook/quote/new", (req,res) => {

  let {category, quote, author} = req.body;

  if (!category || !quote || !author) {
  return res
    .status(400)
    .json({ error: "invalid or insufficient user input" });
  } 

  if (!categories.includes(category)) {
  return res
    .status(400)
    .json({ error: "invalid or insufficient user input" });
  }  

  
  let targetCategory;

  switch (category) {
    case "successQuotes":
      targetCategory = successQuotes;
      break;
    case "perseveranceQuotes":
      targetCategory = perseveranceQuotes;
      break;
    case "happinessQuotes":
      targetCategory = happinessQuotes;
      break;
    default:
      return res
      .status(400)
      .json({ error: "invalid or insufficient user input" });
  }

  targetCategory.push({
    quote:quote, author:author
  });
  
  res.set("Content-Type", "text/plain");
  res.send("Success!");
});


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});