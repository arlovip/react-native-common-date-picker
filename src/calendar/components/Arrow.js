import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";

const DIRECTION = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
};

const Arrow = ({size, color, direction}) => {

    const directions = [];
    const line1Style = {};
    const line2Style = {};

    switch (direction) {
        case DIRECTION.LEFT:
            directions.push('45deg');
            directions.push('135deg');
            line1Style.top = size * 0.9;
            line2Style.top = size * 0.4;
            break;
        case DIRECTION.RIGHT:
            directions.push('135deg');
            directions.push('225deg');
            line1Style.top = size * 0.9;
            line2Style.top = size * 0.4;
            break;
        case DIRECTION.UP:
            directions.push('135deg');
            directions.push('225deg');
            line1Style.left = size * 0.4;
            line2Style.left = size * 0.9;
            break;
        case DIRECTION.DOWN:
            directions.push('225deg');
            directions.push('315deg');
            line1Style.left = size * 0.4;
            line2Style.left = size * 0.9;
            break;
        default:
            break;
    }

    const commonStyle = {
        backgroundColor: color,
        width: size,
        height: size / 4,
        position: "absolute",
    };

    return (<View style={{width: size, height: size * 1.8}}>
        <View style={{...commonStyle, ...line1Style, transform: [{rotate: directions[0]}]}}/>
        <View style={{...commonStyle, ...line2Style, transform: [{rotate: directions[1]}]}}/>
    </View>);
};

Arrow.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    direction: PropTypes.string,
};

Arrow.defaultProps = {
    size: 8,
    color: "gray",
    direction: DIRECTION.RIGHT,
};

export default Arrow;