import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Start: undefined,
    Login: undefined,
    Register: undefined,
    Home: undefined;
    Auth: undefined;
    Workout: undefined;
    PlanList: undefined;
    AddPlan: undefined;
    WorkoutPlan: undefined;
    AddWorkout: undefined;
    AddExercise: undefined;
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
type WorkoutNavigationProps = NativeStackScreenProps<RootStackParamList, 'Workout'>
type PlanListNavigationProps = NativeStackScreenProps<RootStackParamList, 'PlanList'>
type AddPlanNavigationProps = NativeStackScreenProps<RootStackParamList, 'AddPlan'>
type WorkoutPlanNavigationProps = NativeStackScreenProps<RootStackParamList, 'WorkoutPlan'>
type AddWorkoutNavigationProps = NativeStackScreenProps<RootStackParamList, 'AddWorkout'>
type AddExerciseNavigationProps = NativeStackScreenProps<RootStackParamList, 'AddExercise'>

export { 
    RootStackParamList, 
    LoginNavigationProps, 
    RegisterNavigationProps, 
    StartNavigationProps,
    AuthNavigationProps,
    WorkoutNavigationProps,
    PlanListNavigationProps,
    AddPlanNavigationProps,
    WorkoutPlanNavigationProps,
    AddWorkoutNavigationProps,
    AddExerciseNavigationProps,
}