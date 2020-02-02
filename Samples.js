import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import FileUploaderView from './FileUploaderView';
import ImageHandlerView from './ImageHandlerView';
import MultiImagesHandlerView from './multi-images-handler-view/MultiImagesHandlerView';
import CreateGame from './create-game/CreateGame';
import LoginAsView from './LoginAsView';
import Login from "../auth/Login";

class Samples extends Component {
    render() {
        return (
            <div>
                <h3>Pumba's Samples List</h3>
                <ul dir="ltr">
                    <li><a href='/samples/file-uploader'>File Uploader, Image Uploader, Audio Uploader</a></li>
                    <li><a href='/samples/image-handler'>Image Handler (the new image uploader)</a></li>
                    <li><a href='/samples/multi-images-handler'>Multi Images Handler</a></li>
                    <li><a href='/samples/create-game'>Upload image to relative model (by creating a new game)</a></li>
                    <li><a href='/samples/login-as'>Login as another user</a></li>
                    <li><a href='/samples/login'>Login (Login, reset password, registration (not ready yet)</a></li>
                </ul>

                <Router basename="samples">
                    <Switch>
                        <Route path='/file-uploader' component={FileUploaderView} />
                        <Route path='/image-handler' component={ImageHandlerView} />
                        <Route path='/multi-images-handler' component={MultiImagesHandlerView} />
                        <Route path='/create-game' component={CreateGame} />
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
