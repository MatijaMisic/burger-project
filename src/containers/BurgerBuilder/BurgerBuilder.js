import React, { Component, Fragment } from 'react';
import './BurgerBuilder.css';

import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
    render() {
        return (
           <div className="content">
               <Burger />
            </div>
        );
    }
}

export default BurgerBuilder;