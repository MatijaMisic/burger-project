import React, { Component } from 'react';
import { connect } from "react-redux";

import Button from '../../../components/UI/Button/Button';

import Spinner from '../../../components/UI/Spinner/Spinner'
import './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false
            },
            zipcode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Your email'
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                   options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
      
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }


        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData
        }
        this.props.onOrderBurger(order);
       
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        
        this.setState({orderForm:updatedOrderForm});
        
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map((formElement) => {
                return <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid ={!formElement.config.valid}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            })}
            <Button btnType="Success">ORDER</Button>
        </form>);

        if (this.props.loading) {
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


const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);