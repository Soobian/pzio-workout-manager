type NavigationTab = {
    route: string;
    component: () => JSX.Element;
    label: string;
    icon: string;
}

export { NavigationTab }