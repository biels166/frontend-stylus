import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import { DetailsIcon, CustomPaper, CustomTitlePaper, CustomPhoneIcon, CustomIcon } from './styles';
import { TabContext, TabPanel } from '@mui/lab';
import { PartnerDetails } from './Details';
import { OfferedList } from './Offered/List/index';
import { ContactsList } from './Contacts/List';
import { useLocation } from 'react-router-dom';


export const PartnerDataTabs = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const [name, setName] = useState('')
    const location = useLocation()
    const dynamicTabName = location.state?.isSupplier ? 'Produtos que fornece' : 'Serviços que oferece'

    const handleChange = (event, value) => {
        setCurrentTab(value);
    };

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    {name}
                </Typography>
            </CustomTitlePaper>

            <CustomPaper>
                <Box sx={{ width: '100%', backgroundColor: '#E8EAED', borderRadius: 2 }}>

                    <TabContext
                        value={currentTab}
                        onChange={handleChange}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#FFFFFF', boxShadow: '1px 1px #A9A9A9', }}>
                            <Tabs
                                value={currentTab}
                                onChange={handleChange}
                            >
                                <Tab
                                    label="Detalhes do Parceiro"
                                    tabIndex={0}
                                    iconPosition='start'
                                    icon={<DetailsIcon enable={currentTab === 0} />}
                                    sx={currentTab === 0 ? ({
                                        backgroundColor: '#E0FFFF',
                                        WebkitTextFillColor: '#2775A2',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        boxShadow: '5px 10px 5px #A9A9A9',
                                        borderBottom: 5,
                                        borderColor: '#2775A2',
                                    }) : ({
                                        '&:hover': { background: '#f2ffff' }
                                    })}
                                />

                                <Tab
                                    label="Contatos"
                                    tabIndex={1}
                                    hidden
                                    iconPosition='start'
                                    icon={<CustomPhoneIcon enable={currentTab === 1} />}
                                    sx={currentTab === 1 ? ({
                                        backgroundColor: '#E0FFFF',
                                        WebkitTextFillColor: '#2775A2',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        boxShadow: '5px 10px 5px #A9A9A9',
                                        borderBottom: 5,
                                        borderColor: '#2775A2',
                                    }) : ({
                                        '&:hover': { background: '#f2ffff' }
                                    })}
                                />

                                <Tab
                                    label={dynamicTabName}
                                    tabIndex={2}
                                    iconPosition='start'
                                    icon={<CustomIcon enable={currentTab === 2} />}
                                    sx={currentTab === 2 ? ({
                                        backgroundColor: '#E0FFFF',
                                        WebkitTextFillColor: '#2775A2',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        boxShadow: '5px 10px 5px #A9A9A9',
                                        borderBottom: 5,
                                        borderColor: '#2775A2',
                                    }) : ({
                                        '&:hover': { background: '#f2ffff' }
                                    })}
                                />
                            </Tabs>
                        </Box>

                        <TabPanel value={0} index={0} >
                            <PartnerDetails handleName={(name) => setName(name)} />
                        </TabPanel>
                        <TabPanel value={1} index={1} >
                            <ContactsList />
                        </TabPanel>
                        <TabPanel value={2} index={2} >
                            <OfferedList />
                        </TabPanel>
                    </TabContext>
                </Box>

            </CustomPaper>
        </React.Fragment >
    );
}