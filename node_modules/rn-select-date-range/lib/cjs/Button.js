"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
exports.default = (function (_a) {
    var label = _a.label, _b = _a.onPress, onPress = _b === void 0 ? function () { } : _b, align = _a.align, _c = _a.disabled, disabled = _c === void 0 ? false : _c, font = _a.font;
    var textStyle = {
        textAlign: align,
        opacity: disabled ? 0.2 : 1,
        fontFamily: font,
    };
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { disabled: disabled, style: styles.buttonContainer, onPress: function () { return onPress(); } },
        react_1.default.createElement(react_native_1.Text, { style: textStyle }, label)));
});
var styles = react_native_1.StyleSheet.create({
    buttonContainer: {
        height: 30,
        flex: 0.7,
        justifyContent: "center",
    },
});
