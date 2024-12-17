import { Box } from '@mui/material'
import RecipReviewCard from '../../components/Tasks'

export const TaskBoard = () => {

    return (
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>

            <h1>Hello my friend</h1>

            <RecipReviewCard />
        </Box>
    )
}