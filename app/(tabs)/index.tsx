import { Dimensions,Image, StyleSheet, Platform,FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Log } from '@/components/Log';
import { useContext,useEffect } from 'react';
import { Transaction } from '@/types/Transaction';
import { Link, useNavigation,Stack } from 'expo-router';
import { init,fetchEntries,deleteTransaction } from '@/components/Database';
import { Custombtn } from '@/components/Custombtn';
import { LogsContextProvider,LogsContext } from '@/store/logsctx';
import * as SplashScreen from 'expo-splash-screen';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Summary } from '@/components/Summary';


export default function HomeScreen() {

    const logsctx = useContext(LogsContext);
    const logs:Transaction[] = logsctx.logs;

    const addTransaction = () => {
        //console.log("hi");
      };

    const removeTransaction = (log:Transaction) => {
        logsctx.removeEntry(log);
        deleteTransaction(log);
    };
    
  useEffect(() => {
    init()
      .then(() => {
        SplashScreen.hideAsync()
      })
      .catch((error) => {
        console.error(error);
      });
      const fetchexpensesHandler = async () => {
          const transactions = await fetchEntries();
          //console.log(transactions);
          transactions.forEach((x) => {
            logsctx.addEntry(x as Transaction);
          });
      };
  
        fetchexpensesHandler();



  }, []);

  return (
    <GestureHandlerRootView style={{}}>
      <FlatList
        ListHeaderComponent={():React.JSX.Element=>{
            return(
            <ParallaxScrollView
              headerBackgroundColor={{ light: '#5b2783', dark: '#993399' }}
              headerImage={
                <ThemedView style={styles.buttonContainer}><Summary transactions={logsctx.logs}></Summary>
                    <ThemedText
                    style={styles.addbutton}><Link href="/form" onPress={addTransaction}><Ionicons style={{width:"100%",height:"100%"}} name="add-circle" size={24} color="black"/></Link>
                    </ThemedText>
                </ThemedView>
              }
              >
            </ParallaxScrollView>)}}
        data={logs}
        renderItem={
            (i) => {return(
                    <Log log={i.item} canRemove={true} onRemove={removeTransaction}/>
            )}
        }
        extraData={logsctx.logs}
        keyExtractor={(i)=>i.name+Math.random()}
      />
        </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  addbutton:{
    position:'absolute',
    left:"90%",
    top:"100%",
    fontSize:72,
    fontWeight:'600'
  },
  buttonContainer:{
    position:'absolute',
    width:"100%",
    height:"50%",
    backgroundColor: "#00000000",
    alignSelf:'auto'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
});
