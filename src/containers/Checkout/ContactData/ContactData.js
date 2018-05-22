import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axiosOrders';

import Spinner from '../../../components/UI/Spinner/Spinner'
import './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerData: {
                name: 'MAtija',
                address: {
                    street: 'Beograd',
                    zipcode: '11000',
                    country: 'Serbia'
                },
                email: 'maki@maki.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orderds.json', order)
            .then((res) => {
                console.log(res);
                this.setState({ loading: false })
                this.props.history.push('/')

            })
            .catch((error) => {
                this.setState({ loading: false })

                console.log(error);
            })
    }


    render() {

        let form = ( <form>
            <input className='Input' type='text' name='name' placeholder='Your name' />
            <input className='Input' type='text' name='email' placeholder='Your email' />
            <input className='Input' type='text' name='street' placeholder='Street' />
            <input className='Input' type='text' name='postal' placeholder='Postal Code' />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className='contactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;