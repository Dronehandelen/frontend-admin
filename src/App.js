import React from 'react';
import * as Sentry from '@sentry/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import AuthProvider from './containers/AuthProvider';

import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import ScrollToTop from './components/ScrollToTop.jsx';
import { Col, Container, Row } from 'reactstrap';
import ApolloClient from './helpers/apolloClient.js';
import { ThemeProvider } from './containers/ThemeProvider.jsx';

const apolloClient = new ApolloClient();

const FallbackComponent = () => (
    <Container>
        <Row>
            <Col className="text-center mt-5" md={{ size: 6, offset: 3 }}>
                <h1>Noe skjedde</h1>
                <p>Noe skjedde når vi lastet inn siden.</p>
            </Col>
        </Row>
    </Container>
);

const App = () => (
    <BrowserRouter>
        <Sentry.ErrorBoundary showDialog fallback={FallbackComponent}>
            <ThemeProvider>
                <ApolloProvider client={apolloClient.apolloClient}>
                    <ScrollToTop>
                        <AuthProvider>
                            <Routes />
                        </AuthProvider>
                    </ScrollToTop>
                </ApolloProvider>
            </ThemeProvider>
        </Sentry.ErrorBoundary>
    </BrowserRouter>
);

export default App;
