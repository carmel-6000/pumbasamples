import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import FileUploaderView from './FileUploaderView';
import ImageUploaderView from './ImageUploaderView';
import LoginAsView from './LoginAsView';
import Login from "../auth/Login";

class Samples extends Component {
    render() {
        return (
            <div>
                <h3>Pumba's Samples List</h3>
                <ul>
                    <li><a href='/samples/file-uploader'>File Uploader, Image Uploader, Audio Uploader</a></li>
                    <li><a href='/samples/image-uploader'>Image Uploader</a></li>
                    <li><a href='/samples/login-as'>Login as another user</a></li>
                    <li><a href='/samples/login'>Login (Login, reset password, registration (not ready yet)</a></li>
                </ul>
                <Router basename="samples">
                    
                    <Switch>
                        <Route path='/file-uploader' component={FileUploaderView} />
                        <Route path='/image-uploader' component={ImageUploaderView} />
                        <Route path='/login-as' component={LoginAsView} />
                        <Route path='/login' component={Login} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Samples;
