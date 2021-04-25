import React from 'react';
import {
    Box,
    Chip,
    Grid,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import LastReviews from './LastReviews.jsx';
import LastAddToCart from './LastAddToCart.jsx';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery';
import TurnoverPaper from './TurnoverPaper';
import ProductViewPaper from './ProductViewPaper';
import formatPrice from '../../../../helpers/formatPrice';
import SessionPaper from './SessionPaper';
import ConversionRatePaper from './ConversionRatePaper';

const useStyles = makeStyles((theme) => ({
    quickDateSetters: {
        '& > *': {
            marginRight: theme.spacing(0.5),
        },
    },
}));

const Home = ({ queryHookData, from, to, setFrom, setTo }) => {
    const classes = useStyles();

    return (
        <Grid container className="mt-4">
            <Grid container spacing={1}>
                <Grid item>
                    <Box padding={2}>
                        <DatePicker
                            variant="inline"
                            label="Fra"
                            format="DD.MM.YYYY"
                            value={from}
                            onChange={(date) => setFrom(date)}
                        />
                        <DatePicker
                            variant="inline"
                            label="Til"
                            format="DD.MM.YYYY"
                            value={to}
                            onChange={(date) => setTo(date)}
                        />
                    </Box>
                    <Box
                        className={classes.quickDateSetters}
                        padding={2}
                        paddingTop={0}
                    >
                        <Chip
                            label="Siste uke"
                            onClick={() => {
                                setFrom(
                                    moment().startOf('day').subtract(7, 'days')
                                );
                                setTo(moment().add(1, 'day').startOf('day'));
                            }}
                        />
                        <Chip
                            label="Siste måned"
                            onClick={() => {
                                setFrom(
                                    moment().startOf('day').subtract(1, 'month')
                                );
                                setTo(moment().add(1, 'day').startOf('day'));
                            }}
                        />
                        <Chip
                            label="Siste 3 måneder"
                            onClick={() => {
                                setFrom(
                                    moment().startOf('day').subtract(3, 'month')
                                );
                                setTo(moment().add(1, 'day').startOf('day'));
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <DefaultHookQuery queryHookData={queryHookData}>
                {({ data }) => (
                    <>
                        <Grid container spacing={1}>
                            <Grid item md={4}>
                                <TurnoverPaper
                                    from={from}
                                    to={to}
                                    data={data}
                                />
                                <SessionPaper from={from} to={to} data={data} />
                            </Grid>
                            <Grid item md={4}>
                                <ProductViewPaper
                                    from={from}
                                    to={to}
                                    data={data}
                                />
                                <ConversionRatePaper
                                    from={from}
                                    to={to}
                                    data={data}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <Box
                                    component={Paper}
                                    padding={2}
                                    marginBottom={1}
                                >
                                    <Box>
                                        <Typography>
                                            <strong>Andre tall</strong>
                                        </Typography>
                                        <Typography>
                                            Estimert lagerverdi:{' '}
                                            {formatPrice(
                                                data.stats.warehouseValue
                                            )}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    component={Paper}
                                    padding={2}
                                    marginBottom={1}
                                >
                                    <Box marginBottom={2}>
                                        <Typography>
                                            <strong>Siste anmeldelser</strong>
                                        </Typography>
                                    </Box>
                                    <LastReviews reviews={data.lastReviews} />
                                </Box>
                                <Box
                                    component={Paper}
                                    padding={2}
                                    marginBottom={1}
                                >
                                    <Box marginBottom={2}>
                                        <Typography>
                                            <strong>
                                                Siste lagt til handlevogn
                                            </strong>
                                        </Typography>
                                    </Box>
                                    <LastAddToCart stats={data.stats} />
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                )}
            </DefaultHookQuery>
        </Grid>
    );
};

export default Home;
