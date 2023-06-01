import { Image, ImageStyle } from 'react-native'
import React from 'react'

type Props = {
    path: any,
    style?: ImageStyle
}

const Icon = ({path, style}: Props) => {
    return(
        <Image source={path} style={style}/> 
    )
}

export default Icon