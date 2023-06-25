/// <reference types="react" />
interface IProps {
    label: string;
    onPress: () => void;
    align?: "center" | "auto" | "left" | "right" | "justify" | undefined;
    disabled: boolean;
    font?: string;
}
declare const _default: ({ label, onPress, align, disabled, font, }: IProps) => JSX.Element;
export default _default;
