import React from 'React';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import clrs from '../utils/clrs.js';
import FadeInView from './FadeInView.js';

const defaultImg = require('../assets/placeholder.jpg');

const ListItem = ({index,text,imageUrl}) => {
  var image = defaultImg;
  if (imageUrl) {image = {uri: imageUrl};}
  return (
    <TouchableOpacity underlayColor={clrs.black}>
      <FadeInView delay={index * 25}>
        <View style={styles.mediaObject}>
          <Image source={image} style={styles.image}/>
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
      </FadeInView>
   </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  mediaObject: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: { flex: 1 },
  image: {
    backgroundColor: clrs.gray,
    width: 40,
    height: 40,
    marginRight: 16,
    marginLeft: 16,
  },
});

ListItem.propTypes = {
  index: React.PropTypes.string,
  text: React.PropTypes.string,
  imageUrl: React.PropTypes.string,
  navState: React.PropTypes.object,
  navigator: React.PropTypes.object,
};
