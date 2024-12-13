import * as React from 'react';
import { Alert, Snackbar } from '@mui/material'


export const CustomToast = ({
    open,
    timeDuration,
    severity,
    info,
    handleOnClose
}) => {

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={timeDuration || 6000}
            onClose={handleOnClose}
        >
            <Alert
                onClose={handleOnClose}
                severity={`${severity}`}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {info}
            </Alert>
        </Snackbar>
    )
}
