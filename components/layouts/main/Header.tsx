
import Link from 'next/link'
import { Box, Button, Typography, Toolbar } from '@mui/material'
import LogOutDialog from '../../LogOutDialog'
import { useState } from 'react'

const sites = [
    {
        name: 'Home',
        href: '/home'
    },
    {
        name: 'Another page',
        href: '/anotherPage'
    }
]

const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <Toolbar>
            <Box 
                mt={2}
                ml={2}
                display="flex"
                width="100%"
                justifyContent="space-around"
                gap={2}
            >
                {sites.map(site => (
                    <Link href={site.href} key={site.href}>
                        <a>{site.name}</a>
                    </Link>
                ))}
                <Button
                >
                    <Typography
                        variant="button" 
                        onClick={() => setOpen(!open)}
                    >Log Out</Typography>
                </Button>                
            </Box>
            { open && <LogOutDialog  /> }
            
            
        </Toolbar>
    )
}

export default Header;

const style = {
    link: {
        color: 'inherit',
        textDecoration: 'none',
        marginRight: '1rem',
    }
}
