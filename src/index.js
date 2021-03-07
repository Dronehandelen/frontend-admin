import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import appConfig from './config/app.js';
import * as Sentry from '@sentry/react';

if (appConfig.sentryUrl) {
    Sentry.init({
        dsn: appConfig.sentryUrl,
        release: appConfig.releaseHash,
        environment: appConfig.environment,
    });
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
