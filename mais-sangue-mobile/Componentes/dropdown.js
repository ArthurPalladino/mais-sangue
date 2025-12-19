import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


  const DropdownComponent = ({showData,insideText,nm_icon,onChangeAction,valor}) => {
    const [isFocus, setIsFocus] = useState(false);




    return (
      <View style={{marginLeft:"10%",justifyContent:'center',width:"80%"}}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={showData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? insideText : '...'}
          value={valor}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            onChangeAction(item.value);
            setIsFocus(false);
          }}
          renderRightIcon={() => (
            <MaterialIcons
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name={nm_icon}
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });