import React from 'react';
import Footer from '../common/footer.js';
import Minimal from '../common/navbars/minimal.js';
import banner from '../images/banner.jpg';
import veg from '../images/vegpizza.png';
import nonveg from '../images/nonvegpizza.png';
import drinks from '../images/drinks.png';


class Home extends React.Component {

  constructor(props) {
    super(props);
    let cur = localStorage.getItem('currency');

    let cleared = localStorage.getItem('cartclear');

    if(!cleared)
    {
      localStorage.removeItem('shoppingCart');
      localStorage.setItem('cartclear',true);
    }

    if(cur === '' || cur === null){
      localStorage.setItem('currency','dollar');

    }
  }

   render() {
      return (
         <div>
            <Minimal />
            <img src={banner} className="responsive" alt="banner" width="1440" height="400" />
            <div className="alignCenter" style={{marginTop: 20, marginBottom: 20}}>
              <span style={{fontWeight: 'bold'}}>Our Menu</span>
            </div>
            <div className="row">
              <div className="col-md-4 alignCenter ">
                  <a href="/veg"><img src={veg} alt="veg" height="300" /></a>
              </div>
              <div className="col-md-4 alignCenter">
                  <a href="/nonveg"><img src={nonveg} alt="nonveg" height="300" /></a>
              </div>
              <div className="col-md-4 alignCenter">
                  <a href="drinks"><img src={drinks} alt="drinks" height="300" /></a>
              </div>
            </div>
            <div className="alignCenter" style={{marginTop: 30, marginBottom: 30}}>
              <a href="/allitems" className="btn btn-warning btn-lg">
                <span style={{fontWeight: 'bold'}}>VIEW FULL MENU</span>
              </a>
            </div>
            <Footer />
         </div>
      )
   }
}
export default Home;
