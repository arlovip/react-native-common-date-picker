import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {weekBarStyles} from "../style";

const WeekBar = ({weeks, style, textStyle}) => (
    <View style={[weekBarStyles.view, style]}>
        {weeks.map((week, index) => <Text key={index} style={[weekBarStyles.text, textStyle]}>{week}</Text>)}
    </View>
);

WeekBar.propTypes = {
    weeks: PropTypes.array.isRequired,
    style: PropTypes.any,
    textStyle: PropTypes.any,
};

export default WeekBar;