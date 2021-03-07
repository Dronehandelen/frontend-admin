import React from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import useKeyDown from '../../hooks/useKeyDown';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    max-height: 100vh;
    z-index: 1;
`;

const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 10px;
    overflow-y: auto;
    max-height: 100%;
    min-height: 0;

    & > div {
        max-height: 100%;
    }

    & img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

const Content = styled.div`
    display: flex;
    flex: 1 1 auto;
    max-height: 100%;
    min-height: 0;
`;

const Button = styled.div`
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    & > div {
        background-color: rgba(
            0,
            0,
            0,
            ${(props) => (props.disabled ? 0 : 0.5)}
        );
        color: ${(props) => (props.disabled ? '#737373' : 'white')};
        padding: 10px;
    }
`;

const FullscreenImage = ({ selectedImage, onNext, onPrevious, onClose }) => {
    useLockBodyScroll();

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            onNext && onNext();
        },
        onSwipedRight: () => {
            onPrevious && onPrevious();
        },
        trackMouse: true,
        trackTouch: true,
    });

    useKeyDown('escape', () => {
        if (selectedImage) {
            onClose();
        }
    });
    useKeyDown('arrowright', () => {
        if (onNext) {
            onNext();
        }
    });
    useKeyDown('arrowleft', () => {
        if (onPrevious) {
            onPrevious();
        }
    });

    return (
        <Background {...handlers}>
            <Header>
                <Button onClick={onClose}>
                    <div>
                        <i className="fa fa-close fa-2x" />
                    </div>
                </Button>
            </Header>
            <Content>
                <Button
                    className="d-md-flex d-none"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious && onPrevious();
                    }}
                    disabled={!onPrevious}
                >
                    <div>
                        <i className="fa fa-arrow-left fa-4x" />
                    </div>
                </Button>
                <ImageWrapper>
                    <div>
                        <img
                            draggable={false}
                            src={selectedImage}
                            alt=""
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    </div>
                </ImageWrapper>
                <Button
                    className="d-md-flex d-none"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext && onNext();
                    }}
                    disabled={!onNext}
                >
                    <div>
                        <i className="fa fa-arrow-right fa-4x" />
                    </div>
                </Button>
            </Content>
        </Background>
    );
};

const FullscreenImageContainer = (props) => {
    if (!props.selectedImage) {
        return <></>;
    }

    return <FullscreenImage {...props} />;
};

export default FullscreenImageContainer;
