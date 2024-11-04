import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList,StyleSheet, Image, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Summary } from '@/components/Summary';
import { useContext } from 'react';
import { LogsContext } from '@/store/logsctx';
import { Log } from '@/components/Log';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
    const logsctx = useContext(LogsContext);

    const logs = logsctx.logs.filter(x => new Date(x.date).getMonth() === new Date().getMonth());


    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[new Date().getMonth()];

  return (
  
    <GestureHandlerRootView style={{}}>
    
    <FlatList
        ListHeaderComponent={():React.JSX.Element=>{
            return(
            
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
        <ThemedView style={styles.buttonContainer}><Summary transactions={logs}></Summary><ThemedText style={{top:"80%",left:"5%",fontSize:24,fontWeight:"bold"}}>{currentMonthName}</ThemedText>
        </ThemedView>
        }>
    </ParallaxScrollView>  )}}
        data={logs}
        renderItem={
            (i) => {return(
                    <Log log={i.item} canRemove={false} onRemove={(i)=>{console.log(i)}}/>
            )}
        }
        keyExtractor={(i)=>i.name+Math.random()}
    /> 
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  buttonContainer:{
    position:'absolute',
    width:"100%",
    height:"50%",
    backgroundColor: "#00000000",
    alignSelf:'center'
  }
});
