import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import { ClientDetailsIcon, CustomPaper, CustomTitlePaper, CustomUPhoneIcon } from './styles';
import { TabContext, TabPanel } from '@mui/lab';
import nfseIcon from '../../../assets/NFSe_Icon_Logo.svg'
import disableNfseIcon from '../../../assets/NFSe_Icon_Disable.svg'
import SVG from 'react-inlinesvg'
import { ClientDetails } from './Details';
import { ClientNFList } from './NF/List/index';
import { ContactsList } from './Contacts/List';


export const ClientDataTabs = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const [clientName, setClientName] = useState('')

    const handleChange = (event, value) => {
        setCurrentTab(value);
    };

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    {clientName}
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
                                    label="Detalhes do Clinte"
                                    tabIndex={0}
                                    iconPosition='start'
                                    icon={<ClientDetailsIcon enable={currentTab === 0} />}
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
                                    icon={<CustomUPhoneIcon enable={currentTab === 1} />}
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
                                    tabIndex={2}
                                    iconPosition='bottom'
                                    icon={<SVG src={currentTab === 2 ? nfseIcon : disableNfseIcon} />}
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
                            <ClientDetails handleClientName={(name) => setClientName(name)}/>
                        </TabPanel>
                        <TabPanel value={1} index={1} >
                            <ContactsList />
                        </TabPanel>
                        <TabPanel value={2} index={2} >
                            <ClientNFList />
                        </TabPanel>
                    </TabContext>
                </Box>

            </CustomPaper>
        </React.Fragment >
    );
}