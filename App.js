import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component {
constructor(){
  super();
  this.state = {
    hasCameraPermissions:undefined,
    scanned: false,
    scannedData: '',
    buttonState: 'normal',
  }
}

getCameraPermissions = async () =>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA);
  
  this.setState({
    /*status === "granted" is true when user has granted permission
      status === "granted" is false when user has not granted the permission
    */
    hasCameraPermissions: status === "granted",
    buttonState:"clicked",
    scanned: false
  });
}

handleBarCodeScanned = async({type, data})=>{
  const {buttonstate}=this.state.buttonState
  if(buttonstate==='clicked'){
this.setState({
    scanned: true,
    scannedData: data,
  });
  ;
  }
 
}

render() {
  const hasCameraPermissions = this.state.hasCameraPermissions;
  const scanned = this.state.scanned;
  const buttonState = this.state.buttonState;

  if (buttonState !== "normal" && hasCameraPermissions){
    return(
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
  
      />
    );
  }

  else if (buttonState === "normal"){
    return(
      <View style={styles.container}>
      <View>
      <Image source={require('../BAR.jpg') } style={{width:100,height:100}}/>
<TouchableOpacity onPress={()=>{this.getCameraPermissions()}} style={styles.scanButton}>Scan</TouchableOpacity>
</View>
    </View>
    )
  
    }
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
displayText:{
  fontSize: 15,
  textDecorationLine: 'underline'
},
scanButton:{
  backgroundColor: '#2196F3',
  width:50,
borderWidth:2,
borderLeftWidth:0
},
buttonText:{
  fontSize: 20,
  textAlign:"center",
  marginTop:9
},
inputView:{
  flexDirection:"row",
  margin:16
}, inputbox:{
  width:200,
  height:40,
  borderWidth:2,
  borderRightWidth:0,
  fontSize:23
}
});