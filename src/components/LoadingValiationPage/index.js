import * as React from 'react';
import { ProgressBox, TextContainer, TextImage } from './styles'
import { LinearProgress } from '@mui/material';
import imageMessage from '../../assets/message-verifyCrendentials.jpg'

function LoadingValiationPage() {

    return (
        <ProgressBox>
            <LinearProgress
                color='info'
                sx={{ height: 5, }}
            />

            <LinearProgress
                sx={{ height: 8, mt: 0.15, mb: 0.15 }}
            />

            <LinearProgress
                color='info'
                sx={{ height: 5, mb: 10 }}
            />

            <TextContainer>
                <TextImage src={imageMessage} />
            </TextContainer>
        </ProgressBox>
    )
}

export default LoadingValiationPage