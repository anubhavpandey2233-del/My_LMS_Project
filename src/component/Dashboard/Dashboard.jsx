import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { PieChart } from '@mui/x-charts/PieChart';


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

const product = [
    {
        _id: 3,
        products_img: "../../../../public/assets/img/best-product-1.jpg",
        name: "ABCD",
        price: "$150",
        total_orders: "280",
        rank: "Top1",
        rankColor: "primary",
    },
    {
        _id: 4,
        products_img: "../../../../public/assets/img/best-product-2.jpg",
        name: "abcd",
        price: "$350",
        total_orders: "50",
        rank: "Top2",
        rankColor: "secondary",
    },
    {
        _id: 5,
        products_img: "../../../../public/assets/img/best-product-3.jpg",
        name: "xyz",
        price: "$150",
        total_orders: "200",
        rank: "Top3",
        rankColor: "error",
    },
    {
        _id: 6,
        products_img: "../../../../public/assets/img/best-product-4.jpg",
        name: "pqr",
        price: "$50",
        total_orders: "300",
        rank: "Top4",
        rankColor: "info",
    },
    {
        _id: 7,
        products_img: "../../../../public/assets/img/best-product-5.jpg",
        name: "ABCD",
        price: "$30",
        total_orders: "250",
        rank: "Top5",
        rankColor: "success",
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
        <>
            <Grid size={3} >
                <Paper elevation={1} sx={{ px: 3, py: 4 }}>
                    <Typography variant="subtitle2">
                        {
                            data.title
                        }
                    </Typography>

                    <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>

                        <Grid size={2} >
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 3 }} >
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

                    <Typography sx={{ display: 'flex', mt: 2 }}>
                        {
                            parseFloat(data.change) > 0 ? <ArrowUpwardIcon sx={{ color: 'green' }} /> : <ArrowDownwardIcon sx={{ color: 'red' }} />
                        }
                        {
                            <Typography>  {data.change} last 7 days</Typography>
                        }
                    </Typography>

                </Paper>

            </Grid>


        </>
    )

}
const ProductCard = ({ productData }) => {

    const settings = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        hideLegend: true,
    };

    console.log(productData.total_orders);
    return (
        
        <Grid>
            <Paper elevation={1} sx={{ px: 3, py: 4 }}>
                {
                    productData.name
                }
            </Paper>
            <PieChart
         series={[{ innerRadius: 50, outerRadius: 100, productData, arcLabel: 'productData.total_orders' }]}
          {...settings}
      />

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
                }{
                    product.map((v) => (
                        <ProductCard productData={v} />
                    ))
                }

            </Grid>
        </Box>
    );
}

export default Dashboard;