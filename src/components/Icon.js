import Svg, { Path }from 'react-native-svg';

const PATHS = {
    back:        "M19 12H5M11 6l-6 6 6 6",
    close:       "M6 6l12 12M18 6L6 18",
    chevronDown: "M6 9l6 6 6-6",
    arrowRight:  "M5 12h14M13 6l6 6-6 6",
    add: "M12 5v14M5 12h14",
};

export default function Icon({ name, color = '#000', size= 22, width = 2 }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d={PATHS[name]}
                stroke={color}
                strokeWidth={width}
                strokeLinecap="round"
                strokeLinejoin="round"
            />  
        </Svg>
    )
}