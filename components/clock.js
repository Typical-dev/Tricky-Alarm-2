import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      current_hour: "",
      current_min: "",
      current_sec: "",
      current_date: "",
      current_day: "",
      current_timezone: "",
      alarms: [],
      newAlarm: "",
      current_month: "",
    };
    this.interval = 0;
  }
    

  getTime() {
    var date = new Date();
    var current_hour = date.getHours();
    var current_min = date.getMinutes();
    var current_sec = date.getSeconds();
    var current_date = date.getDate();
    var current_day = date.getDay();
    var current_month = date.getMonth();
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    var current_day_text = week[current_day];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octorber", "November", "December",];
    var current_month_text = month[current_month];
    this.setState({ current_hour: current_hour, current_min: current_min, current_sec: current_sec, current_date: current_date, current_day: current_day_text, current_month:current_month_text });
  }

  componentDidMount() {
    this.interval = setInterval(() =>
      this.getTime(), 1000);
    this.getItem();
    }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  storeAlarm = async (obj) => {
    AsyncStorage.getItem("all_alarms").then((value) => {
      value = value === null ? [] : JSON.parse(value)
      value.push(obj)
      return AsyncStorage.setItem("all_alarms", JSON.stringify(value))
    })
    this.getItem();
  }
  
  getItem = async () => {
    var alarm = AsyncStorage.getItem("all_alarms").then((value) => {
      value = value === null ? [] : value
      var element  = [value]
      this.setState({ alarms: [... this.state.alarms, ... element] })
    })
  }

  clearAlarm = async () => {
    AsyncStorage.removeItem("all_alarms");
    console.log(this.state.alarms);
    //this.setState({ alarms: [...this.state.alarms, txt] });
  };

  render() {
    return (
      <View style={styles.container}>
            {this.getTime}
        <Text style = {styles.text}>
          {this.state.current_hour + ":" + this.state.current_min + ":" + this.state.current_sec}
        </Text>
        <Text style={styles.text}>
          {this.state.current_timeZone}
        </Text>
        <Text style = {styles.text}>
          {this.state.current_day + "," + this.state.current_date +" "+ this.state.current_month}
        </Text>
        <Text>
          {this.state.alarms}
        </Text>
        <TextInput onChangeText={(txt) => {
          this.setState({newAlarm:txt})
        }}/>
        <TouchableOpacity onPress={() => {
          this.storeAlarm(this.state.newAlarm)
        }}>
          <Text>
            save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.clearAlarm()
        }}>
          <Text>
            clear
          </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 40,
    textAlign:"center",
  }
});