import React, {useState, useEffect} from 'react';
import './App.scss';
import colorArray from "./colorArray.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';


let quoteDB ='https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quote, setQuote] = useState("If you've got a plan, it's not just like a pipe dream. You have a step-by-step list of things to do to get to your goal");
  const [author, setAuthor] = useState("Nipsey Hussle");
  const [randomInteger, setRandomIndex] = useState(0);
  const [quotesArray, setquotesArray] = useState(null)
  const [bgColor, setbgColor] = useState("#282c34")

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parseJSON = await response.json();
    setquotesArray(parseJSON.quotes)
    console.log(parseJSON);
  }


  useEffect(() => {
    fetchQuotes(quoteDB);
  }, [quoteDB])
  
  
  
  const generateRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length*Math.random());
    setRandomIndex(randomInteger);
    setbgColor(colorArray[randomInteger]);
    setQuote(quotesArray[randomInteger].quote); setAuthor(quotesArray[randomInteger].author)};

  //const newQuoteAuthor = () =>{setQuote(quotesArray[randomInteger].quote); setAuthor(quotesArray[randomInteger].author)};
  
  //const OurquotesArray = [{quote: "If you've got a plan, it's not just like a pipe dream. You have a step-by-step list of things to do to get to your goal", author: "Nipsey Hussle"}, {quote: "If you're going through hell, keep going.", author: "Winston Churchill"} , {quote: "It does not matter how slowly you go as long as you do not stop", author: "Confucius"} , {quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe"}, {quote: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt"}, {quote:"Change your life today. Don't gamble on the future, act now, without delay", author:"Simone de Beauvoir"}, {quote:"What you do today can improve all your tomorrows.", author:"Ralph Marston"}, {quote:"Problems are not stop signs, they are guidelines.", author:"Robert H.Schuller"} , {quote:"Only I can change my life. No one can do it for me", author:"Carol Burnett"}];

  //let quotesArrayLength = quotesArray.length;

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: bgColor}}>
        <div id="quote-box" style={{color: bgColor}}>
        <p id="text">
          <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>{quote}<FontAwesomeIcon icon={faQuoteRight}></FontAwesomeIcon>
        </p>
        <p id="author">- {author}
        </p>
      
      <div className="buttondiv">
      <a id="tweet-quote" style={{backgroundColor: bgColor}} href={encodeURI('http://www.twitter.com/intent/tweet?text=${quote} -${author}')}><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
      <button id="new-quote" style={{backgroundColor: bgColor}} onClick={()=> {generateRandomQuote();}} >Give me a Random Quote</button>
      </div>

      </div>
      </header>
    </div>
  );
}

export default App;
