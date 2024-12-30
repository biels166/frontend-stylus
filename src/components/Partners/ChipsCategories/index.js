import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from '../../../services/api';
import { Box } from '@mui/material';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export const ChipsCategories = ({ isSupplier, inputCategories, accordionStyle, hanleUpdateForm = () => [] }) => {
    const [chipData, setChipData] = React.useState([])

    const handleChange = (chipToChange) => () => {
        let chips = chipData.filter((chip) => chip.description !== chipToChange.description)
        let currentStatus = chipToChange.status

        let chipUpdated = { ...chipToChange, status: !currentStatus }
        chips.push(chipUpdated)
        chips.sort((a, b) => {
            if (a.description === b.description)
                return 0

            return a.description < b.description ? -1 : 1

        })

        setChipData(chips)
        hanleUpdateForm(chips.filter(category => category.status))
    }

    async function getOptions() {
        const response = await api.GetCategoryOptions()

        setChipData(
            response.categories.filter(c =>
                (isSupplier ? c.isMaterialCategory : !c.isMaterialCategory)
            )?.map(category =>
            ({
                description: category.description,
                value: category.code,
                status: inputCategories && inputCategories?.includes(category.code.toString())
            })))
    }

    React.useEffect(() => {
        getOptions()
    }, [isSupplier])

    return (
        <Box
            sx={
                accordionStyle ? {
                    minHeight: '3.55rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    margin: '10px 0px 0px 0px',
                } : {
                        minHeight: '3.55rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        margin: '10px 0px 0px 0px',
                        borderRadius: '10px',
                        border: '2px solid #003C73',
                    }}
            component="ul"
        >
            {
                chipData?.map((data) => {
                    return (
                        <ListItem key={data.description}>
                            <Chip
                                variant={data.status ? "filled" : "outlined"}
                                color="info"
                                sx={data.status ? {
                                    backgroundColor: '#003C73',
                                    borderColor: '#003C73',
                                    color: '#FFF',
                                } : {
                                    borderColor: '#003C73',
                                    color: '#003C73',
                                }}
                                label={data.description}
                                deleteIcon={
                                    data.status ?
                                        <DeleteForeverIcon sx={{ fill: '#FFF' }} /> :
                                        <DoneOutlineIcon sx={{ fill: '#003C73' }} />
                                }
                                onDelete={handleChange(data)}
                            />
                        </ListItem>
                    );
                })
            }
        </Box>
    )
}