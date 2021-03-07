import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import { DateRangePicker } from 'react-dates';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import Stats from './Stats.jsx';
import { Link } from 'react-router-dom';
import appConfig from '../../../../config/app.js';
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';

const GET_STATS_QUERY = gql`
    query Stats(
        $from: DateTime!
        $to: DateTime!
        $fromPrevious: DateTime!
        $toPrevious: DateTime!
    ) {
        stats {
            currentPeriod: period(from: $from, to: $to) {
                turnover
                orderCount
                userRegistrationCount
                uniqueUsers
                uniqueTrackingUsers
                productEventsCount(eventName: "view")
                productViewsCountPerDay: productEventsCountPerDay(
                    eventName: "view"
                ) {
                    date
                    count
                }
                productClickCountPerDay: productEventsCountPerDay(
                    eventName: "click"
                ) {
                    date
                    count
                }
                mostPopularProducts {
                    views
                    product {
                        id
                        title
                    }
                }
                productWishLikes {
                    likedAt
                    user {
                        firstName
                        lastName
                    }
                    productWish {
                        id
                        productName
                    }
                }
            }
            previousPeriod: period(from: $fromPrevious, to: $toPrevious) {
                turnover
                orderCount
                userRegistrationCount
                uniqueUsers
                uniqueTrackingUsers
                productEventsCount(eventName: "view")
            }
        }
    }
`;

const StatsContainer = () => {
    const now = moment();
    const [to, setTo] = React.useState(() => now.clone().endOf('day'));
    const [from, setFrom] = React.useState(() =>
        now.clone().subtract(7, 'days').startOf('day')
    );
    const [focus, setFocus] = React.useState(null);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/">{appConfig.appName}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/admin">Admin</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Statistikk</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Stats</h1>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <DateRangePicker
                            startDate={from}
                            endDate={to}
                            startDateId="your_unique_start_date_id"
                            endDateId="your_unique_end_date_id"
                            onDatesChange={({ startDate, endDate }) => {
                                if (startDate) {
                                    setFrom(startDate.clone().startOf('day'));
                                }

                                if (endDate) {
                                    setTo(endDate.clone().endOf('day'));
                                }
                            }}
                            focusedInput={focus}
                            onFocusChange={(focusedInput) =>
                                setFocus(focusedInput)
                            }
                            isDayBlocked={(date) => date.isAfter(now)}
                            isOutsideRange={(date) => date.isAfter(now)}
                            displayFormat={() => 'DD. MMM. YY'}
                        />
                    </Col>
                </Row>
            </Container>
            <DefaultHookQuery
                queryHookData={useQuery(GET_STATS_QUERY, {
                    variables: {
                        from,
                        to,
                        fromPrevious: from
                            .clone()
                            .subtract(
                                Math.abs(from.diff(to, 'seconds')),
                                'seconds'
                            ),
                        toPrevious: from,
                    },
                })}
            >
                {({ data }) => (
                    <Stats
                        currentPeriod={data.stats.currentPeriod}
                        previousPeriod={data.stats.previousPeriod}
                        from={from}
                        to={to}
                    />
                )}
            </DefaultHookQuery>
        </>
    );
};

export default StatsContainer;
