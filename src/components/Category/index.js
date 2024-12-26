import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import {
    CustomPaper,
    CustomTitlePaper,
    CustomCategoryIcon,
    CustomCategoryListIcon,
    CustomItemIcon
} from './styles';
import { TabContext, TabPanel } from '@mui/lab';
import { ItensByCategoryList } from './List';
import { CategoryForm } from './CreateCategory';
import { ItemForm } from './CreateItem';

export const CategoryTabs = () => {
    const [currentTab, setCurrentTab] = useState(0)

    const handleChange = (event, value) => {
        setCurrentTab(value);
    };

    return (
        <React.Fragment>
            <CustomTitlePaper>
                <Typography>
                    Categoria de Materiais
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
                                    label="Criar categoria"
                                    tabIndex={0}
                                    iconPosition='start'
                                    icon={<CustomCategoryIcon enable={currentTab === 0} />}
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
                                    label="Criar Item Por Categoria"
                                    tabIndex={1}
                                    iconPosition='start'
                                    icon={<CustomItemIcon enable={currentTab === 1} />}
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
                                    label="Categorias"
                                    tabIndex={2}
                                    iconPosition='start'
                                    icon={<CustomCategoryListIcon enable={currentTab === 2} />}
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
                            <CategoryForm />
                        </TabPanel>
                        <TabPanel value={1} index={1} >
                            <ItemForm />
                        </TabPanel>

                        <TabPanel value={2} index={2} >
                            <ItensByCategoryList />
                        </TabPanel>
                    </TabContext>
                </Box>

            </CustomPaper>
        </React.Fragment >
    );
}