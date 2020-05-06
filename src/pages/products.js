import React from 'react';
import Minimal from '../common/navbars/minimal.js';
import loader from '../images/ajax.gif';
import { productlistURL, imgdomain } from '../Constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemtype: this.props.type,
      cartprops: 'test',
      currency: 'dollar',
      showmodal:false,
      shoppingCart:JSON.parse(localStorage.getItem('shoppingCart')),
      currentItem:{"id":"","type":"","image":"","description":"","name":"","ratedollar":"","rateeuro":"","ratecurrency":"","quantity":""},
      pizzalist: [],
      fetching:false,
      errormsg:"",
      show:false,
      setShow:false,
      modaltitle:"",
      alertshow:false,
      quantityerr:false
    };
  }

  componentDidMount(){
    this.getproducts();

    let cur = localStorage.getItem('currency');

    if(cur === '' || cur === null){
      localStorage.setItem('currency','dollar');
      this.setState({currency:'dollar'});
    }
    else {
      this.setState({currency:cur});
    }

  }

  async getproducts() {
    this.setState({fetching: true});
  await fetch(productlistURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((restext) => {
        if(restext.type ==='success'){
          this.setState({
            fetching: false,
            pizzalist:restext.msg
          });
        }
        else {
          this.setState({
            errormsg: restext.msg,
            fetching: false
          })
        }
        })
      .catch((error) => {
        console.log(error);
      });
}


  getcart(){
    let cart = localStorage.getItem('shoppingCart');

  if(cart !== "" || cart !== null){
      this.setState({shoppingCart: JSON.parse(cart)});
    }
  }

  addtocart(pizza,quantity){
    this.setState({quantityerr:false,alertshow:false});
    if(quantity === '' || quantity === null){
        this.setState({quantityerr:true});
    }
    else{
      let id = this.state.currentItem.id;
      let cart = this.state.shoppingCart;
      let duplicate = 0;

      if(cart === null){
        let currentItem  = [{"id":pizza.id,"type":pizza.type,"image":pizza.image,"description":pizza.description,"name":pizza.name,"ratedollar":pizza.ratedollar,"rateeuro":pizza.rateeuro,"ratecurrency":this.state.currency,"quantity":quantity}];
        let newCart = currentItem;
        this.setState({shoppingCart:newCart});
        localStorage.setItem('shoppingCart',JSON.stringify(newCart));
        this.setState({alertshow: true});
      }
      else{
      if(Object.keys(cart).length !== 0){
      cart.forEach(function(element) {
        if(element.id === id){
          element.quantity = parseInt(element.quantity)+parseInt(quantity);
          duplicate = 1;
        }
      });
    }
    if(duplicate === 0){
      let currentItem  = [{"id":pizza.id,"type":pizza.type,"image":pizza.image,"description":pizza.description,"name":pizza.name,"ratedollar":pizza.ratedollar,"rateeuro":pizza.rateeuro,"ratecurrency":this.state.currency,"quantity":quantity}];
      let newCart = cart.concat(currentItem);
      this.setState({shoppingCart:newCart});
      localStorage.setItem('shoppingCart',JSON.stringify(newCart));
      this.setState({alertshow: true});
    }
    else {
      this.setState({shoppingCart:cart});
       localStorage.setItem('shoppingCart',JSON.stringify(cart));
       this.setState({alertshow: true});
    }
  }
}
}

  addquantity(pizza){
    this.setState({setShow:true});
    this.setState({modaltitle:pizza.name});
    this.setState({currentItem:pizza});
  }

  completeaddtocart(){
    this.setState({quantity:this.refs.quantity.value});
    this.setState({setShow:false});
    this.addtocart(this.state.currentItem,this.refs.quantity.value);
  }

  changeCurrency(currency){
    this.setState({currency});
    localStorage.setItem('currency',currency);
  }
   render() {
  const handleClose = () => this.setState({setShow:false});
  const handleShow = () => this.setState({setShow:true});

      return (
         <div>
              <Minimal />
              <div className="mt-2 ml-2">
                  <label className="ml-2 mr-2">Select Currency : </label>
                  <input className=" mr-2"
                  type="radio"
                  name="currency"
                  defaultChecked={this.state.currency === "dollar"}
                  onClick={() => this.changeCurrency('dollar')}
                  />
                  <label className="mr-4">Dollar</label>

                  <input className=" mr-2"
                  type="radio"
                  name="currency"
                  defaultChecked={this.state.currency === "euro"}
                  onClick={() => this.changeCurrency('euro')}
                  />
                  <label className="mr-2">Euro</label>

              </div>

              <div className="alignCenter font-weight-bold mt-3 mb-3">
                {
                  this.state.itemtype === 'veg'?
                    <span>Veg Pizza</span>
                  :this.state.itemtype === 'nonveg'?
                    <span>Non-Veg Pizza</span>
                  :this.state.itemtype === 'drinks'?
                    <span>Drinks</span>:null
                }
              </div>

              {this.state.alertshow?
              <Alert variant="success" onClose={() => this.setState({alertshow:false})} dismissible>
                <p>
                  Item Added to cart
                </p>
              </Alert>
              :null
            }

            {this.state.quantityerr?
            <Alert variant="danger" onClose={() => this.setState({quantityerr:false})} dismissible>
              <p>
                Invalid Quantity
              </p>
            </Alert>
            :null
          }

              {this.state.fetching?
              <div><p style={{textAlign: 'center'}}>Please Wait fetching data <img alt="loading url" src={loader} /></p></div>
              :null
            }

                <Modal show={this.state.setShow} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Enter Quantity</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        {this.state.modaltitle}
                        <input type="number" placeholder="quantity" className="form-control mb-3" ref="quantity" />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={() => this.completeaddtocart()}>
                      ADD
                    </Button>
                  </Modal.Footer>
                </Modal>

              <div className="row ml-2 mr-2">
                  {
                      this.state.pizzalist.map((pizza, index) => {
                        if(pizza.type === this.state.itemtype){
                          if(this.state.currency === 'dollar')
                             return <div className="col-md-3 alignCenter productitems ">
                                       <img src={imgdomain+'/'+pizza.image} alt="veg" height="200" />
                                       <div>
                                        {pizza.name} <span className="p-2">( &#36; {pizza.ratedollar} )</span>
                                        <div className="description mb-2 pb-2">{pizza.description}</div>
                                        <button onClick={()=>this.addquantity(pizza)}  className="mt-3 btn btn-danger btn-sm btn-block">
                                          ADD TO CART
                                        </button>
                                       </div>
                                   </div>
                           if(this.state.currency === 'euro')
                              return <div className="col-md-3 alignCenter productitems ">
                                        <img src={imgdomain+'/'+pizza.image} alt="veg" height="200" />
                                        <div>
                                         {pizza.name} <span className="p-2">( &euro; {pizza.rateeuro} )</span>
                                         <div className="description mb-2 pb-2">{pizza.description}</div>
                                         <button onClick={()=>this.addquantity(pizza)} className="mt-3 btn btn-danger btn-sm btn-block">
                                           ADD TO CART
                                         </button>
                                        </div>
                                    </div>
                     }
                     else if(this.state.itemtype === 'all'){
                       if(this.state.currency === 'dollar')
                          return <div className="col-md-3 alignCenter productitems ">
                                    <img src={imgdomain+'/'+pizza.image} alt="veg" height="200" />
                                    <div>
                                     {pizza.name} <span className="p-2">( &#36; {pizza.ratedollar} )</span>
                                     <div className="description mb-2">{pizza.description}</div>
                                     <button onClick={()=>this.addquantity(pizza)}  className="mt-3 btn btn-danger btn-sm btn-block">
                                       ADD TO CART
                                     </button>
                                    </div>
                                </div>
                        if(this.state.currency === 'euro')
                           return <div className="col-md-3 alignCenter productitems ">
                                     <img src={imgdomain+'/'+pizza.image} alt="veg" height="200" />
                                     <div>
                                      {pizza.name} <span className="p-2">( &euro; {pizza.rateeuro} )</span>
                                      <div className="description mb-2">{pizza.description}</div>
                                      <button onClick={()=>this.addquantity(pizza)} className="mt-3 btn btn-danger btn-sm btn-block">
                                        ADD TO CART
                                      </button>
                                     </div>
                                 </div>
                     }
                   })
                 }
               </div>
         </div>
      )
   }
}
export default Products;
