import React from 'react';
import Minimal from '../common/navbars/minimal.js';
import { confirmationURL } from '../Constants';
import loader from '../images/ajax.gif';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delivery:"",
      subtotal:"",
      loggedin:'',
      grandtotal:"",
      currency:"dollar",
      cartempty:true,
      cart: [],
      name:"",
      address:"",
      phone:"",
      confirmed:false,
      fetching:false,
      orderid:"",
      error:false,
      token: localStorage.getItem('logtoken')?localStorage.getItem('logtoken'):'na'
    };
    }

    componentDidMount(){
    this.getdetails();
    }

    getdetails(){
      let cart = localStorage.getItem('shoppingCart');
      let subtotal = localStorage.getItem('subtotal');
      let grandtotal = localStorage.getItem('grandtotal');
      let delivery = localStorage.getItem('delivery');
      let currency = localStorage.getItem('currency');
        if(cart !== "" && cart !== null){
            this.setState({cart});
            this.setState({subtotal});
            this.setState({grandtotal});
            this.setState({delivery});
            this.setState({currency});
            this.setState({cartempty:false});
          }
          else{
            window.location.href = "/cart";
          }
    }

    async confirmorder(){
      this.setState({fetching: true, error: false});

      if(this.refs.name.value !== '' && this.refs.address.value !== '' && this.refs.phone.value !== ''){
      await fetch(confirmationURL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Currency': this.state.currency,
              'Cart': this.state.cart,
              'Subtotal': this.state.subtotal,
              'Grandtotal':this.state.grandtotal,
              'Delivery': this.state.delivery,
              'Name': this.refs.name.value,
              'Address': this.refs.address.value,
              'Phone': this.refs.phone.value,
              'Token':this.state.token
            }
          })
          .then((res) => res.json())
          .then((restext) => {
            if(restext.type ==='success'){
              this.setState({confirmed:true});
              this.setState({fetching: false});
              this.setState({orderid: restext.msg});
              localStorage.removeItem("shoppingCart");
            }
            else {
              this.setState({fetching: false});
            }
            })
          .catch((error) => {
            console.log(error);
          });
        }
        else {
          this.setState({error: true});
          this.setState({fetching: false});
        }
        }

   render() {
      return (
         <div>
          <Minimal />
          {this.state.confirmed?null:<div className="ml-5 font-weight-bold mt-5 mb-5">Enter Delivery Address</div>}
              {this.state.confirmed?<div className="alignCenter font-weight-bold mt-5">Your Order has been confirmed. Order ID: {this.state.orderid}</div>:<div className="col-md-6 mb-5">
                    <input type="text" placeholder="Name" className="form-control mb-3" ref="name" />
                    <input type="text" placeholder="Address" className="form-control mb-3" ref="address" />
                    <input type="text" placeholder="phone" className="form-control mb-3" ref="phone" />
                    <button onClick={() => this.confirmorder()} className=" mt-4 mb-5 btn btn-warning btn-dm">Confirm Order</button>
                    {
                      this.state.fetching?
                            <div><p style={{textAlign: 'center'}}>Please Wait confirming order <img alt="loading url" src={loader} /></p></div>
                      :null
                    }

                    {
                      this.state.error?
                            <div><p>All fields required.</p></div>
                      :null
                    }
              </div>}
         </div>
      )
   }
}
export default Checkout;
