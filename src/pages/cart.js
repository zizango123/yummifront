import React from 'react';
import Minimal from '../common/navbars/minimal.js';
import Footer from '../common/footer.js';
import { deliveryrateURL, imgdomain } from '../Constants';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delivery:0,
      subtotal:0,
      grandtotal:0,
      loggedin:'',
      currency:localStorage.getItem('currency'),
      currencysymb: localStorage.getItem('currency') === 'dollar' ? <span>&#36;</span> : <span>&euro;</span>,
      cartempty:true,
      cart: JSON.parse(localStorage.getItem('shoppingCart'))
    };
    }

    componentDidMount(){
      this.getdelivery();
      this.getcart();
    }

    getcart(){
      let cart = localStorage.getItem('shoppingCart');
        if(cart !== "" && cart !== null){
            this.setState({cart: JSON.parse(cart)});
            this.setState({cartempty:false});
          }
    }

    calculatetotal(){
      let subtotal = 0;
      let grandtotal = 0;

      this.state.cart.map((c, index) => {
            if(this.state.currency === 'dollar'){
              subtotal += parseFloat(c.ratedollar,2)*parseInt(c.quantity);
            }
            if(this.state.currency === 'euro'){
              subtotal += parseFloat(c.rateeuro,2)*parseInt(c.quantity);
            }
      });

      grandtotal = subtotal + parseFloat(this.state.delivery,2);

      this.setState({
        subtotal:subtotal,
        grandtotal:grandtotal
      })

    }

    checkout(){
        localStorage.setItem('subtotal',this.state.subtotal);
        localStorage.setItem('grandtotal',this.state.grandtotal);
        localStorage.setItem('delivery',this.state.delivery);
        window.location.href = "/checkout";
    }

    async getdelivery() {
    await fetch(deliveryrateURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((res) => res.json())
        .then((restext) => {
          if(restext.type ==='success'){
            if(this.state.currency === 'dollar' )
            this.setState({
              delivery: restext.dollar
            });

            if(this.state.currency === 'euro' )
            this.setState({
              delivery: restext.euro
            });

            this.calculatetotal();
          }
          })
        .catch((error) => {
          console.log(error);
        });
  }

   render() {
      return (
         <div>
          <Minimal />
          <div className="alignCenter font-weight-bold mt-3 mb-3">Shopping Cart</div>

          {
            !this.state.cartempty?<div className="row ml-3 mt-4">
                 <div className="col-1 font-weight-bold">Sl</div>
                 <div className="col-2 font-weight-bold">Image</div>
                 <div className="col-2 font-weight-bold">Name</div>
                 <div className="col-3 font-weight-bold">Description</div>
                 <div className="col-2 font-weight-bold">Rate</div>
                 <div className="col-2 font-weight-bold">Quantity</div>
             </div>
             : null
          }
          {
            this.state.cartempty? <div>cart empty</div>:
              this.state.cart.map((pizza, index) => {
                  if(this.state.currency === 'dollar')
                       return <div className="row ml-3 mt-2">
                                  <div className="col-1">{index+1}</div>
                                  <div className="col-2"><img src={imgdomain+'/'+pizza.image} alt="veg" height="100" width="100" className="mr-2" /></div>
                                  <div className="col-2">{pizza.name}</div>
                                  <div className="col-3">{pizza.description}</div>
                                  <div className="col-2"> &#36; {pizza.ratedollar}</div>
                                  <div className="col-2"> {pizza.quantity}</div>
                              </div>
                   if(this.state.currency === 'euro')
                      return <div className="row ml-3 mt-2">
                                 <div className="col-1">{index+1}</div>
                                 <div className="col-2"><img src={imgdomain+'/'+pizza.image} alt="veg" height="100" width="100" className="mr-2" /></div>
                                 <div className="col-2">{pizza.name}</div>
                                 <div className="col-3">{pizza.description}</div>
                                 <div className="col-2"> &euro; {pizza.rateeuro}</div>
                                 <div className="col-2"> {pizza.quantity}</div>
                             </div>
           })
         }
         {
           !this.state.cartempty?<><div className="row ml-3 mt-4">
                <div className="col-3 font-weight-bold">Delivery Charge</div>
                <div className="col-2 font-weight-bold"></div>
                <div className="col-2 font-weight-bold"></div>
                <div className="col-1 font-weight-bold"></div>
                <div className="col-2 font-weight-bold">{this.state.currencysymb}{this.state.delivery}</div>
            </div>
            <div className="row ml-3 mt-4">
                 <div className="col-3 font-weight-bold">Sub-Total</div>
                 <div className="col-2 font-weight-bold"></div>
                 <div className="col-2 font-weight-bold"></div>
                 <div className="col-1 font-weight-bold"></div>
                 <div className="col-2 font-weight-bold">{this.state.currencysymb}{this.state.subtotal}</div>
             </div>
             <div className="row ml-3 mt-4">
                  <div className="col-3 font-weight-bold">Grand-Total</div>
                  <div className="col-2 font-weight-bold"></div>
                  <div className="col-2 font-weight-bold"></div>
                  <div className="col-1 font-weight-bold"></div>
                  <div className="col-2 font-weight-bold">{this.state.currencysymb}{this.state.grandtotal}</div>
              </div>
              <div className="row ml-3 mt-4 mb-5">
                   <div className="col-1 font-weight-bold"></div>
                   <div className="col-1 font-weight-bold"></div>
                   <div className="col-1 font-weight-bold"></div>
                   <div className="col-1 font-weight-bold"></div>
                   <div className="col-6 font-weight-bold">
                        <button onClick={() => this.checkout()} className="btn btn-success btn-lg">Proceed To Checkout</button>
                  </div>
               </div>
              </>
            : null
         }
         <Footer />
         </div>
      )
   }
}
export default Cart;
