import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Category extends Component {
  render(){
    return (
      <TouchableOpacity style={this.props.style} onPress={() => {
        if(this.props.text === 'Chatroom'){
          this.props.nav.navigate('Login')
        }
      }}>
        <Text>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

export default Category