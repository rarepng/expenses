import React, { useContext, useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";

import { Button, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from "expo-linear-gradient";

import { LogsContext } from "@/store/logsctx";
import {
  Colors,
  fontSizes,
  spacing,
  styleNumber,
} from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { Custombtn } from "@/components/Custombtn";
import { insertTransaction,deleteTransaction } from "@/components/Database";
import { Transaction } from "@/types/Transaction";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Text } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function()  {
    const logsctx = useContext(LogsContext);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues
  } = useForm({
    defaultValues:{
        name:"" as string,
        date: new Date().getTime() as number,
        type:"" as string,
        amount:0 as number,
        category:"" as string,
        description:"" as string
    }
  });
  const [renderDatepicker,setRenderDatePicker] = useState(false);
  const [renderDone,setRenderDone] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    logsctx.addEntry(data as Transaction);
    await insertTransaction(data as Transaction);
    

  };
  if(!renderDone){
  return (
        <ScrollView        
         contentContainerStyle={{
            height: "100%",
            width: "100%",
            paddingTop:60,
            //margin: 10,
            justifyContent:"center",
            alignItems:"center",
            //flexGrow:1
          }}
          contentInsetAdjustmentBehavior="automatic"
          automaticallyAdjustKeyboardInsets>
        <Stack.Screen options={{title: 'Add transaction'}}/>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Name"
              value={value}
              onChangeText={onChange}
              maxLength={20}
              style={[styles.textInput, styles.formField]}
              placeholderTextColor={Colors.custom.white}
            />
          )}
          name="name"
          rules={{ required: "Name is required" }}
        />

        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <SelectDropdown
              dropdownStyle={styles.DropdownStyle}
              data={["Income", "Expense"]}
              onSelect={onChange}
              renderButton={(item,isOpened) =>{
                return(
                    <ThemedView style={[styles.DropdownButtonStyle, styles.formField]}>
                        <ThemedText style={styles.DropdownButtonTextStyle}>{item??"Type"}</ThemedText>
                    </ThemedView>
                )
              }}
              renderItem={(item,idx,isSelected)=>{
                return(
                    <ThemedView style={styles.DropdownRowStyle}>
                        <ThemedText style={styles.DropdownRowTextStyle}>
                            {item}
                        </ThemedText>
                    </ThemedView>
                )
              }}
              showsVerticalScrollIndicator={false}
              
            />
          )}
          name="type"
          rules={{ required: "Type is required" }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
                inputMode="numeric"
              keyboardType="decimal-pad"
              placeholder="Amount"
              maxLength={6}
              style={[styles.textInput, styles.formField]}
              value={value.toString()}
              onChangeText={(amount) => onChange(+amount)}
              placeholderTextColor={Colors.custom.white}
            />
          )}
          name="amount"
          rules={{ required: "Amount is required" }}
        />
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <SelectDropdown
              dropdownStyle={styles.DropdownStyle}
              data={[
                "Personal",
                "Transportation",
                "Medical",
                "Other"
              ]}
              onSelect={onChange}
              renderButton={(item,isOpened) =>{
                return(
                    <View style={[styles.DropdownButtonStyle, styles.formField]}>
                        <Text style={styles.DropdownButtonTextStyle}>{item??"Category"}</Text>
                    </View>
                )
              }}
              renderItem={(item,idx,isSelected)=>{
                return(
                    <View style={styles.DropdownRowStyle}>
                        <Text style={styles.DropdownRowTextStyle}>
                            {item}
                        </Text>
                    </View>
                )
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
          name="category"
          rules={{ required: "Category is required" }}
        />
            <Controller
                name="date"
                control={control}
                
                rules={{ required: "Date is required" }}
                render={({ field:{onChange, value} }) =>{
                    
                    if(renderDatepicker){
                    return(
                    <TouchableOpacity style={[styles.textInput, styles.formField]} onPress={()=>setRenderDatePicker(true)}>
                    <DateTimePicker
                    value={new Date(value)}
                    mode="date"
                    onChange={(v)=>{
                        setRenderDatePicker(false);
                        onChange(v.nativeEvent.timestamp);
                    }}
                /><Text>{"Date"}</Text></TouchableOpacity>
                )}else return <TouchableOpacity style={[styles.textInput, styles.formField]} onPress={()=>setRenderDatePicker(true)}><Text style={{color: Colors.custom.white}}>{new Date(value).toDateString()??"Date"}</Text></TouchableOpacity>}}
            />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline={true}
              style={[styles.textInput, styles.formField]}
              placeholder="Description"
              value={value}
              numberOfLines={5}
              onChangeText={onChange}
              placeholderTextColor={Colors.custom.white}
            />
          )}
          name="description"
        />
      <Link
        href="../(tabs)"
        onPress={()=>{setRenderDone(true);handleSubmit(onSubmit);}}
        disabled={!isValid} style={{flex:1,justifyContent:"center",alignItems:"center"}}
      ><View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Ionicons style={{width:"100%",height:"100%"}} name="add-circle" size={72} color={isValid ? "black" : "gray" }/></View></Link>
      </ScrollView>
  );}
  else{
    return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center",top:"25%",left:"25%"}}>
        <Stack.Screen options={{title: 'Add transaction'}}/>
        <Ionicons style={{width:"100%",height:"100%"}} name="checkmark-done" size={200} color={Colors.custom.neongreen }/>
    </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //paddingBottom: spacing.s,
  },
  textInput: {
    paddingVertical: spacing.s,
    paddingHorizontal: "10%",
    color: Colors.custom.white,
  },
  formField: {
    width:"90%",
    backgroundColor: Colors.custom.formBlack,
    margin: spacing.s,
    borderBottomWidth: 3,
    fontSize: fontSizes.labelFont,
    borderColor: Colors.custom.neongreenalt,
    borderTopLeftRadius: styleNumber.borderRadius,
    borderTopRightRadius: styleNumber.borderRadius,
  },
  DropdownButtonStyle: {
    minHeight:60
  },
  DropdownButtonTextStyle: {
    color: Colors.custom.white,
    top:"30%",
    left:"12%",
    fontSize: fontSizes.labelFont,
  },
  DropdownStyle: {
    padding:0,
    margin:0,
    backgroundColor: Colors.custom.formBlack,
    borderBottomEndRadius: styleNumber.borderRadius,
    borderBottomStartRadius: styleNumber.borderRadius,
  },
  DropdownRowTextStyle: {
    color: Colors.custom.white,
  },
  DropdownRowStyle: {
    left:0,
    padding:10
  },
});
