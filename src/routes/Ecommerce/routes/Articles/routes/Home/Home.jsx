import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import date from '../../../../../../helpers/date.js';

const Home = ({ currentUrl, articles }) => {
    const history = useHistory();
    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumb className="pt-3">
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/ecommerce">Ecommerce</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Artikler</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button tag={Link} to={`${currentUrl}/new`} color="primary">
                        Lag ny
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Navn</th>
                                <th>Dato</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr
                                    key={article.id}
                                    onClick={() =>
                                        history.push(
                                            `${currentUrl}/${article.id}`
                                        )
                                    }
                                >
                                    <td>{article.title}</td>
                                    <td>
                                        {date.niceDateTime(article.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
