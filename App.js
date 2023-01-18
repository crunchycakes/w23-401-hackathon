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
  const [position,setPosition] = useState([0,-1,-2]);
  const [scale,setScale] = useState([0.01, 0.01, 0.01]);
  const [text,setText] = useState("")
  const [title,setTitle] = useState("")
  
  const moveObject = (newPosition) => {}
  
  const scaleObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentScale = scale[0];
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale, newScale, newScale];
      setScale(newScaleArray);
    }
  }
  
  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
      setTitle("Branta canadensis")
      setScale([0.01, 0.01, 0.01])
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("")
      setTitle("")
      setScale([0,0,0])
    }
  }
  
  return (
    <ViroARScene ref={(scene)=>{this.scene = scene}} onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff"/>
      {data.hack === false?
        <React.Fragment>
            <Viro3DObject
              source={require("./assets/12256_canadiangoos_v1_l3.obj")}
              resources={[
                require("./assets/goose.mtl"),
                require("./assets/12256_canadiangoos_feet_diffuse.jpg"),
                require("./assets/12256_canadiangoos_goos_diffuse.jpg"),
                require("./assets/12256_canadiangoos_goos_spec.jpg"),
                require("./assets/Map__4_Normal_Bump.jpg"),
                require("./assets/Map__12_Normal_Bump.jpg")
              ]}
              position={position}
              scale={scale}
              rotation={[-90, 0, 0]}
              type="OBJ"
              onDrag={moveObject}
              onPinch={scaleObject}
            />
            <ViroText
              text={title}
              textClipMode="clipToBounds"
              width={2}
              height={2}
              position={position}
              style={styles.vtextTitle}
            />
            <ViroText
              text={text}
              textClipMode="clipToBounds"
              width={2}
              height={2}
              position={[position[0], position[1]-0.3, position[2]]}
              style={styles.vtext}
            />
        </React.Fragment>
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
    },
    vtextTitle:{
      fontFamily:"Arial",
      fontSize:20,
      fontWeight:"400",
      fontStyle:"italic"
    },
    vtext:{
      fontFamily:"Arial",
      fontSize:10,
      fontWeight:"300",
    }
});
