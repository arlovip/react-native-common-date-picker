import React, {Component} from 'react';
import {Button, View, Text, Modal} from 'react-native';
import CalendarList from "../calendar/CalendarList";

export default class CalendarExample extends Component {

    state = {

        selectedDate1: '',
        selectedDate2: '',

        selectedDate3: '',
        selectedDate4: '',

        selectedDate5: '',
        selectedDate6: '',

        selectedDate7: '',
        selectedDate8: '',

        selectedDate9: '',
        selectedDate10: '',

        visible0: false,
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,

    };

    render() {

        return (
            <View style={{flex: 1}}>

                <View style={{marginTop: 44}}>
                    <Button title="High-performance calendar list 0" onPress={() => this.setState({visible0: true})}/>
                    <Text style={{color: 'blue', fontSize: 18, paddingLeft: 10}}>start date: {this.state.selectedDate1}</Text>
                    <Text style={{color: 'blue', fontSize: 18, paddingLeft: 10}}>end date: {this.state.selectedDate2}</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <Button title="High-performance calendar list 1" onPress={() => this.setState({visible1: true})}/>
                    <Text style={{color: 'red', fontSize: 18, paddingLeft: 10}}>start date: {this.state.selectedDate3}</Text>
                    <Text style={{color: 'red', fontSize: 18, paddingLeft: 10}}>end date: {this.state.selectedDate4}</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <Button title="High-performance calendar list 2" onPress={() => this.setState({visible2: true})}/>
                    <Text style={{color: 'green', fontSize: 18, paddingLeft: 10}}>start date: {this.state.selectedDate5}</Text>
                    <Text style={{color: 'green', fontSize: 18, paddingLeft: 10}}>end date: {this.state.selectedDate6}</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <Button title="High-performance calendar list 3" onPress={() => this.setState({visible3: true})}/>
                    <Text style={{color: 'skyblue', fontSize: 18, paddingLeft: 10}}>start date: {this.state.selectedDate7}</Text>
                    <Text style={{color: 'skyblue', fontSize: 18, paddingLeft: 10}}>end date: {this.state.selectedDate8}</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <Button title="High-performance calendar list 4" onPress={() => this.setState({visible4: true})}/>
                    <Text style={{color: 'orange', fontSize: 18, paddingLeft: 10}}>start date: {this.state.selectedDate9}</Text>
                    <Text style={{color: 'orange', fontSize: 18, paddingLeft: 10}}>end date: {this.state.selectedDate10}</Text>
                </View>

                <Modal animationType={'slide'} visible={this.state.visible0} onRequestClose={() => {}}>
                    <View style={{height: 44}}/>
                    <CalendarList
                        containerStyle={{flex: 1}}
                        cancel={() => this.setState({visible0: false})}
                        confirm={data => {
                            this.setState({
                                selectedDate1: data[0],
                                selectedDate2: data[1],
                                visible0: false,
                            });
                        }}
                    />
                </Modal>

                <Modal animationType={'slide'} visible={this.state.visible1}  onRequestClose={() => {}}>
                    <View style={{height: 44}}/>
                    <CalendarList
                        containerStyle={{flex: 1}}
                        minDate={'2016-5-23'}
                        maxDate={'2020-6-6'}
                        cancel={() => this.setState({visible1: false})}
                        confirm={data => {
                            this.setState({
                                selectedDate3: data[0],
                                selectedDate4: data[1],
                                visible1: false,
                            });
                        }}
                    />
                </Modal>

                <Modal animationType={'slide'} visible={this.state.visible2}  onRequestClose={() => {}}>
                    <View style={{height: 44}}/>
                    <CalendarList
                        containerStyle={{flex: 1}}
                        titleText={'Select Date'}
                        minDate={'2016-5-23'}
                        maxDate={'2020-6-6'}
                        cancel={() => this.setState({visible2: false})}
                        selectedDateMarkType={'circle'}
                        selectedDateMarkColor={'red'}
                        selectedDateMarkRangeColor={'orange'}
                        headerTitleType={2}
                        confirm={data => {
                            this.setState({
                                selectedDate5: data[0],
                                selectedDate6: data[1],
                                visible2: false,
                            });
                        }}
                    />
                </Modal>

                <Modal transparent={true} animationType={'slide'} visible={this.state.visible3}  onRequestClose={() => {}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <CalendarList
                            minDate={'2018-5-23'}
                            maxDate={'2020-6-6'}
                            cancel={() => this.setState({visible3: false})}
                            selectedDateMarkType={'dot'}
                            horizontal={true}
                            headerTitleType={3}
                            confirm={data => {
                                this.setState({
                                    selectedDate7: data[0],
                                    selectedDate8: data[1],
                                    visible3: false,
                                });
                            }}
                        />
                    </View>
                </Modal>

                <Modal transparent={true} animationType={'slide'} visible={this.state.visible4}  onRequestClose={() => {}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <CalendarList
                            minDate={'2018-5-23'}
                            maxDate={'2020-6-6'}
                            cancel={() => this.setState({visible4: false})}
                            headerTitleType={5}
                            selectedDateMarkType={'square'}
                            horizontal={true}
                            pagingEnabled={true}
                            confirm={data => {
                                this.setState({
                                    selectedDate9: data[0],
                                    selectedDate10: data[1],
                                    visible4: false,
                                });
                            }}
                        />
                    </View>
                </Modal>

            </View>
        );
    }
}