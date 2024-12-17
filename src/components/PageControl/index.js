import { FormControl, MenuItem, Select, Typography } from "@mui/material"
import { BoxControl, PageInfoBox, ReloadSearch, Selections } from "./styles"
import { CounterInfo } from "../CounterInfo"
import { useEffect, useState } from "react"


export const PageControl = ({
    itens,
    total,
    handleOnChange = () => Number,
    handleOnClick,
    cacheItensPerPage
}) => {
    const [itensPerPage, setItensPerPage] = useState(cacheItensPerPage)
    const [options, setOptions] = useState([5, 10, 15, 20])

    useEffect(() => {
        let lastOption = 20

        if (total > lastOption) setOptions([...options, total])
            
    }, [total])

    return (
        <PageInfoBox>
            <CounterInfo
                itens={itens}
                total={total}
            />

            <BoxControl>
                <FormControl variant='standard'>
                    <Selections>

                        <Typography>
                            Itens por página:
                        </Typography>

                        <Select
                            labelId="select-outlined-label-itens"
                            value={itensPerPage}
                            onChange={(evt) => {
                                setItensPerPage(evt.target.value)
                                handleOnChange(evt.target.value)
                            }}
                            label="Itens por página"
                        >
                            {
                                options?.map(elem => (
                                    <MenuItem
                                        selected={itensPerPage === elem}
                                        value={elem}
                                    >
                                        {elem}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Selections>
                </FormControl>

                <ReloadSearch onClick={() => { handleOnClick() }} />

            </BoxControl>
        </PageInfoBox>
    )
}