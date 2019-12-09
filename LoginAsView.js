import React, { Component } from 'react';
import Auth from './../auth/Auth';
import Styles from './Samples.scss';

export default class LoginAsView extends Component {

    constructor(props) {
        super(props);

    }

    loginAs=()=>{
        
        (async()=>{

            /*
            let [at,err]=await Auth.superAuthFetch('/api/CustomUsers/login-as', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({uid:3})
            });

            console.log("response err",err);
            console.log("response access token",at);

            */

            let res=await Auth.loginAs(3);
            console.log("RES?",res);
            //window.location.reload();

        })();
        
        
    }


    render() {
        return (

            <div> <br /> <h2>Login as another user</h2>
                
                <div>User id : 3</div>

                <button onClick={this.loginAs}>Login as this user</button>

                
                
            </div>
        );
    }
}

