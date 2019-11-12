import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import FileUploaderView from './FileUploaderView';
import ImageUploaderView from './ImageUploaderView';

class Samples extends Component {
    render() {
        return (
            <div>
                <h3>Pumba's Samples List</h3>
                <ul>
                    <li><a href='/samples/file-uploader'>File Uploader, Image Uploader, Audio Uploader</a></li>
                    <li><a href='/samples/image-uploader'>Image Uploader</a></li>
                

                </ul>
                <Router basename="samples">
                    
                    <Switch>
                        <Route path='/file-uploader' component={FileUploaderView} />
                        <Route path='/image-uploader' component={ImageUploaderView} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Samples;
