import React from 'react';
import {
    Box,
    Breadcrumbs,
    Chip,
    Container,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DatePicker } from '@material-ui/pickers';
import appConfig from '../../../../config/app.js';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    quickDateSetters: {
        '& > *': {
            marginRight: theme.spacing(0.5),
        },
    },
}));

const Searches = ({ from, setFrom, to, setTo, queryData }) => {
    const classes = useStyles();

    return (
        <Container>
            <Grid component={Box} container paddingY={2}>
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">{appConfig.appName}</Link>
                        <Link to="/stats">Stats</Link>
                        <Typography color="textPrimary">Søk</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
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
                                        moment()
                                            .startOf('day')
                                            .subtract(7, 'days')
                                    );
                                    setTo(
                                        moment().add(1, 'day').startOf('day')
                                    );
                                }}
                            />
                            <Chip
                                label="Siste måned"
                                onClick={() => {
                                    setFrom(
                                        moment()
                                            .startOf('day')
                                            .subtract(1, 'month')
                                    );
                                    setTo(
                                        moment().add(1, 'day').startOf('day')
                                    );
                                }}
                            />
                            <Chip
                                label="Siste 3 måneder"
                                onClick={() => {
                                    setFrom(
                                        moment()
                                            .startOf('day')
                                            .subtract(3, 'month')
                                    );
                                    setTo(
                                        moment().add(1, 'day').startOf('day')
                                    );
                                }}
                            />
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Søkestreng</TableCell>
                                        <TableCell>Antall søk</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <DefaultHookQuery queryHookData={queryData}>
                                        {({ data }) => {
                                            return data.statsSearchStrings.edges.map(
                                                (edge) => (
                                                    <TableRow
                                                        hover
                                                        key={edge.cursor}
                                                    >
                                                        <TableCell>
                                                            {
                                                                edge.node
                                                                    .searchString
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {edge.node.count}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            );
                                        }}
                                    </DefaultHookQuery>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Searches;
