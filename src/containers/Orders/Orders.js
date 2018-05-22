import React, { Component } from 'react';
import Order from '../../components/CheckoutSummary/Order';
import withErrorHandler from '../../components/Burger/withErrorHandler/withErrorHandler'
import axios from '../../axiosOrders';
class Orders extends Component {
    state={
        orders:[],
        loading:true
    }

    componentDidMount () {
        axios.get('/orderds.json')
        .then((res) => {
            console.log(res.data);
            
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({...res.data[key], id:key})
            }
            this.setState({loading:false, orders:fetchedOrders})
        }).catch((error) => {
            this.setState({loading:false})

        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>}
                )}               
            </div>
        );
    }
}

export default  withErrorHandler(Orders, axios);