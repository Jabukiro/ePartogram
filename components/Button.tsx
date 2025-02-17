import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

interface Props extends ButtonProps {
    size: "large",
}




export default function MyButton({ size, ...rest }: Props) {
    return (
        <Button labelStyle={{ ...(typeof rest.labelStyle == "object" ? rest.labelStyle : {}), fontSize: setFontSize(size) }} {...rest} />
    )
}
const setFontSize = (size: Props["size"]) => {
    switch (size) {
        case 'large':
            return 18;
        default:
            return undefined
    }
}