import * as React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useAppTheme } from '@/app/_layout';

interface Props extends ViewProps {
    full: boolean,
}
export default function MainContainer({ full = true, ...rest }: Props): React.ReactNode {
    const theme = useAppTheme();
    return (
        <View style={{
            ...(typeof rest.style == "object" ? rest.style : {}),
            backgroundColor: "#aaa", marginHorizontal: 10, paddingHorizontal: 50, paddingVertical: theme.spacing.p_2, height: full ? "100%" : undefined
        }} {...rest} />
    )
}