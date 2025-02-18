import { Pressable, PressableProps } from "react-native";

export default function PressableGeneral({ onPress, style, ...rest }: PressableProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    ...(typeof style == "object" ? style : {}),
                    borderRadius: 5,
                    backgroundColor: pressed ? "rgba(0, 90, 187, 0.1)" : undefined,
                }
            ]}
            onPress={onPress}
            {...rest}
        />
    )
}