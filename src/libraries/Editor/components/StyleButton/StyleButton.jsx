import React from 'react';

import cn from 'classnames';
import styles from './styleButton.module.scss';

export default class StyleButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = e => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        return (
            <span
                className={cn(styles.button, {
                    [styles.active]: this.props.active,
                })}
                onMouseDown={this.onToggle}
            >
                {this.props.label}
            </span>
        );
    }
}
