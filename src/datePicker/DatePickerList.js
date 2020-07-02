import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {BORDER_LINE_POSITION, DATE_KEY_TYPE} from '../contants'

class DatePickerList extends Component {

    static propTypes = {
        keyType: PropTypes.string,
        initialScrollIndex: PropTypes.number,
        width: PropTypes.number.isRequired,
        onValueChange: PropTypes.func,
        data: PropTypes.array,
        rows: PropTypes.oneOf([5, 7]),
        rowHeight: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        selectedRowBackgroundColor: PropTypes.string,
        unselectedRowBackgroundColor: PropTypes.string,
        selectedBorderLineColor: PropTypes.string,
        selectedBorderLineWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        selectedBorderLineMarginHorizontal: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        selectedTextFontSize: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        selectedTextColor: PropTypes.string,
        unselectedTextColor: PropTypes.string,
        textMarginHorizontal: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        yearSuffix: PropTypes.string,
        monthSuffix: PropTypes.string,
        daySuffix: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const {rows, rowHeight, selectedBorderLineMarginHorizontal, textMarginHorizontal} = props;
        __DEV__ && (rows !== 5 && rows !== 7) && console.error('Oops! Rows is only supported by one of [5, 7]');
        this.state = {
            data: this._getData(),
            initialRow: (rows - 1) / 2,
            selectedIndex: (rows - 1) / 2,
            isScrolling: false,
            rowHeight: +rowHeight,
            selectedBorderLineMarginHorizontal: +selectedBorderLineMarginHorizontal,
            textMarginHorizontal: +textMarginHorizontal,
        };
        this.updating = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
            const data = this._getData();
            this.setState({data}, () => {
                const {selectedIndex, initialRow} = this.state;
                const maxSelectedIndex = data.length - 1 - initialRow;
                const maxScrollIndex = data.length - this.props.rows;
                const index = selectedIndex > maxSelectedIndex ? maxScrollIndex : (selectedIndex - initialRow);
                this.updating = true;
                this._scrollToIndex(index);
                this._removeUpdatingTimer();
                this.updatingTimer = setTimeout(() => this.updating = false, 200);
            });
        }
    }

    componentWillUnmount() {
        this._removeTimer();
        this._removeUpdatingTimer();
    }

    _getData = () => {
        const {rows, data} = this.props;
        const _row = (rows - 1) / 2;
        const dataSource = data.slice();
        for (let i = 0; i < _row; i++) {
            dataSource.unshift({date: ''});
            dataSource.push({date: ''});
        }
        return dataSource;
    };

    _scrollToSelectedDate = ({contentOffset}) => {
        let offsetY = contentOffset.y;
        const {data, rowHeight} = this.state;
        const maxOffsetHeight = (data.length - this.props.rows) * rowHeight;
        if (offsetY <= 0) {
            offsetY = 0;
        } else if (offsetY >= maxOffsetHeight) {
            offsetY = maxOffsetHeight;
        }
        const index = Math.round(offsetY / rowHeight);
        this._scrollToIndex(index);
    };

    _scrollToIndex = index => {
        const {rows, onValueChange} = this.props;
        const {initialRow, data} = this.state;
        const maxScrollIndex = data.length - rows;
        const _index = index < 0 ? 0 : (index > maxScrollIndex ? maxScrollIndex : index);
        const selectedIndex = _index + initialRow;
        this.setState({selectedIndex});
        this.flatList.scrollToIndex({index: _index, animated: false});
        onValueChange && typeof onValueChange === 'function' && onValueChange(_index);
    };

    _removeTimer = () => this.timer && clearTimeout(this.timer);
    _removeUpdatingTimer = () => this.updatingTimer && clearTimeout(this.updatingTimer);

    _onMomentumScrollEnd = ({nativeEvent}) => this._scrollToSelectedDate(nativeEvent);

    _onScrollEndDrag = ({nativeEvent}) => {
        this._removeTimer();
        /**
         * When user is scrolling the scroll view fast, this method will be executed first. After this method is executed,
         * "_onMomentumScrollEnd" method will be triggered and go on calling "_scrollToSelectedDate". So this.timer here
         * to avoid conflict between them.
         */
        this.timer = setTimeout(() => {
            this._scrollToSelectedDate(nativeEvent);
            this._removeTimer();
        }, 150);
    };

    _onViewableItemsChanged = ({viewableItems}) => {
        this._removeTimer();
        const {data, initialRow, selectedIndex} = this.state;
        if (viewableItems.length >= initialRow && viewableItems[initialRow] && viewableItems[initialRow].index >= 0 && !this.updating) {
            const maxSelectedIndex = data.length - 1 - initialRow;
            if (viewableItems[initialRow].index >= maxSelectedIndex) {
                this.setState({selectedIndex: maxSelectedIndex});
            } else {
                this.setState({selectedIndex: viewableItems[initialRow].index});
            }
        }
    };

    _getFlatListStyle = () => {
        const {textMarginHorizontal} = this.state;
        const {width, dataLength, dataIndex} = this.props;
        const lastIndex = dataLength - 1;
        const style = {width};
        if (dataLength >= 2) {
            if (dataIndex === 0) {
                style.paddingLeft = textMarginHorizontal;
            }
            if (dataIndex === lastIndex) {
                style.paddingRight = textMarginHorizontal;
            }
        }
        return style;
    };

    _itemTextStyle = index => {
        const {selectedIndex} = this.state;
        const {
            selectedTextFontSize,
            selectedTextColor,
            unselectedTextColor,
        } = this.props;
        const style = {};
        const selected = selectedIndex === index;
        if (selected) {
            style.color = selectedTextColor;
            style.fontSize = +selectedTextFontSize;
            return style;
        }
        style.color = unselectedTextColor;
        if (index === selectedIndex - 1 || index === selectedIndex + 1) {
            style.fontSize = +selectedTextFontSize - 3;
        } else if (index === selectedIndex - 2 || index === selectedIndex + 2) {
            style.fontSize = +selectedTextFontSize - 6;
        } else {
            style.fontSize = +selectedTextFontSize - 8;
        }
        return style;
    };

    _lineStyle = position => {

        const {
            width,
            selectedBorderLineColor,
            selectedBorderLineWidth,
            selectedRowBackgroundColor,
            unselectedRowBackgroundColor,
            dataLength,
            dataIndex,
        } = this.props;
        const {initialRow, rowHeight, selectedBorderLineMarginHorizontal} = this.state;

        let marginHorizontal = selectedBorderLineMarginHorizontal;
        let marginLeft = selectedBorderLineMarginHorizontal;
        const lastIndex = dataLength - 1;
        if (dataIndex !== 0 && dataIndex !== lastIndex) {
            marginLeft = 0;
            marginHorizontal = 0;
        } else {
            if (dataIndex === lastIndex) {
                marginLeft = 0;
            }
        }

        return {
            position: 'absolute',
            width: width - marginHorizontal,
            marginLeft,
            height: position === BORDER_LINE_POSITION.MIDDLE ? rowHeight : initialRow * rowHeight,
            borderTopWidth: position === BORDER_LINE_POSITION.MIDDLE ? +selectedBorderLineWidth : 0,
            borderBottomWidth: position === BORDER_LINE_POSITION.MIDDLE ? +selectedBorderLineWidth : 0,
            borderTopColor: selectedBorderLineColor,
            borderBottomColor: selectedBorderLineColor,
            marginTop: position === BORDER_LINE_POSITION.MIDDLE ? rowHeight * initialRow : (position === BORDER_LINE_POSITION.TOP ? 0 : (initialRow + 1) * rowHeight),
            backgroundColor: position === BORDER_LINE_POSITION.MIDDLE ? selectedRowBackgroundColor : unselectedRowBackgroundColor,
        };
    };

    _renderItem = ({item, index}) => {
        const {keyType, yearSuffix, monthSuffix, daySuffix} = this.props;
        const suffix = keyType === DATE_KEY_TYPE.YEAR ? yearSuffix : (keyType === DATE_KEY_TYPE.MONTH ? monthSuffix : daySuffix);
        return (<View style={[styles.itemView, {height: this.state.rowHeight}]}>
            <Text style={this._itemTextStyle(index)}>{item.date}{item.date ? suffix : ''}</Text>
        </View>);
    };

    _viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};

    render() {
        const {data, rowHeight} = this.state;
        const heightOfContainer = this.props.rows * rowHeight;
        return (
            <View style={{height: heightOfContainer}}>
                <View pointerEvents={'box-none'} style={this._lineStyle(BORDER_LINE_POSITION.TOP)}/>
                <View pointerEvents={'box-none'} style={this._lineStyle(BORDER_LINE_POSITION.MIDDLE)}/>
                <View pointerEvents={'box-none'} style={this._lineStyle(BORDER_LINE_POSITION.BOTTOM)}/>
                <FlatList
                    ref={ref => this.flatList = ref}
                    style={this._getFlatListStyle()}
                    data={data}
                    initialScrollIndex={this.props.initialScrollIndex}
                    getItemLayout={(data, index) => ({length: rowHeight, offset: index * rowHeight, index})}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    viewabilityConfig={this._viewabilityConfig}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    renderItem={this._renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    scrollsToTop={false}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    itemView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DatePickerList;