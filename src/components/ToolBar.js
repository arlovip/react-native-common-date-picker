import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {toolBarStyles} from "../calendar/style";

const ToolBar = (
    {
        style,
        titleText,
        titleStyle,
        cancelStyle,
        confirmStyle,
        cancelText,
        confirmText,
        cancel,
        confirm,
        cancelDisabled,
        confirmDisabled,
    }
) => (
    <View style={[toolBarStyles.view, style]}>
        <TouchableOpacity
            title={cancelText}
            disabled={cancelDisabled}
            activeOpacity={cancelStyle && cancelStyle.activeOpacity || 0.2}
            onPress={() => cancel && typeof cancel === 'function' && cancel()}
        >
            <Text style={[toolBarStyles.cancelText, cancelStyle]}>{cancelText}</Text>
        </TouchableOpacity>
        {titleText ? <Text style={[toolBarStyles.title, titleStyle]}>{titleText}</Text> : null}
        <TouchableOpacity
            title={confirmText}
            disabled={confirmDisabled}
            activeOpacity={confirmStyle && confirmStyle.activeOpacity || 0.2}
            onPress={() => confirm && typeof confirm === 'function' && confirm()}
        >
            <Text style={[toolBarStyles.confirmText, confirmStyle]}>{confirmText}</Text>
        </TouchableOpacity>
    </View>
);

ToolBar.propTypes = {
    style: PropTypes.any,
    cancelStyle: PropTypes.any,
    confirmStyle: PropTypes.any,
    titleStyle: PropTypes.any,
    titleText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancel: PropTypes.func,
    confirm: PropTypes.func,
    cancelDisabled: PropTypes.bool,
    confirmDisabled: PropTypes.bool,
};

export default ToolBar;