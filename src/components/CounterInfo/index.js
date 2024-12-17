import { Typography } from "@mui/material"
import { CounterInfoStyle } from "./styles"


export const CounterInfo = ({itens, total}) => {

    return (
        <CounterInfoStyle>
            <Typography>
                Exibindo {itens} de {total}
            </Typography>
        </CounterInfoStyle>
    )
}