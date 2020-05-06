import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Footer() {
  return (
    <footer className="section-footer nav-blue">
    <div style={{fontWeight: 'bold', color: 'white', backgroundColor: "#dc3836", fontSize: 20, paddingTop: 20, paddingBottom: 10, textAlign: 'center'}}>
        To Place An Order CALL - 1800-8888-9876-2345
    </div>
    <div className="row" style={{marginTop: 20}}>
        <div className="col-md-4 alignCenter ">
            <span style={{color: '#dc3836'}} >Yummi Pizza</span>
            Address: Chingmeirong East Near PG Petroleum
        </div>
        <div className="col-md-4 alignCenter">
        <span style={{color: '#dc3836'}} >Yummi Pizza</span>
        Address: Chingmeirong East Near PG Petroleum
        </div>
        <div className="col-md-4 alignCenter">
        <span style={{color: '#dc3836'}} >Yummi Pizza</span>
        Address: Chingmeirong East Near PG Petroleum
        </div>
      </div>

    <hr />
    		<section className="footer-bottom row">
    				<p className="text-sm-right acolor" style={{textAlign: 'center', color: 'white'}}>
              &copy; {new Date().getFullYear()}
              <a className="acolor" href="http://zinyor.com"> Yummi Pizza</a>
    				</p>
    		</section>
    </footer>
  );
}

export default Footer;
