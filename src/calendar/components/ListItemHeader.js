import React, {Component} from 'react';
import {listItemStyles} from "../style";
import {Text, TouchableOpacity, View} from "react-native";
import Arrow from "./Arrow";
import PropTypes from "prop-types";
import * as Constants from "../../contants";

const ARROW_ALIGN = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
};

class ListItemHeader extends Component {

    _headerTitle = item => {
        const {headerTitleType} = this.props;
        const {year, month} = item;
        const _month = month <= 9 ? `0${month}` : month;
        switch (headerTitleType) {
            case 0:
                return `${year}-${_month}`;
            case 1:
                return `${year}年${month}月`;
            case 2:
                return `${Constants.DEFAULT_MONTH_SHORT[month - 1]} ${year}`;
            case 3:
                return `${Constants.DEFAULT_MONTH_LONG[month - 1]} ${year}`;
            case 4:
                return `${year}/${_month}`;
            case 5:
                return `${_month}/${year}`;
            default:
                return `${year}-${month}`;
        }
    };

    _arrowAlign = () => {
        let aligns = [];
        const {arrowAlign} = this.props;
        if (arrowAlign === ARROW_ALIGN.LEFT) {
            aligns = ['flex-start', 'flex-end'];
        } else if ((arrowAlign === ARROW_ALIGN.CENTER)) {
            aligns = ['center', 'center'];
        } else if (arrowAlign === ARROW_ALIGN.RIGHT) {
            aligns = ['flex-end', 'flex-start'];
        } else {
            aligns = ['flex-end', 'flex-start'];
        }
        return aligns;
    };

    render() {
        const {
            item,
            listItemStyle,
            hideArrow,
            arrowColor,
            arrowSize,
            leftArrowClick,
            rightArrowClick,
            horizontal,
        } = this.props;

        const aligns = this._arrowAlign();

        return (
            <View style={[listItemStyles.headerTitleContainer, listItemStyle.headerTitleContainer || {}]}>

                <View style={{flex: 1, alignItems: aligns[0]}}>
                    {!hideArrow && horizontal && <TouchableOpacity
                        style={{paddingTop: 6, paddingBottom: 4, paddingHorizontal: 15}}
                        onPress={() => leftArrowClick && typeof leftArrowClick === 'function' && leftArrowClick()}>
                        <Arrow color={arrowColor} size={arrowSize} direction={'left'}/>
                    </TouchableOpacity>}
                </View>

                <Text style={[listItemStyles.headerTitle, listItemStyle.headerTitle || {}]}>
                    {this._headerTitle(item)}
                </Text>

                <View style={{flex: 1, alignItems: aligns[1]}}>
                    {
                        !hideArrow && horizontal && <TouchableOpacity
                            style={{paddingTop: 6, paddingBottom: 4, paddingHorizontal: 15}}
                            onPress={() => rightArrowClick && typeof rightArrowClick === 'function' && rightArrowClick()}>
                            <Arrow color={arrowColor} size={arrowSize}/>
                        </TouchableOpacity>
                    }
                </View>

            </View>
        );
    }
}

ListItemHeader.propTypes = {
    item: PropTypes.object.isRequired,
    listItemStyle: PropTypes.object,
    headerTitleType: PropTypes.number,
    leftArrowClick: PropTypes.func,
    rightArrowClick: PropTypes.func,
    hideArrow: PropTypes.bool,
    arrowColor: PropTypes.string,
    arrowSize: PropTypes.number,
    arrowAlign: PropTypes.string,
};

export default ListItemHeader;