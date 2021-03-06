import React, { Component } from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

import './Auth.css'

class Auth extends Component {

    state = {
        controls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'E-mail'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Password'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid:false
            },
        },
        isSigniup:true
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
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        }
        this.setState({controls: updatedControls})
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSigniup)
    }
    
    switchAuthmodeHandler = () => {
        this.setState((prevState) => {
            return{isSigniup:!prevState.isSigniup}
        })
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = formElementsArray.map((formElement) => {
            return <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid ={!formElement.config.valid}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                 
        })

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        return (
            <div className='Auth'>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthmodeHandler} btnType='Danger'>Switch to {this.state.isSigniup ? 'SIGNIN' : 'SIGNUP'}</Button>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSigniup) => dispatch(actions.auth(email, password, isSigniup))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);