import { NextPage } from "next"
import { Box, Typography } from '@mui/material'
import Header from "../components/layouts/main/Header"

const anotherPage: NextPage = () => {
    return (
        <>
            <Header/>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin={8}
            >
                <Typography
                    variant="h3"    
                >
                    Another Page
                </Typography>
                <Typography
                    variant="body1"
                >
                    This is another page.
                </Typography>

            </Box>
        </>
    )
    }
export default anotherPage;
