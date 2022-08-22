import { Box, Typography } from "@mui/material"

const Footer = () => {
    return(
        <Box 
            sx={{ 
                display: 'flex',
                position: 'fixed',
                bottom: 0,
                justifyContent: 'space-around',
                background: '#f5f5f5',
                py: 2,
                width: '100%'
            }}
        >
            <Typography >Copyright</Typography>
            <Typography >All rights reserved</Typography>
        </Box>
    )
}

export default Footer