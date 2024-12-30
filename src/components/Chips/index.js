import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ROLES_DESCRIPTIONS } from '../../constants/ROLES_DESCRIPTIONS';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export const ChipsArray = ({ isAdmnistrator, userRoles, hanleUpdateForm = () => [] }) => {

    const [chipData, setChipData] = React.useState(ROLES_DESCRIPTIONS.map(role =>
    ({
        description: role,
        value: userRoles?.find(r => r.description === role)?.value ?? false,
        category: userRoles?.find(r => r.description === role)?.category ?? ''
    })))


    const handleChange = (chipToChange) => () => {
        let chips = chipData.filter((chip) => chip.description !== chipToChange.description)
        let currentValue = chipToChange.value

        let chipUpdated = { ...chipToChange, value: !currentValue }
        chips.push(chipUpdated)
        chips.sort((a, b) => {
            if (a.value === b.value) {
                if (a.description === b.description)
                    return 0

                return a.description < b.description ? -1 : 1
            }

            return a.value ? -1 : 1
        })

        setChipData(chips)
        hanleUpdateForm(chips.filter(role => role.value))
    }

    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                margin: '10px 0px 0px 0px',
                borderRadius: '10px'
            }}
            component="ul"
        >
            {
                chipData?.map((data) => {
                    return (
                        <ListItem key={data.description}>
                            <Chip
                                variant={data.value ? "filled" : "outlined"}
                                color="info"
                                sx={data.value ? {
                                    backgroundColor: '#003C73',
                                    borderColor: '#003C73',
                                    color: '#FFF',
                                } : {
                                    borderColor: '#003C73',
                                    color: '#003C73',
                                }}                                label={data.description}
                                deleteIcon={
                                    data.value ?
                                        <DeleteForeverIcon sx={{ fill: '#FFF' }} /> :
                                        <DoneOutlineIcon sx={{ fill: '#003C73' }} />
                                } onDelete={handleChange(data)}
                            />
                        </ListItem>
                    );
                })
            }
        </Paper>
    )
}