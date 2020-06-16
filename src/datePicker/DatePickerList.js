import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {BORDER_LINE_POSITION, DATE_KEY_TYPE} from '../contants'

class DatePickerList extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
        onValueChange: PropTypes.func,
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
        __DEV__ && (+rows !== 5 && +rows !== 7) && console.error('Oops! Rows is only supported by one of [5, 7]');
        this.state = {
            data: this._data(),
            initialRow: (+rows - 1) / 2,
            selectedIndex: (+rows - 1) / 2,
            isScrolling: false,
            rowHeight: +rowHeight,
            selectedBorderLineMarginHorizontal: +selectedBorderLineMarginHorizontal,
            textMarginHorizontal: +textMarginHorizontal,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
            this.setState({
                data: this._data(),
            }, () => {
                const {selectedIndex, data, initialRow} = this.state;
                let toIndex = 0;
                if (selectedIndex <= (data.length - 1 - initialRow)) {
                    toIndex = selectedIndex - initialRow;
                } else {
                    toIndex = data.length - 1 - initialRow * 2;
                }
                if (!this.props.isFirst) {
                    this._onValueChange(toIndex);
                    this.flatList.scrollToIndex({index: toIndex, animated: false});
                }
            });
        }
    }

    _onValueChange = scrollIndex => this.props.onValueChange && typeof this.props.onValueChange === 'function' && this.props.onValueChange(scrollIndex);

    _data = () => {
        const {rows, data} = this.props;
        const _row = (rows - 1) / 2;
        const dataSource = data.slice();
        for (let i = 0; i < _row; i++) {
            dataSource.unshift({date: ''});
            dataSource.push({date: ''});
        }
        return dataSource;
    };

    componentWillUnmount() {
        this._removeTimer();
        this._removeScrollTimer();
    }

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
            style.fontSize = +selectedTextFontSize - 5;
        } else if (index === selectedIndex - 2 || index === selectedIndex + 2) {
            style.fontSize = +selectedTextFontSize - 8;
        } else {
            style.fontSize = +selectedTextFontSize - 11;
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

    _scrollToSelectedDate = ({contentOffset}) => {
        if (this.state.isScrolling) return;
        // Fix conflict between "onScrollEndDrag" and "onMomentumScrollEnd".
        this.setState({isScrolling: true}, () => {
            // Fix: offset < 0 on Android
            const offsetY = contentOffset.y < 0 ? 0 : contentOffset.y;
            const index = Math.round(offsetY / (this.state.rowHeight));
            this.flatList.scrollToIndex({index: index, animated: false});
            this._onValueChange(index);
            this.scrollTimer = setTimeout(() => {
                this.state.isScrolling = false;
                this._removeScrollTimer();
            }, 300);
        });
    };

    _needToScroll = ({contentOffset}) => {
        const offsetY = contentOffset.y;
        const {rows} = this.props;
        const {data, rowHeight, initialRow} = this.state;
        const maxOffsetHeight = (data.length - rows) * rowHeight;
        if (offsetY <= 0) {
            this.setState({selectedIndex: initialRow});
            return true; // Fix: offset < 0 on Android
        } else if (offsetY >= maxOffsetHeight) {
            this.setState({selectedIndex: data.length - 1 - initialRow})
        }
        return offsetY >= 0 && offsetY <= maxOffsetHeight;
    };

    _onMomentumScrollEnd = ({nativeEvent}) => this._needToScroll(nativeEvent) && this._scrollToSelectedDate(nativeEvent);

    _onScrollEndDrag = ({nativeEvent}) => {
        if (!this._needToScroll(nativeEvent)) return;
        this._removeTimer();
        /**
         * When user is scrolling the scroll view fast, this method will be executed first. After this method is executed,
         * "_onMomentumScrollEnd" method will be triggered and go on calling "_scrollToSelectedDate". So this.timer here
         * to avoid conflict between them.
         */
        this.timer = setTimeout(() => {
            this._scrollToSelectedDate(nativeEvent);
            this._removeTimer();
        }, 300);
    };

    _removeTimer = () => this.timer && clearTimeout(this.timer);
    _removeScrollTimer = () => this.scrollTimer && clearTimeout(this.scrollTimer);

    _onViewableItemsChanged = ({viewableItems, changed}) => {
        this._removeTimer();
        const {initialRow} = this.state;
        if (viewableItems.length >= initialRow && viewableItems[initialRow] && viewableItems[initialRow].index >= 0) {
            this.setState({selectedIndex: viewableItems[initialRow].index});
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

    render() {
        const {rows} = this.props;
        const {data, rowHeight} = this.state;
        const heightOfContainer = rows * rowHeight;
        return (
            <View style={{height: heightOfContainer}}>
                <View pointerEvents={'box-none'} style={this._lineStyle(BORDER_LINE_POSITION.TOP)}/>
                <View pointerEvents={'box-none'} style={this._lineStyle(BORDER_LINE_POSITION.MIDDLE)}/>
                <View pointerEvents={'box-none'} style={this._lineStyle(BORDER_LINE_POSITION.BOTTOM)}/>
                <FlatList
                    ref={ref => this.flatList = ref}
                    style={this._getFlatListStyle()}
                    data={data}
                    initialScrollIndex={this.props.initIndex}
                    getItemLayout={(data, index) => ({length: rowHeight, offset: index * rowHeight, index})}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    viewabilityConfig={{itemVisiblePercentThreshold: 50}}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    renderItem={this._renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    scrollsToTop={false}
                    bounces={false} // Compatible with android
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