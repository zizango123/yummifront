import React from 'react';
import Minimal from '../common/navbars/minimal.js';
import loader from '../images/ajax.gif';
import { loginURL } from '../Constants';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errormsg:"",
      fetching:false
    };
    }

    async login() {
      this.setState({errormsg: '', fetching: true});
    await fetch(loginURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Username: this.refs.username.value,
            Password: this.refs.password.value,
          }
        })
        .then((res) => res.json())
        .then((restext) => {
          if(restext.type ==='success'){
            this.setState({
              fetching: false
            });
            localStorage.setItem('loggedin',1);
            localStorage.setItem('logtoken',restext.msg);
            window.location.href = "/";
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
          this.setState({fetched: 0, errormsg: 'Invalid URL'+error, fetching:false})
        });
  }



   render() {
      return (
         <div>
          <Minimal />
          <div className="font-weight-bold ml-5 mt-5 mb-5">Login</div>
              <div className="col-md-6 mb-5">
                    <input type="text" placeholder="Username" className="form-control mb-3" ref="username" />
                    <input type="password" placeholder="Password" className="form-control mb-3" ref="password" />
                    {this.state.fetching?
                    <div><p style={{textAlign: 'center'}}>Please Wait while you are logged in <img alt="loading url" src={loader} /></p></div>
                    :<button onClick={() => this.login()} className=" mt-4 mb-5 btn btn-warning btn-dm">Login</button>
                  }
                  <div>Username: demo@yummi.com | Password: eternity</div>
                  {this.state.errormsg !== ''?
                  <div><p style={{textAlign: 'center'}}>{this.state.errormsg}</p></div>
                  :null
                }
              </div>
         </div>
      )
   }
}
export default Login;
