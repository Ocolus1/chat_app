import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Appbar, Searchbar, List, Avatar, Divider } from 'react-native-paper';
import { fetchUserList } from "../redux/actions/chat"
import { showDateUserlist } from "../utils/Func"


function Home({ user, fetchUserList, userList, navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    fetchUserList();
  }, []);

  const renderData = ({ item }) => (
    <List.Item
      title={item.username}
      description={item.latest_message ? item.latest_message.substr(0, 50) : ""}
      left={props => <List.Icon {...props} icon={() => (
        <Avatar.Text size={32} label={item.username.substr(0,2)} />
      )} />}
      right={props => <Text {...props} >{showDateUserlist(item.timestamp)}</Text>}
      onPress={() => { navigation.navigate("ChatRoom", {
        recipient: item.username,
        short_name: item.username.substr(0,2)
      })}}
    />

  );
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="Chats" />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log("Coming soon")} />
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View>
        <FlatList
          data={userList ? userList : ""}
          ItemSeparatorComponent={Divider}
          renderItem={renderData}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userList: state.auth.userList,
});

export default connect(mapStateToProps, { fetchUserList })(Home);