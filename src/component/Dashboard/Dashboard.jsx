import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const stats = [
    {
        title: "Total active users",
        value: "18,765",
        change: "+2.6%",
        status: true,
        // color: colors.primary[500],
        data: [1, 4, 2, 5, 7, 2, 4, 6],
        // dataColor: colors.primary[500],
    },
    {
        title: "Total Products",
        value: "4,876",
        change: "+0.2%",
        status: true,
        // color: colors.primary[400],
        data: [8, 5, 2, 5, 9, 2, 8, 1],
        // dataColor: colors.primary[300],
    },
    {
        title: "Total Orders",
        value: "678",
        change: "-0.1%",
        status: false,
        // color: colors.primary[100],
        data: [1, 4, 2, 5, 7, 2, 4, 6],
        // dataColor: colors.primary[100],
    },
    {
        title: "Total Revenue Gauge",
        value: "1,234",
        change: "+1.0%",
        status: true,
        // color: colors.primary[300],
        data: [8, 5, 2, 5, 9, 2, 8, 1],
        // dataColor: colors.primary[400],
    },
];

const StatsCard = ({ data }) => {
    const [showHighlight, setShowHighlight] = React.useState(true);
    const [showTooltip, setShowTooltip] = React.useState(true);

    const handleHighlightChange = (event) => {
        setShowHighlight(event.target.checked);
    };

    const handleTooltipChange = (event) => {
        setShowTooltip(event.target.checked);
    };

    return (
        <Grid size={3} >
            <Paper elevation={1} sx={{ px: 3, py: 4 }}>
                <Typography variant="subtitle2">
                    {
                        data.title
                    }
                </Typography>

                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>

                    <Grid size={2} >
                        <Typography variant="h4" sx={{ fontWeight: 'bold',mt:3 }} >
                            {
                                data.value
                            }
                        </Typography>
                    </Grid>

                    <Grid size={2}>
                        <Typography>
                            <SparkLineChart
                                plotType="bar"
                                data={data.data}
                                height={65}
                                showHighlight={showHighlight}
                                showTooltip={showTooltip}
                            />
                        </Typography>
                    </Grid>
                </Grid>

                <Typography sx={{display:'flex', mt:2}}>
                    {
                      parseFloat(data.change)>0? <ArrowUpwardIcon sx={{color:'green'}}/>: <ArrowDownwardIcon sx={{color:'red'}}/>
                    }
                    {
                        <Typography>  {data.change} last 7 days</Typography>
                    }
                </Typography>

            </Paper>

        </Grid>
    )

}

function Dashboard(props) {
    return (
        <Box>
            <h1>Admin Dashboard</h1>
            <Grid container spacing={3}>
                {
                    stats.map((v) => (
                        <StatsCard data={v} />
                    ))
                }
            </Grid>
        </Box>
    );
}

export default Dashboard;