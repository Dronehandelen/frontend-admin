import React from 'react';
import barcode from '../../../../contexts/barcode';
import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import appConfig from '../../../../config/app';
import FetchProduct from './FetchProduct';

const ScanProduct = () => {
    const { currentBarcode } = React.useContext(barcode);

    const [barcodeToSearch, setBarcodeToSearch] =
        React.useState(currentBarcode);

    React.useEffect(() => {
        if (currentBarcode !== null) {
            setBarcodeToSearch(currentBarcode);
        }
    }, [currentBarcode]);

    return (
        <Container maxWidth={false}>
            <Grid component={Box} container paddingY={2}>
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">{appConfig.appName}</Link>
                        <Link to="/products">Produkter</Link>
                        <Typography color="textPrimary">Scan</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            {barcodeToSearch && <FetchProduct gtin={barcodeToSearch} />}
        </Container>
    );
};

export default ScanProduct;
