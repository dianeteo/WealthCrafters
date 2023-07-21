import { View, VStack, Heading } from 'native-base';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


const avatar = require('../../assets/chatbot.png');
const BOT = {
  _id: 2,
  name: 'Chatbot',
  avatar: avatar,
};
const accessToken = '55THFJKMD2IBG5QYPVMYSMC3HBCX6BVV';
const version = '2023-02-15';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  //for search query
  const apiKey = 'c0b4578851e148138c6a5951929b5ed9';
  const endpoint = 'https://api.bing.microsoft.com/v7.0/search';

  //to handle search
  const performSearch = async (searchQuery) => {
    try {
      const response = await axios.get(endpoint, {
        headers: { 'Ocp-Apim-Subscription-Key': apiKey },
        params: { q: searchQuery },
      });
      console.log(response.data);
      const webpages = response.data.webPages.value;
      console.log(webpages)
      // Create a message with the top 5 search results and send it from the bot
      if (webpages.length > 0) {
        const top5Results = webpages.slice(0, 5); // Extract the first 5 results
        const searchResultsMessage = `Here are the top 5 search results:\n\n${top5Results
          .map((result) => `${result.name} - ${result.url}`)
          .join('\n')}`;

        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: messages.length + 1,
            text: searchResultsMessage,
            createdAt: new Date(),
            user: BOT,
          })
        );
      } else {
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: messages.length + 1,
            text: 'No search results found. Please try another question!',
            createdAt: new Date(),
            user: BOT,
          })
        );
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Basic bot behaviors and managing wit.ai
  const handleSend = async (userMessage) => {
    const text = userMessage[0].text;
    const url = `https://api.wit.ai/message`;
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, {
        _id: messages.length + 1,
        text,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
        },
      })
    );
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params:{
          v:version,
          q:text
        }
      });

      const witResponse = response.data;
      const entities = witResponse.entities;
      // Check if the 'search_query' entity is present and not empty
      if (entities && entities['wit$search_query:search_query']) {
        // Extract search query from the entity
        // Send "Searching in progress..." message
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: messages.length + 1,
            text: 'Searching in progress...',
            createdAt: new Date(),
            user: BOT,
          })
        );

        // Add logic here to perform the search based on searchQuery
        const searchQueryValues = entities["wit$search_query:search_query"].map((entity) => entity.value);
        console.log(searchQueryValues)
        const searchQueryStr = searchQueryValues.join(' ');
        console.log(searchQueryStr);
        performSearch(searchQueryStr);
        // and send a reply message with the search results or any response from the bot.
      } else {
        // Handle the case when no search_query entity is found in the response.
        // You might want to send a default response in such cases.
        setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, {
          _id: messages.length + 1,
          text: 'Sorry, that was not a valid question! Can you try rephrasing and sending again?',
          createdAt: new Date(),
          user: BOT,
        })
      );
      }
    } catch (error) {
      console.log('oops')
      console.error('error making request',error);
    }
  };


  useEffect(() => {
    // Initial message to start the conversation
    setMessages([
      {
        _id: 1,
        text: 'Hello! Key in any questions you might have!!',
        createdAt: new Date(),
        user: BOT,
      },
    ]);
  }, []);

  return (
    <>
      <Heading style={{ alignSelf: 'center', fontFamily: 'Lato' }}>Ask Me Anything!</Heading>
      <GiftedChat
        messages={messages}
        onSend={(message)=>{handleSend(message)}}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {},
});