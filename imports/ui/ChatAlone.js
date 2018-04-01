import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import {Route, NavLink, HashRouter} from "react-router-dom";

import { ChatMessages } from "../api/posts";
import { Chats } from "../api/posts";
import ChatMessageAdd from './ChatMessageAdd'; 
import ChatMessage from './ChatMessage';


class ChatAlone extends Component {
  constructor(props) {
    super(props);

  }

  

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onAdd(text, user){
     if (Meteor.userId() === null) 
    {
      window.alert ("You are not registered! Please sign in."); 
      return; 
    }
    console.log("Esta agregadndo"); 
    ChatMessages.insert({
      text:text, 
      chatId: this.props.chatID, 
      user: Meteor.user().username
    });
  }

  renderPosts() {
    return this.props.chatMessages.map((p,i) =>
      <div >
      
      <ChatMessage chatMessage = {p} key = {i} > </ChatMessage>
      </div>
      
    );
  }


  

  render() {

    console.log(this.props);
    return (
      <div id="Chat">
 

        <h2> Chat members: {this.props.u1} & {this.props.u2} </h2>
        <div id="chat-content">
        {this.renderPosts()}
        </div>
        <ChatMessageAdd onAdd = {this.onAdd.bind(this)}> </ChatMessageAdd> 

      </div>
      );
  }
}

ChatAlone.propTypes = {
  
};

export default withTracker(
  (props) => {
  
    return {
      chatMessages: ChatMessages.find({chatId : props.chatID}).fetch()
    };
  }
)(ChatAlone);
