
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loadable from '@loadable/component';
let samplesArrayData = require("../samples/samples_array_data.json")
let compName =""
class Samples extends Component {
    
    render() {
        return (
            <div>
                <h3>Pumba's Samples List</h3>
                <ul dir="ltr">
                    {samplesArrayData.map(elem => {
                        return <li><a href={`/samples/${elem.route}`}>{elem.title}</a></li>
                    })}
                </ul>
                <Router basename="samples">
                    {
                        <Switch>
                            {samplesArrayData.map(elem => {
                                let i = elem.filePath;
                                compName = loadable(() => import("../" + i))
                                return < Route path={`/${elem.route}`} component={compName} />
                                
                            })}

                        </Switch>}
                </Router>
            </div>
        );
    }
}

export default Samples;
