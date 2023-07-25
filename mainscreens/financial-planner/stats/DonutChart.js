import React, { useState,useEffect } from 'react';
import { Easing, TextInput, Animated, View, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { Spinner } from 'native-base';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function DonutChart({
  percentage,
  radius = 80,
  strokeWidth = 12,
  duration = 500,
  color = "tomato",
  textColor,
  max = 100
}) {
  const animated = React.useRef(new Animated.Value(0)).current;
  const [displayedPercentage, setDisplayedPercentage]=useState(0);
  const [strokeDashOffset,setStrokeDashOffset]=useState(0);
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 100,
      toValue,
      duration,
      useNativeDriver:false,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const percentageValue = Math.round(v.value);
      const clampedPercentage = Math.min(percentageValue, max); // Ensure it does not exceed max (default: 100)
      const strokeDashoffset = circumference - (circumference * clampedPercentage) / 100;
      setDisplayedPercentage(clampedPercentage);
      if (circleRef?.current) {
        setStrokeDashOffset(strokeDashoffset);
      }
    });

    return () => {
      animated.removeAllListeners();
    };
  }, [percentage]);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={strokeDashOffset}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        value={`${Math.round(displayedPercentage)}%`}
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          styles.text,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});