let apiQuotes = [];

export const getQuotes = async () => {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    console.log(apiQuotes);
  } catch (err) {
    
  }
}

// On Load
