import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Start: undefined,
    Login: undefined,
    Register: undefined,
    Home: undefined;
    Auth: undefined;
};
  
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
  
type LoginNavigationProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type RegisterNavigationProps = NativeStackScreenProps<RootStackParamList, 'Register'>
type StartNavigationProps = NativeStackScreenProps<RootStackParamList, 'Start'>
type AuthNavigationProps = NativeStackScreenProps<RootStackParamList, 'Auth'>
  
export { 
    RootStackParamList, 
    LoginNavigationProps, 
    RegisterNavigationProps, 
    StartNavigationProps,
    AuthNavigationProps,
}