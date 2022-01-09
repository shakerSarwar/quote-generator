const quoteContainer = document.getElementById('container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const loader = document.getElementById('loader')



let apiQuotes = {};

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuotes(){
loading();
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
 
  // quote author not  specified
  if(!quote.author){
    quoteAuthor.textContent = 'Unknown';
  }else{
    quoteAuthor.textContent = quote.author;
  }

  // long quote

  if(quote.text.length > 100){
    quoteText.classList.add('long-quote');
  }else{
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
complete();  
}


async function getQuote(){
    loading();
    const apiUrl ='https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes()
    } catch (error) {
       console.log(error); 
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}
tweetQuote();
getQuote();