import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Appbar, Avatar } from 'react-native-paper';
import { onClickUserList, fetchUserList } from "../redux/actions/chat"
import { sendMsg } from "../utils/Func"
import { GiftedChat } from 'react-native-gifted-chat/src';
import axios from 'axios';
import { REACT_APP_API_URL } from "@env"

const ChatRoom = ({ route, access, onClickUserList, navigation, user }) => {
  const [messages, setMessages] = useState([]);
  const recipient = route.params.recipient;
  const short_name = route.params.short_name;

  // var ws = new WebSocket(`${WS_APP_API_URL}/ws?token=${access}`);

  // ws.onmessage = function (e) {
  //   getMessageById(e.data);
  // };

  useEffect(() => {

    const ClickUserList = async (recipient) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
        }
      };
      try {
        const res = await axios.get(`${REACT_APP_API_URL}/api/v1/message/user_messages/?target=${recipient}`, config);
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    ClickUserList(recipient)
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    sendMsg(recipient, messages[0].text)
    fetchUserList()
    onClickUserList(recipient)
  }, [])


  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.navigate("Home") }} />
        <Appbar.Action icon={() => (
          <Avatar.Text size={32} label={short_name} />
        )} />
        <Appbar.Content title={recipient} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log("Coming soon")} />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.id,
          name: user.username
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgDate: {
    margin: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  msg: {
    marginTop: 10,
  },
  Flat: {

  },
  textInput: {
  }
});

const mapStateToProps = state => ({
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, { onClickUserList })(ChatRoom);