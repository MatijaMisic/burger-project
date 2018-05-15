import React from 'react';
import './NavigationItem.css';

const NavigationItem = (props) => {

    const activeLink = props.active ? 'active' : null;

    return (
        <li className='NavigationItem'><a href={props.link} className={activeLink}>{props.children}</a></li>
    );
};

export default NavigationItem;