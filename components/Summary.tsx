import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View,useColorScheme } from "react-native";

// import { PieChartComponent } from "../../../components/piechartComponent";
import {
  Colors,
  fontSizes,
  spacing,
  styleNumber,
} from "../constants/Colors";
import { Transaction } from "@/types/Transaction";

type PropType = {
    transactions: Transaction[];
};
export const Summary = ({
    transactions
}: PropType) => {
    const colorScheme = useColorScheme() ?? 'light';
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [incomeAmount, setIncomeAmount] = useState(0);

  useEffect(() => {
    let expense = 0;
    let income = 0;
    transactions.map((singleExpense: Transaction) => {
      if (singleExpense.type === "income") {
        income += singleExpense.amount;
      } else {
        expense += singleExpense.amount;
      }
    });
    setExpenseAmount(expense);
    setIncomeAmount(income);
  }, [transactions]);

  let color: string = "white";
  let total: string = "";
  const expenseTotalHandlert = () => {
    if (incomeAmount > expenseAmount) {
      color = Colors.custom.neongreenalt;
      total = "$" + (incomeAmount - expenseAmount);
    } else if (incomeAmount < expenseAmount) {
      color = Colors.custom.neonRed;
      total = "$" + (incomeAmount - expenseAmount);
    } else {
      color = "white";
      total = "$0";
    }
    return (
      <Text style={[styles.incomeExpenseTXT, { color: color }]}>{total}</Text>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.cardContainer, {borderColor: color}]}
    >
      <View style={styles.incomeExpenseContainer}>
        {expenseTotalHandlert()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#00000000",
    width: "80%",
    height: "60%",
    marginBottom: spacing.l,
    padding: spacing.s,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: styleNumber.borderRadius,
    borderWidth: 3,
    top:"17%",
    left:"20%"
  },
  incomeExpenseContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  incomeExpenseTXT: {
    bottom:"8%",
    color: Colors.custom.white,
    fontSize: fontSizes.headingl,
  },
});
