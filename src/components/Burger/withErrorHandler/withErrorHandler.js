import React, { Fragment, Component } from 'react';
import Modal from '../../UI/Modal/Modal';




const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({error:null})
                return req
            })
            this.resInterceptor = axios.interceptors.response.use((res) => {
                return res;
            }, (error) => {
                this.setState({error: error})
            })
        }

        errorConfirmedHandler = (params) => {
            this.setState({error: null})
        }

        componentWillUnmount() {
            console.log('will unmount', this.reqInterceptor, this.resInterceptor);
            
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}
export default withErrorHandler;