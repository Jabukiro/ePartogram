import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

interface Props extends ButtonProps {
    size: "large" | "medium" | "small",
}




export default function MyButton({ size, labelStyle, ...rest }: Props) {
    return (
        <Button labelStyle={{ ...(typeof labelStyle == "object" ? labelStyle : {}), fontSize: setFontSize(size) }} {...rest} />
    )
}
const setFontSize = (size: Props["size"]): number => {
    switch (size) {
        case 'large':
            return 18;
        case 'medium':
            return 14;
        case 'small':
            return 12;
    }
}