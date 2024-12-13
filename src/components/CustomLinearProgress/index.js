import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const CustomLinearProgress = ({
    handleCompleteProgress
}) => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {

                const diff = Math.random() * 30
                return Math.min(oldProgress + diff, 100)
            })
        }, 250)

        return () => {
            clearInterval(timer)
            handleCompleteProgress()
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress
                variant="determinate"
                color={progress === 100 ? "success" : "info"}
                value={progress}
                sx={{ height: 30 }}
            />
        </Box>
    )
}