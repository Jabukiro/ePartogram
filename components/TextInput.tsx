import * as React from 'react';
import { } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { useAppTheme } from '@/app/_layout';

export default function MyTextInput(props: TextInputProps) {
    const theme = useAppTheme();

    return (
        <TextInput style={{
            //...props.style: typescript doesn't like as props.style can be many types,
            //and only objects should be spread
            ...(typeof props.style == "object" ? props.style : {}),
            marginBottom: theme.spacing.m_05,
        }}
            {...props} />
    )
}