type NavigationTab = {
    route: string;
    component: (props: any) => JSX.Element;
    label: string;
    icon: string;
}

export { NavigationTab }