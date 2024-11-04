import React from "react";
import { Dimensions,StyleSheet, Text, View,useColorScheme } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

import {
  Colors,
} from "@/constants/Colors";
import { Transaction } from "@/types/Transaction";

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const WIDTH_CARD = Dimensions.get('window').width * 0.85;
const ITEM_HEIGHT = 70;
const WIDTH_SCREEN = Dimensions.get('window').width;

const SHADOW = {
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
}

interface IMappedStrings {
    str: string;
    index: number;
}


type PropType = {
  log: Transaction;
  canRemove: boolean;
  onRemove: (log:Transaction) => void;
};
export const Log = ({ log,onRemove,canRemove }: PropType) => {
  const colorScheme = useColorScheme() ?? 'light';
  const color = log.type === "income" ? Colors.custom.neongreenalt : Colors.custom.neonRed;

  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(20);

  const pan = Gesture.Pan()
  .onBegin(() => {
      pressed.value = true;
  })
  .onChange((event) => {
      if (event.translationX < 0) {
          swipeTranslateX.value = event.translationX;
      }
  })
  .onFinalize(() => {
      const isShouldDismiss = canRemove ? swipeTranslateX.value < -WIDTH_SCREEN * 0.3 : false ;
      if (isShouldDismiss) {
          itemHeight.value = withTiming(0)
          marginVertical.value = withTiming(0)
          swipeTranslateX.value = withTiming(-WIDTH_SCREEN, undefined, (isDone) => {
              if (isDone) {
                  runOnJS(onRemove)(log)
              }
          })
      } else {
          swipeTranslateX.value = withSpring(0);
      }
      pressed.value = false
  });

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
        { translateX: swipeTranslateX.value },
        { scale: withTiming(pressed.value ? 1.15 : 1) },
    ],
}));

const opacityStyle = useAnimatedStyle(() => ({
    opacity: swipeTranslateX.value < -WIDTH_SCREEN * 0.7 ? 0 : 1
}));

const itemHeightStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value
}))



  return (<GestureDetector gesture={pan}>
    <Animated.View style={itemHeightStyle}>
                <Animated.View style={[styles.fieldContainer, transformStyle,{backgroundColor: colorScheme ==='light' ? '#5b2783' : '#993399'}]}>
                        <View style={{left:"50%"}}>
                            <Text style={{fontSize:20,fontWeight:"bold",left:"20%"}}>{log.name}</Text>
                            <Text style={{fontSize:12,left:"12%"}}>{log.category}</Text>
                        </View>
                        <Text style={{ color: color,fontSize:22,right:"50%" }}>
                            $ {log.amount}
                        </Text>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
  );
};

const styles = StyleSheet.create({
fieldContainer: {
    
    justifyContent:"space-between",
    flexGrow: 1,
    flexDirection:'row',
    alignSelf: 'center',
    width: WIDTH_CARD,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    borderRadius: 20,
    ...SHADOW
}
});