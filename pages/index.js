import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from "@/components/Navbar";
import FormRow from '../components/FormRow';

export default function Home({ lists }) {
    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{ flexGrow: 1, maxWidth:'80%', margin:'auto'}}>
                <Grid container spacing={1}>
                    <Grid container item spacing={3}>
                        <FormRow lists={lists} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export async function getServerSideProps() {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    return {
        props: {
            lists: data,
        }
    }
}