import React from 'react';
import {
    Alert,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import cn from 'classnames';
import Meta from './tabs/Meta.jsx';
import Description from './tabs/Description.jsx';

const tabs = {
    META: 'meta',
    DESCRIPTION: 'description',
};

const Editor = ({ state, setState, saving, error, save }) => {
    const [selectedTab, setSelectedTab] = React.useState(tabs.DESCRIPTION);

    return (
        <div>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Breadcrumb className="pt-3">
                            <BreadcrumbItem>
                                <Link to="/">{appConfig.appName}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/ecommerce">Ecommerce</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/ecommerce/articles">Artikler</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Endre</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <div>
                            <Button onClick={() => save()} color="primary">
                                {saving ? <Spinner /> : 'Lagre'}
                            </Button>
                        </div>
                        {error && (
                            <Alert color="danger" className="mt-2">
                                Noe skjedde
                            </Alert>
                        )}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={cn({
                                        active: selectedTab === tabs.META,
                                    })}
                                    onClick={() => {
                                        setSelectedTab(tabs.META);
                                    }}
                                >
                                    Meta
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={cn({
                                        active:
                                            selectedTab === tabs.DESCRIPTION,
                                    })}
                                    onClick={() => {
                                        setSelectedTab(tabs.DESCRIPTION);
                                    }}
                                >
                                    Beskrivelse
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                </Row>
            </Container>
            {selectedTab === tabs.META && (
                <Meta setState={setState} state={state} error={error} />
            )}
            {selectedTab === tabs.DESCRIPTION && (
                <Description setState={setState} state={state} error={error} />
            )}
        </div>
    );
};

export default Editor;
