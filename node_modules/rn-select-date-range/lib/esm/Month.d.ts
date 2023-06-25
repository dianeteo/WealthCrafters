/// <reference types="react" />
import { ViewStyle, TextStyle } from "react-native";
import moment from "moment";
interface IProps {
    maxDate?: moment.Moment;
    minDate?: moment.Moment;
    selectedDateContainerStyle?: ViewStyle;
    selectedDateStyle?: TextStyle;
    font?: string;
    selectedDate: moment.Moment;
    onSelectDate: (date: moment.Moment) => void;
    firstDate: moment.Moment | null;
    secondDate: moment.Moment | null;
}
declare const _default: ({ selectedDate, onSelectDate, firstDate, secondDate, maxDate, minDate, selectedDateContainerStyle, font, selectedDateStyle, }: IProps) => JSX.Element;
export default _default;
