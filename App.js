import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARPlane,
  ViroText,
  ViroBox,
  ViroConstants,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroAmbientLight,
  Viro3DObject,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = (props) => {

  let data = props.sceneNavigator.viroAppProps;
  const [position,setPosition] = useState([0,-1.1,-2]);
  const [scale,setScale] = useState([0.0001, 0.0001, 0.0001]);
  
  const moveObject = (newPosition) => {}
  
  const scaleObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentScale = scale[0];
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale, newScale, newScale];
      setScale(newScaleArray);
    }
  }
  
  return (
    <ViroARScene ref={(scene)=>{this.scene = scene}}>
      <ViroAmbientLight color="#ffffff"/>
      {data.hack === false?
            <Viro3DObject
              source={require("./assets/10067_Eiffel_Tower_v1_max2010_it1.obj")}
              position={position}
              scale={scale}
              rotation={[-90, 0, 0]}
              type="OBJ"
              onDrag={moveObject}
              onPinch={scaleObject}
            />
            :
            null
      }
    </ViroARScene>
   );
  
};

export default () => {
  const [hack,setHack] = useState(false)
  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        viroAppProps={{"hack":hack}}
        style={{flex:1}}
      />
      <View style={styles.buttonsView}>
        <TouchableOpacity onPress={()=>setHack(!hack)}>
          <Text style={styles.textButton}>Toggle visibility</Text>
        </TouchableOpacity>
        <Text style={styles.text}>More models later :)))</Text>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
    mainView:{
      flex:1
    },
    buttonsView:{
      width:'100%',
      height:100,
      backgroundColor:'#ffffff',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    textButton:{
      margin:30,
      fontWeight:'bold',
      backgroundColor:'#c9c9c9',
      padding:10,
      textAlign:'center'
    },
    text:{
      margin:20
    }
});
