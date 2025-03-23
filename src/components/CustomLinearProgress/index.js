import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const CustomLinearProgress = ({
    handleCompleteProgress
}) => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        console.log("iniciou o timer")
        const timer = setInterval(() => {
            setProgress((oldProgress) => {

                const diff = Math.random() * 30
                console.log("diff", diff)
                return Math.min(oldProgress + diff, 100)
            })
        }, 250)

        console.log("concluiu o timer")

        setTimeout(() => {
            clearInterval(timer)
            handleCompleteProgress()
            console.log("Intervalo parado.")
        }, 5000)

        return () => {
            clearInterval(timer)
            console.log("pós clearInterval")
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