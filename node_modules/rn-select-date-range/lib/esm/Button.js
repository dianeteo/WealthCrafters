import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
export default (function (_a) {
    var label = _a.label, _b = _a.onPress, onPress = _b === void 0 ? function () { } : _b, align = _a.align, _c = _a.disabled, disabled = _c === void 0 ? false : _c, font = _a.font;
    var textStyle = {
        textAlign: align,
        opacity: disabled ? 0.2 : 1,
        fontFamily: font,
    };
    return (React.createElement(TouchableOpacity, { disabled: disabled, style: styles.buttonContainer, onPress: function () { return onPress(); } },
        React.createElement(Text, { style: textStyle }, label)));
});
var styles = StyleSheet.create({
    buttonContainer: {
        height: 30,
        flex: 0.7,
        justifyContent: "center",
    },
});
