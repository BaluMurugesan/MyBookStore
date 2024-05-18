import {Text as TextComponent} from 'react-native';
const Text = ({children, style = {}, ...props}) => {
  return (
    <TextComponent
      {...props}
      style={{
        color: '#252525',
        fontFamily: 'Poppins-Regular',
        ...style,
      }}>
      {children}
    </TextComponent>
  );
};
export default Text;
