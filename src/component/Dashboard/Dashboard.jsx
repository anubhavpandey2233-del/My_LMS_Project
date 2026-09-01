import { Box, Button, Chip, Grid, ListItemIcon, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Gauge } from '@mui/x-charts/Gauge';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AndroidIcon from '@mui/icons-material/Android';
import GridViewIcon from '@mui/icons-material/GridView';
import AppleIcon from '@mui/icons-material/Apple';
import PropTypes from 'prop-types';


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

const pieData = [
    { label: "Fruits", value: 400, img: 'src\assets\Images\ic-app-1.webp' },
    { label: "Vegitables", value: 300 },
    { label: "DayFruits", value: 300 },
    { label: "OrganicItems", value: 200 },
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
const settingsPieChart = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: false,
};

const Fruits = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 2400, 1398, 9800, 3908, 4800,
    3800,
];
const Vegitables = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 1890,
    2390,
];
const DayFruits = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 2400, 1398, 9800, 3908, 4800,
    3800,
];
const OrganicItems = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 1890,
    2390,
];
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'dec',
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
        _id: 3,
        products_img: "../../../../public/assets/img/best-product-1.jpg",
        name: "ABCD",
        price: "$150",
        total_orders: "280",
        rank: "Top1",
        rankColor: "primary",
    },
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

const optionsBars = [
    { label: 'Download', icon: <CloudDownloadIcon /> },
    { label: 'Print', icon: <PrintIcon /> },
    { label: 'Share', icon: <ShareIcon /> },
    { label: 'Delete', icon: <DeleteIcon /> },
];

const applicatonData = [
    { img: 'src/assets/Images/ic-app-1.webp', title: 'Microsoft office 365', price: 'free', download: '9.91k', print: '9.98Mb', rating: '9.45k' },

    { img: 'src/assets/Images/ic-app-2.webp', title: 'Opera', price: '$23', download: '9.81k', print: '9.87Mb', rating: '9.67k' },

    { img: 'src/assets/Images/ic-app-3.webp', title: 'Adobe acrobat reader DC', price: 'free', download: '9.65k', print: '9.78Mb', rating: '8.61k' },

    { img: 'src/assets/Images/ic-app-4.webp', title: 'Jolplin', price: '$87', download: '9.6k', print: '9.33Mb', rating: '9k' },

    { img: 'src/assets/Images/ic-app-5.webp', title: 'Topaz photo AI', price: 998, download: '9.4k', print: '9.68Mb', rating: '9.61k' },

]
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            tabIndex={0}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const installedCountries = [
    { img: 'src/assets/Images/Minimal - Client and Admin Dashboard - MUI Store_files/DE.svg', android: '9.98k', window: '8.98k', apple: '8.98k' },

    { img: 'src/assets/Images/Minimal - Client and Admin Dashboard - MUI Store_files/GB.svg', android: '9.56k', window: '8.98k', apple: '8.09k' },

    { img: 'src/assets/Images/Minimal - Client and Admin Dashboard - MUI Store_files/FR.svg', android: '9.34', window: '8.98k', apple: '9.98k' },

    { img: 'src/assets/Images/Minimal - Client and Admin Dashboard - MUI Store_files/KR.svg', android: '9.54', window: '8.98k', apple: '9.56k' },

    { img: 'src/assets/Images/Minimal - Client and Admin Dashboard - MUI Store_files/US.svg', android: '9.7k', window: '8.98k', apple: '8.98k' }
]

function Dashboard(props) {
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <h1>Admin Dashboard</h1>
            <Grid container spacing={3}>
                {
                    stats.map((v) => (
                        <StatsCard data={v} />
                    ))
                }

                <Grid size={4}>

                    <Paper elevation={1} sx={{ px: 3, pt: 4, pb: 9 }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                            Current download
                        </Typography>
                        <Typography variant='body2' sx={{ pt: 1, pb: 3, color: 'gray' }}>
                            Downloaded by operating system
                        </Typography>
                        <PieChart
                            series={[{
                                innerRadius: 60,
                                outerRadius: 100,
                                data: pieData,
                                arcLabel: 'value'

                            }]}
                            {...settingsPieChart}
                            slotProps={{
                                legend: {
                                    labelStyle: {
                                        tableLayout: 'fixed',
                                    },
                                    direction: 'row',
                                    sx: { pt: 5 },
                                    position: {
                                        horizontal: 'middle',
                                        vertical: 'bottom',
                                    },
                                },


                            }}

                        />
                    </Paper>
                </Grid>

                <Grid size={8}>
                    <Paper elevation={1} sx={{ px: 3, py: 4 }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                            Area installed
                        </Typography>

                        <Typography variant='body2' sx={{ pt: 1, pb: 1, color: 'gray' }}>
                            (+43%) than last year
                        </Typography>
                        <Box sx={{ width: '100%', height: 328 }}>
                            <BarChart
                                series={[
                                    { data: Fruits, label: 'Fruits', stack: 'stack1' },
                                    { data: Vegitables, label: 'Vegitables', stack: 'stack1' },
                                    { data: DayFruits, label: 'DayFruits', stack: 'stack1' },
                                    { data: OrganicItems, label: 'OrganicItems', stack: 'stack1' },
                                ]}
                                slotProps={{
                                    legend: {
                                        labelStyle: {
                                            tableLayout: 'fixed',
                                        },
                                        direction: 'row',
                                        position: {
                                            horizontal: 'left',
                                            vertical: 'top',
                                        },
                                    },
                                }}
                                sx={{
                                    ['.MuiChartsLegend-root']: {
                                        mb: 1
                                    },
                                    justifyItems: 'flex-start',

                                }}
                                xAxis={[{ data: xLabels, width: 50, height: 30 }]}
                                yAxis={[{ width: 50 }]}
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={8}>
                    <Paper elevation={1} sx={{ pt: 4, }}>
                        <Typography variant='h6' sx={{ px: 4, py: 2, fontWeight: 'bold' }}>
                            All Products
                        </Typography>


                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow sx={{ background: '#F4F6F8' }}>
                                        <TableCell >Name</TableCell>
                                        <TableCell align="left">Price</TableCell>
                                        <TableCell align="left">Total Order</TableCell>
                                        <TableCell align="left">Rank</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ px: 2 }}>
                                    {product.map((row, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.price}</TableCell>
                                            <TableCell align="left">{row.total_orders}</TableCell>
                                            <TableCell align="left">
                                                <Chip label={row.rank} color={row.rankColor} variant="outlined" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <div>
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open ? 'long-menu' : undefined}
                                                        aria-expanded={open}
                                                        aria-haspopup="true"
                                                        onClick={handleClick}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="long-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        slotProps={{
                                                            paper: {
                                                                style: {
                                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                                    width: '20ch',
                                                                    boxShadow: '0 0 5px 0 rgba(0,0,0,0.1)',
                                                                    columnGap: '10px',
                                                                },
                                                            },
                                                            list: {
                                                                'aria-labelledby': 'long-button',
                                                            },
                                                        }}
                                                    >
                                                        {optionsBars.map((option) => (
                                                            <MenuItem>
                                                                <ListItemIcon>
                                                                    {option.icon}
                                                                </ListItemIcon>
                                                                <Typography variant="inherit">{option.label}</Typography>
                                                            </MenuItem>

                                                        ))}
                                                    </Menu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper elevation={1} sx={{ px: 3, pt: 4, pb: 5 }}>
                        <Typography variant='h6' sx={{ px: 4, py: 2, fontWeight: 'bold' }}>
                            Related applications
                        </Typography>

                        <Box sx={{ width: '100%', bgcolor: 'background.paper', mb: 2 }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange}

                                    sx={{
                                        ['.MuiTabs-indicator']: {
                                            display: 'none',
                                        },
                                        ['.MuiTabs-list']: {
                                            backgroundColor: '#F4F6F8',
                                            padding: 1
                                        },
                                        ['.Mui-selected']: {
                                            backgroundColor: 'white',
                                            borderRadius: 4,
                                            color: 'black',
                                            fontWeight: 'bold'
                                        }
                                    }
                                    }

                                >
                                    <Tab label="Top 7 days" {...a11yProps(0)} />
                                    <Tab label="Top 30 days"  {...a11yProps(1)} />
                                    <Tab label="All times" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    {
                                        applicatonData.map((v) => (
                                            <>
                                                <Grid size={1} sx={{ mx: 1, mt: 2 }}>
                                                    <Box
                                                        component="img"
                                                        src={v.img}
                                                        width={32}
                                                    />


                                                    <img src='{v.img}' alt="" style={{ width: '35px' }} />
                                                </Grid>
                                                <Grid size={10} sx={{ mt: 2 }}>
                                                    <Box>
                                                        <Box sx={{ display: 'flex' }}>
                                                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mr: 1 }} >
                                                                {v.title}

                                                            </Typography>
                                                            {

                                                            }
                                                            <Chip label="Free" size="small" />

                                                        </Box>

                                                        <Box sx={{ display: 'flex', color: 'gray' }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <CloudDownloadIcon sx={{ width: 15 }} />
                                                                <Typography variant='subtitle2'>{v.download}</Typography>
                                                                <FiberManualRecordIcon sx={{ width: 8, mx: 1 }} />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <CardMembershipOutlinedIcon sx={{ width: 15 }} />
                                                                <Typography variant='subtitle2'>{v.print}</Typography>
                                                                <FiberManualRecordIcon sx={{ width: 8, mx: 1 }} />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <StarOutlinedIcon sx={{ width: 15, color: '#c1a228cc' }} />
                                                                <Typography variant='subtitle2'>{v.rating}</Typography>

                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </>
                                        ))

                                    }
                                </Grid>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    {
                                        applicatonData.map((v) => (
                                            <>
                                                <Grid size={1} sx={{ mx: 1, mt: 2 }}>
                                                    <Box
                                                        component="img"
                                                        src={v.img}
                                                        width={32}
                                                    />


                                                    <img src='{v.img}' alt="" style={{ width: '35px' }} />
                                                </Grid>
                                                <Grid size={10} sx={{ mt: 2 }}>
                                                    <Box>
                                                        <Box sx={{ display: 'flex' }}>
                                                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mr: 1 }} >
                                                                {v.title}

                                                            </Typography>
                                                            {

                                                            }
                                                            <Chip label="Free" size="small" />

                                                        </Box>

                                                        <Box sx={{ display: 'flex', color: 'gray' }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <CloudDownloadIcon sx={{ width: 15 }} />
                                                                <Typography variant='subtitle2'>{v.download}</Typography>
                                                                <FiberManualRecordIcon sx={{ width: 8, mx: 1 }} />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <CardMembershipOutlinedIcon sx={{ width: 15 }} />
                                                                <Typography variant='subtitle2'>{v.print}</Typography>
                                                                <FiberManualRecordIcon sx={{ width: 8, mx: 1 }} />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <StarOutlinedIcon sx={{ width: 15, color: '#c1a228cc' }} />
                                                                <Typography variant='subtitle2'>{v.rating}</Typography>

                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </>
                                        ))

                                    }
                                </Grid>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    {
                                        applicatonData.map((v) => (
                                            <>
                                                <Grid size={1} sx={{ mx: 1, mt: 2 }}>
                                                    <Box
                                                        component="img"
                                                        src={v.img}
                                                        width={32}
                                                    />


                                                    <img src='{v.img}' alt="" style={{ width: '35px' }} />
                                                </Grid>
                                                <Grid size={10} sx={{ mt: 2 }}>
                                                    <Box>
                                                        <Box sx={{ display: 'flex' }}>
                                                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold', mr: 1 }} >
                                                                {v.title}

                                                            </Typography>
                                                            {

                                                            }
                                                            <Chip label="Free" size="small" />

                                                        </Box>

                                                        <Box sx={{ display: 'flex', color: 'gray' }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <CloudDownloadIcon sx={{ width: 15 }} />
                                                                <Typography variant='subtitle2'>{v.download}</Typography>
                                                                <FiberManualRecordIcon sx={{ width: 8, mx: 1 }} />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <CardMembershipOutlinedIcon sx={{ width: 15 }} />
                                                                <Typography variant='subtitle2'>{v.print}</Typography>
                                                                <FiberManualRecordIcon sx={{ width: 8, mx: 1 }} />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <StarOutlinedIcon sx={{ width: 15, color: '#c1a228cc' }} />
                                                                <Typography variant='subtitle2'>{v.rating}</Typography>

                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </>
                                        ))

                                    }
                                </Grid>
                            </CustomTabPanel>

                        </Box>



                    </Paper>
                </Grid>

                <Grid size={4}>
                    <Paper elevation={1} sx={{ px: 3, pt: 4, }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                            Top installed countries
                        </Typography>
                        <TableContainer >
                            <Table sx={{ minWidth: 420 }} aria-label="simple table">
                                <TableBody>
                                    {
                                        installedCountries.map((v) => (
                                            <TableRow
                                            >

                                                <TableCell sx={{ display: 'flex' }}>

                                                    <Box
                                                        component="img"
                                                        src={v.img}

                                                        sx={{ width: 24, borderRadius: 2 }}
                                                    />
                                                    <Typography sx={{ ml: 1 }} variant='subtitle2'>
                                                        Germany
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left" >
                                                    <Box sx={{display:'flex', alignItems: 'center' }}>
                                                        <AndroidIcon sx={{ fontSize: 15, color: 'gray', mr: 1 }} />
                                                    <Typography variant='subtitle2'>{v.android}</Typography>
                                                    </Box>

                                                </TableCell>
                                                <TableCell align="left" >
                                                    <Box sx={{display:'flex', alignItems: 'center' }}>
                                                        <AndroidIcon sx={{ fontSize: 15, color: 'gray', mr: 1 }} />
                                                    <Typography variant='subtitle2'>{v.window}</Typography>
                                                    </Box>

                                                </TableCell>
                                                <TableCell align="left" >
                                                    <Box sx={{display:'flex', alignItems: 'center' }}>
                                                        <AndroidIcon sx={{ fontSize: 15, color: 'gray', mr: 1 }} />
                                                    <Typography variant='subtitle2'>{v.apple}</Typography>
                                                    </Box>

                                                </TableCell>

                                            </TableRow>
                                        ))
                                    }


                                    {/* <TableRow
                                    >
                                        <TableCell sx={{ display: 'flex' }}>
                                            <img src="src\assets\Images\Minimal - Client and Admin Dashboard - MUI Store_files\GB.svg" alt="" width={'30px'} style={{ borderRadius: '4px' }} />
                                            <Typography sx={{ ml: 1 }}>
                                                England
                                            </Typography>

                                        </TableCell>

                                        <TableCell align="left"><AndroidIcon sx={{ fontSize: 15, color: 'gray' }} />9.91k</TableCell>
                                        <TableCell align="left"><GridViewIcon sx={{ fontSize: 15, color: 'gray' }} />1.95k</TableCell>
                                        <TableCell align="left"><AppleIcon sx={{ fontSize: 15, color: 'gray' }} />9.12k</TableCell>
                                    </TableRow>

                                    <TableRow
                                    >
                                        <TableCell sx={{ display: 'flex' }}>
                                            <img src="src\assets\Images\Minimal - Client and Admin Dashboard - MUI Store_files\FR.svg" alt="" width={'30px'} style={{ borderRadius: '4px' }} />
                                            <Typography sx={{ ml: 1 }}>
                                                France
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="left"><AndroidIcon sx={{ fontSize: 15, color: 'gray' }} />9.91k</TableCell>
                                        <TableCell align="left"><GridViewIcon sx={{ fontSize: 15, color: 'gray' }} />1.95k</TableCell>
                                        <TableCell align="left"><AppleIcon sx={{ fontSize: 15, color: 'gray' }} />9.12k</TableCell>
                                    </TableRow>

                                    <TableRow
                                    >
                                        <TableCell sx={{ display: 'flex' }}>
                                            <img src="src\assets\Images\Minimal - Client and Admin Dashboard - MUI Store_files\KR.svg" alt="" width={'30px'} style={{ borderRadius: '4px' }} />
                                            <Typography sx={{ ml: 1 }}>
                                                Korean
                                            </Typography>

                                        </TableCell>

                                        <TableCell align="left"><AndroidIcon sx={{ fontSize: 15, color: 'gray' }} />9.91k</TableCell>
                                        <TableCell align="left"><GridViewIcon sx={{ fontSize: 15, color: 'gray' }} />1.95k</TableCell>
                                        <TableCell align="left"><AppleIcon sx={{ fontSize: 15, color: 'gray' }} />9.12k</TableCell>
                                    </TableRow>

                                    <TableRow
                                    >
                                        <TableCell sx={{ display: 'flex' }}>
                                            <img src="src\assets\Images\Minimal - Client and Admin Dashboard - MUI Store_files\US.svg" alt="" width={'30px'} style={{ borderRadius: '4px' }} />
                                            <Typography sx={{ ml: 1 }}>
                                                USA
                                            </Typography>

                                        </TableCell>

                                        <TableCell align="left"><AndroidIcon sx={{ fontSize: 15, color: 'gray', }} />9.91k</TableCell>
                                        <TableCell align="left"><GridViewIcon sx={{ fontSize: 15, color: 'gray' }} />1.95k</TableCell>
                                        <TableCell align="left"><AppleIcon sx={{ fontSize: 15, color: 'gray' }} />9.12k</TableCell>
                                    </TableRow> */}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>


                <Grid size={4}>
                    <Paper elevation={1} sx={{ px: 3, pt: 4, pb: 6 }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                            Top authors
                        </Typography>

                        <Box className="box1" sx={{ justifyContent: 'space-between', display: 'flex', mt: 3 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar alt="Remy Sharp" src="src\assets\Images\Minimal - Client and Admin Dashboard - MUI Store_files\avatar-1.webp" />
                                </Stack>
                                <Box sx={{ ml: 2, }}>
                                    <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1, color: 'black' }}>
                                        Jayvion Simon
                                    </Typography>
                                    <Box sx={{ display: 'flex', fontSize: 13, color: 'gray' }}>
                                        <FavoriteIcon sx={{ width: 19, mr: 0.5 }} />
                                        <Typography variant='body2'>
                                            99.1k
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ width: 40, pl: 1, height: 40, backgroundColor: '#EBF8F4', borderRadius: 25, alignItems: 'center', display: 'flex', color: 'green' }}>
                                <EmojiEventsIcon />
                            </Box>
                        </Box>


                        <Box className="box2" sx={{ justifyContent: 'space-between', display: 'flex', mt: 3 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar alt="Remy Sharp" src="src\assets\Images\Minimal - Client and Admin Dashboard - MUI Store_files\avatar-2.webp" />
                                </Stack>
                                <Box sx={{ ml: 2, }}>
                                    <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1, color: 'black' }}>
                                        Jayvion Simon
                                    </Typography>
                                    <Box sx={{ display: 'flex', fontSize: 13, color: 'gray' }}>
                                        <FavoriteIcon sx={{ width: 19, mr: 0.5 }} />
                                        <Typography variant='body2'>
                                            99.1k
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ width: 40, pl: 1, height: 40, backgroundColor: '#EBF8F4', borderRadius: 25, alignItems: 'center', display: 'flex', color: 'skyblue' }}>
                                <EmojiEventsIcon />
                            </Box>
                        </Box>


                        <Box className="box3" sx={{ justifyContent: 'space-between', display: 'flex', mt: 3 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Stack direction="row" spacing={2}>
                                    <Avatar alt="Remy Sharp" src="src\assets\Images\Minimal - Client and Admin Dashboard - MUI Store_files\avatar-3.webp" />
                                </Stack>
                                <Box sx={{ ml: 2, }}>
                                    <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1, color: 'black' }}>
                                        Jayvion Simon
                                    </Typography>
                                    <Box sx={{ display: 'flex', fontSize: 13, color: 'gray' }}>
                                        <FavoriteIcon sx={{ width: 19, mr: 0.5 }} />
                                        <Typography variant='body2'>
                                            99.1k
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ width: 40, pl: 1, height: 40, backgroundColor: '#EBF8F4', borderRadius: 25, alignItems: 'center', display: 'flex', color: 'red' }}>
                                <EmojiEventsIcon />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>


                <Grid size={4}>

                    <Grid size={12} sx={{ justifyContent: 'space-between', display: 'flex', backgroundColor: '#007867', borderRadius: 5, overflow: 'hidden' }}>
                        <Grid sx={{ py: 2, px: 3, alignItems: 'center', color: 'white', display: 'flex' }}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                <Gauge width={100} height={100} value={48} />
                            </Stack>
                            <Grid sx={{ ml: 3 }}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    38,900
                                </Typography>
                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                    Conversion
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid>
                            <PersonIcon sx={{ fontSize: 160, color: '#148373', ml: 15 }} />
                        </Grid>
                    </Grid>




                    <Grid size={12} sx={{ justifyContent: 'space-between', display: 'flex', backgroundColor: '#006C9C', borderRadius: 5, overflow: 'hidden', mt: 2 }}>
                        <Grid sx={{ py: 3, px: 3, alignItems: 'center', color: 'white', display: 'flex' }}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                <Gauge width={100} height={100} value={75} />
                            </Stack>
                            <Grid sx={{ ml: 3 }}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    55,566
                                </Typography>
                                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                    Applications
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid>
                            <EmailIcon sx={{ fontSize: 160, color: '#1478A4', ml: 15 }} />
                        </Grid>
                    </Grid>

                </Grid>


            </Grid>
        </Box >
    );
}

export default Dashboard;