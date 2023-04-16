import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Login: undefined,
    Register: undefined,
    Home: undefined;
};
  
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
  
type LoginNavigationProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type RegisterNavigationProps = NativeStackScreenProps<RootStackParamList, 'Register'>
  
export { RootStackParamList, LoginNavigationProps, RegisterNavigationProps }