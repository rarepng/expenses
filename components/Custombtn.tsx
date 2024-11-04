import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styleNumber, Colors, fontSizes, spacing } from "../constants/Colors"

type Props = {
  onPress: () => void;
  btnPlaceHolder: string;
  disabled?: boolean;
};
export const Custombtn = ({ onPress, btnPlaceHolder, disabled }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[disabled ? [styles.Btn, styles.disabledBtn] : styles.Btn]}
    disabled={disabled}
  >
    <Text style={styles.BtnTxt}>{btnPlaceHolder}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  Btn: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.m,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    borderRadius: styleNumber.borderRadius,
    backgroundColor: Colors.custom.neongreenalt,
    width: "85%"
  },
  disabledBtn: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.m,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    borderRadius: styleNumber.borderRadius,
    width: "85%",
    backgroundColor: Colors.custom.disabledGrey
  },
  BtnTxt: { fontSize: fontSizes.labelFont,alignSelf:"center" },
});
