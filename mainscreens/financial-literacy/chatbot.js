import { FontAwesome, MaterialCommunityIcons, } from '@expo/vector-icons';
import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet,View, Image,Text,Platform} from 'react-native';
import {KeyboardSpacer} from 'react-native-keyboard-spacer';
import { GiftedChat ,Send,Bubble,InputToolbar,Time} from 'react-native-gifted-chat';
import axios from 'axios';
import { Spinner } from 'native-base';


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
  const searchResults=useRef([]);
  const shownResults = useRef(0);
  const renderTime = (props) => {
    return (
      <Time
      {...props}
        timeTextStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'black',
          },
        }}
      />
    );
  };
  // handles quick reply
  const handleQuickReply = (quickReply) => {
    const  value  = quickReply[0].value;
      if (value === 'Yes') {
        const nextResults = searchResults.current.slice(shownResults.current, (shownResults.current + 5));
        if (nextResults.length === 0) {
          // If there are no more search results, send a message saying so
          const noMoreResultsMessage = 'Sorry, there are no more search results to display. Please ask another question.';
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, {
              _id: Math.round(Math.random() * 1000000),
              text: noMoreResultsMessage,
              createdAt: new Date(),
              user: BOT,
            })
          )}
        else {
        const nextResultsMessage = `Here are the next 5 search results:\n\n${nextResults
          .map((result) => `${result.name} - ${result.url}`)
          .join('\n')}`;
          setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: Math.round(Math.random() * 1000000),
            text: nextResultsMessage,
            createdAt: new Date(),
            user: BOT,
          }))
          const moreResultsMessage = `Would you still like to view more results?`;
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, {
              _id: Math.round(Math.random() * 1000000),
              text: moreResultsMessage,
              createdAt: new Date(),
              user: BOT,
              quickReplies: {
                type: 'radio',
                keepIt: true,
                values: [
                  { title: 'Yes', value: 'Yes' },
                  { title: 'No', value: 'No' },
                ],
              },}))
              shownResults.current = shownResults.current + 5; // Update the shownResultsRef value
              console.log(shownResults.current);
        }}
          else if (value === 'No') {
            // User does not want to see more results
            const noResultsMessage =
              'Okay, no problem! If you have any other questions, feel free to ask.';
            setMessages((prevMessages) =>
              GiftedChat.append(prevMessages, {
                _id: Math.round(Math.random() * 1000000),
                text: noResultsMessage,
                createdAt: new Date(),
                user: BOT,
              })
            );
          }}
  //scrollToBottom component
  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    )
  }


  //input toolbar
  const renderInputToolbar = (props) => {
    return (
      <View style={styles.inputToolbarContainer}>
        <InputToolbar {...props} 
        containerStyle={{
          borderRadius:50,
          marginLeft:17,
          marginRight:17,
          
        }}/>
      </View>
    );
  };
  //send button
  const renderSend = (props) => {
    return (
      <Send {...props}>
          <MaterialCommunityIcons name='send-circle' size={32} color='#229ED9' style={{marginBottom: 5, marginRight: 5}}/>
      </Send>
    )
  }

  //bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#fafaf9',
          },
          left:{
            backgroundColor:'#4c7dfe'
          }
        }}
        textStyle={{
          right: {
            fontFamily:'Lato',
            color:'black'
          },
          left:{
            fontFamily:'Lato',
            color:'white'
          }
        }}
      />
    );
  };
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
      searchResults.current=webpages;
      // Create a message with the top 5 search results and send it from the bot
      if (webpages.length > 0) {
        shownResults.current=0;
        const top5Results = webpages.slice(0, 5); // Extract the first 5 results
        const searchResultsMessage = `Here are the top 5 search results:\n\n${top5Results
          .map((result) => `${result.name} - ${result.url}`)
          .join('\n')}`;

        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: Math.round(Math.random() * 1000000),
            text: searchResultsMessage,
            createdAt: new Date(),
            user: BOT,
          })
        )
        const moreResultsMessage = `Would you like to view more results?`;
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: Math.round(Math.random() * 1000000),
            text: moreResultsMessage,
            createdAt: new Date(),
            user: BOT,
            quickReplies: {
              type: 'radio',
              keepIt: true,
              values: [
                { title: 'Yes', value: 'Yes' },
                { title: 'No', value: 'No' },
              ],
            },}))
            shownResults.current = shownResults.current + 5;
            console.log(shownResults.current);
      }
          else {
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: Math.round(Math.random() * 1000000),
            text: 'No search results found. Please try another question!',
            createdAt: new Date(),
            user: BOT,
          })
        );

      }}
     catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Basic bot behaviors and managing wit.ai
  const handleSend = async (userMessage) => {
    const text = userMessage[0].text;
    const url = `https://api.wit.ai/message`;
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, {
        _id: Math.round(Math.random() * 1000000),
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
      const intents=witResponse.intents;
      const entities = witResponse.entities;
      // Check if the 'search_query' entity is present and not empty
      if (entities && entities['wit$search_query:search_query'] && entities['wit$search_query:search_query'][0]['confidence'] >= 0.90) {
        // Extract search query from the entity
        // Send "Searching in progress..." message
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: Math.round(Math.random() * 1000000),
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
      }
      
      else if (intents && intents.some((intent) => intent.name === 'hello')) {
        // Send back a response
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, {
            _id: Math.round(Math.random() * 1000000),
            text: 'Hello there!!!',
            createdAt: new Date(),
            user: BOT,
          })
        )}
      
      else if (intents && intents.some((intent) => intent.name === 'thanks')) {
          // Send back a response
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, {
              _id: Math.round(Math.random() * 1000000),
              text: 'Welcome!',
              createdAt: new Date(),
              user: BOT,
            })
          )}
        
      else {
        // Handle the case when no search_query entity is found in the response.
        // You might want to send a default response in such cases.
        setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, {
          _id: Math.round(Math.random() * 1000000),
          text: 'Sorry, I did not understand that! Can you try rephrasing and sending a relevant question again?',
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
    // Delay the initial message by 1 second (2000 milliseconds)
    const initialMessageTimer = setTimeout(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello! Key in any questions you might have!!',
          createdAt: new Date(),
          user: BOT,
        },
      ]);
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(initialMessageTimer);
  }, []);

    return (
      <>
        <GiftedChat
          messages={messages}
          onSend={(message) => {
            handleSend(message);
          }}
          user={{
            _id: 1,
          }}
          textInputStyle={{
            borderRadius: 30,
            
          }}
          placeholder="Ask away!"
          isTyping={true}
          alwaysShowSend={true}
          renderSend={renderSend}
          renderBubble={renderBubble}
          renderAvatarOnTop={true}
          renderInputToolbar={renderInputToolbar}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          renderTime={renderTime}
          messagesContainerStyle={{
            backgroundColor:'#fff',
            height:'96%'
          }}
          onQuickReply={handleQuickReply}
        />
      </>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems:'center',
    justifyContent:'center',
    flex:1
  },
  avatarContainer: {
    margin: 8,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputToolbarContainer:{
    marginTop:'5%'
  },
});