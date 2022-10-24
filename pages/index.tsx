import { FaQuoteLeft, FaTwitter } from 'react-icons/fa';
import { Group, Text, Button, Container, Stack, createStyles } from '@mantine/core';
import useSWR from 'swr';
import { NextLink } from '@mantine/next';
import { useEffect, useState } from 'react';

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const useStyles = createStyles((theme) => ({
  quoteContainer: {
    width: 'auto',
    maxWidth: '900px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255,255, 255, 0.4)',
    boxShadow: '0 10px 10px 10px rgba(0, 0, 0, 0.2)',
  },
  FaQuoteLeft: {
    fontSize: '4rem',
  },
  quoteText: {
    fontSize: '2.75rem',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: '2.5rem',
    },
  },

  longQuote: {
    fontSize: '2rem',
  },
  quoteAuthor: {
    marginTop: '15px',
    fontSize: '2rem',
    fontWeight: 400,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    marginTop: '15px',
    justifyContent: 'space-between',

    '& > button': {
      backgroundColor: '#333',
      color: 'white',
      outline: 'none',
      padding: '0.5rem 1.8rem',
      boxShadow: '0 0.3rem rgba(121,121,121,0.65)',
      '&:hover': {
        filter: 'brightness(150%)',
        backgroundColor: '#333',
      },
      '&:active': {
        transform: 'translate(0, 0.3rem)',
        boxShadow: '0 0.1rem rgba(255,255,255,0.65)',
      },
    },
  },
  twitterButton: {
    '&:hover': {
      color: '#38a1f3',
    },
  },
  newQuote: {},
}));

export default function HomePage() {
  const [quote, setQuote] = useState({
    text: 'What makes you forget time, do more of it',
    author: 'Elton Lau',
  });
  const { classes } = useStyles();
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote?.text}`;
  const { data: apiQuotes, error } = useSWR(
    'https://jacintodesign.github.io/quotes-api/data/quotes.json',
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!apiQuotes) return 'Loading...';

  function getNewQuote() {
      const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
      setQuote(newQuote);
  }

  return (
    <Container
      fluid
      sx={{
        minHeight: '100vh',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundSize: 'cover',
        // backgroundImage:
        //   'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
        // backgroundPosition: 'center',
      }}
    >
      <Stack align="center" className={classes.quoteContainer} px={30} py={20}>
        {/* Quote Container */}
        <Group className={classes.quoteText}>
          <FaQuoteLeft className={classes.FaQuoteLeft} />
          <Text span>{quote.text}</Text>
        </Group>
        {/* Author */}
        <Group className={classes.quoteAuthor}>
          <Text className="author">{quote.author}</Text>
        </Group>
        <Group className={classes.buttonContainer} position="apart">
          <Button
            component={NextLink}
            className={classes.twitterButton}
            size="lg"
            href={twitterUrl}
          >
            <FaTwitter size={26} />
          </Button>

          <Button className={classes.newQuote} size="lg" onClick={getNewQuote}>
            New Quote
          </Button>
        </Group>
      </Stack>
      {/* Quote */}
    </Container>
  );
}
