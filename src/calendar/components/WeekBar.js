import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {weekBarStyles} from '../style';

// Uses PureComponent to improve performance.
class WeekBar extends PureComponent {

    render() {

        const {
            weeks,
            style,
            textStyle,
        } = this.props;

        return (
            <View style={[weekBarStyles.view, style]}>
                {weeks.map((week, index) => <Text key={index} style={[weekBarStyles.text, textStyle]}>{week}</Text>)}
            </View>
        );
    }
}

// Props defined here.
WeekBar.propTypes = {
    weeks: PropTypes.array.isRequired,
    style: PropTypes.any,
    textStyle: PropTypes.any,
};

export default WeekBar;
