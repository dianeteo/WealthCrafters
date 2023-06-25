var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import moment from "moment";
export default (function (_a) {
    var selectedDate = _a.selectedDate, onSelectDate = _a.onSelectDate, firstDate = _a.firstDate, secondDate = _a.secondDate, maxDate = _a.maxDate, minDate = _a.minDate, selectedDateContainerStyle = _a.selectedDateContainerStyle, font = _a.font, selectedDateStyle = _a.selectedDateStyle;
    var weekDayShort = moment.weekdaysShort();
    var weekDayShortName = weekDayShort.map(function (day) {
        return (React.createElement(View, { key: "".concat(day, "_week_days"), style: styles.dayNameContainer },
            React.createElement(Text, { style: __assign(__assign({}, styles.dayNameStyle), { fontFamily: font }) }, day)));
    });
    var firstDayOfMonth = function () {
        var dateObject = selectedDate;
        var firstDay = dateObject.startOf("month").format("d");
        return Number(firstDay);
    };
    var getRows = function () {
        var blanks = [];
        for (var index = 0; index < firstDayOfMonth(); index++) {
            blanks.push(React.createElement(View, { key: "".concat(index, "_days_blanks"), style: styles.emptyDayNameContainer }));
        }
        var daysInMonth = [];
        var _loop_1 = function (d) {
            var date = moment(selectedDate).date(d);
            var isDisabledMAXD = maxDate ? date.isAfter(maxDate, "days") : false;
            var isDisabledMIND = minDate ? date.isBefore(minDate, "days") : false;
            var isToday = date.isSame(moment(), "day");
            var iddd = secondDate === null || secondDate === void 0 ? void 0 : secondDate.isBefore(firstDate);
            var isSelected = (iddd
                ? date.isBetween(secondDate, firstDate)
                : date.isBetween(firstDate, secondDate)) ||
                date.isSame(firstDate, "day") ||
                date.isSame(secondDate, "day");
            daysInMonth.push(React.createElement(TouchableOpacity, { key: "".concat(d, "_date_month"), disabled: isDisabledMAXD || isDisabledMIND, onPress: function () { return onSelectDate(date); }, style: styles.dayNameContainer },
                React.createElement(View, { style: isSelected
                        ? selectedDateContainerStyle
                            ? selectedDateContainerStyle
                            : styles.todayNameContainer
                        : null },
                    React.createElement(Text, { style: [
                            { fontFamily: font },
                            isSelected
                                ? selectedDateStyle
                                    ? selectedDateStyle
                                    : styles.selectedDate
                                : isToday
                                    ? styles.today
                                    : styles.noneSelectedDate,
                            { opacity: isDisabledMAXD || isDisabledMIND ? 0.2 : 1 },
                        ] }, d))));
        };
        for (var d = 1; d <= selectedDate.daysInMonth(); d++) {
            _loop_1(d);
        }
        var totalSlots = __spreadArray(__spreadArray([], blanks, true), daysInMonth, true);
        var rows = [];
        var cells = [];
        totalSlots.forEach(function (row, index) {
            if (index % 7 !== 0) {
                cells.push(row);
            }
            else {
                rows.push(React.createElement(View, { key: "".concat(index, "_week"), style: styles.weekRow }, cells));
                cells = [];
                cells.push(row);
            }
            if (index === totalSlots.length - 1) {
                var remain = 7 - cells.length;
                for (var indexRemain = 0; indexRemain < remain; indexRemain++) {
                    cells.push(React.createElement(View, { key: "".concat(indexRemain, "_remain_dates"), style: styles.emptyDayNameContainer }));
                }
                rows.push(React.createElement(View, { key: "".concat(index, "_week_").concat(selectedDate.format("MMMM")), style: styles.weekRow }, cells));
            }
        });
        return rows;
    };
    return (React.createElement(View, null,
        React.createElement(View, { style: styles.weekRow }, weekDayShortName),
        getRows()));
});
var styles = StyleSheet.create({
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dayNameContainer: {
        flex: 1,
        minHeight: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    todayNameContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FA4038",
    },
    emptyDayNameContainer: {
        flex: 1,
        minHeight: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedDate: {
        color: "white",
    },
    noneSelectedDate: {
        color: "black",
    },
    today: {
        color: "blue",
    },
    dayNameStyle: {
        fontSize: 11,
        textAlign: "center",
    },
});
