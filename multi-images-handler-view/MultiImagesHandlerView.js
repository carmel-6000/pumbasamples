import React, { Component } from 'react';
import Auth from '../../auth/Auth';
import MultiImagesHandler from '../../fileshandler/client/components/multi-images-handler/MultiImagesHandler';
import PreviewWidget from '../../fileshandler/client/components/PreviewWidget';
import './MultiImagesHandlerView.scss';

const UploadedImage = (props) => {
    return (
        <div className='figure-container'>
            <figure>
                <img src={props.path} alt={props.title} title={props.title} />
                <figcaption>{props.description}</figcaption>
            </figure>
        </div>
    );
}

export default class MultiImagesHandlerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedImages: [],
            isSubmitDisabled: true
        };
    }

    onChange = (event) => {
        let name = (event.target && event.target.name) || null;
        let value = (event.target && event.target.value) || null;
        let isSubmitDisabled = true;
        if (isSubmitDisabled && value) isSubmitDisabled = false;
        this.setState({ [name]: value, isSubmitDisabled });
    }

    getFilesData = () => {
        const fieldsToSave = ['imgId'];

        let fieldsToSaveObj = {};
        for (let field of fieldsToSave) {
            if (this.state[field]) fieldsToSaveObj[field] = this.state[field];
        }

        return fieldsToSaveObj;
    }

    upload = async () => {
        this.setState({ isSubmitDisabled: true });

        let filesData = this.getFilesData();
        console.log("about to upload files", filesData);

        let [pRes, pErr] = await Auth.superAuthFetch('/api/Images', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(filesData)
        });

        if (pErr) return console.log("ERR:", pErr);

        let filter = `filter[order]=id DESC&filter[limit]=${Object.keys(filesData).length}`;
        let [gRes, gErr] = await Auth.superAuthFetch('/api/Images?' + filter);

        if (gErr) return console.log("ERR:", gErr);

        console.log("res", gRes);

        this.setState({ uploadedImages: gRes });
    };

    render() {
        let isSubmited = Object.keys(this.state.uploadedImages).length !== 0;

        return (
            <div className="multi-images-handler-sample">

                <h1>Multi Images Handler</h1>

                <div className="image-input-samples">

                    <div className="image-input-sample">
                        <MultiImagesHandler
                            // name="my-multi-images-handler" // some unique name
                            name="imgId" // keyToSaveImgId
                            title="my-images"
                            category="games-images"
                            // keyToSaveImgId="imgId" // if null: returns the id without saving in model
                            relatedModelToSaveImgId={{
                                modelName: "games_images",
                                keyToSaveNewInstanceId: "gameId"
                            }}
                            onChange={this.onChange}
                            disabled={isSubmited} />
                    </div>
                </div>

                <p className="explanation">
                    <strong>Note:</strong> In this example the Submit button uploads all the chosen images to Images model<br />
                    (without saving a reference image_id in another model like in "Upload image to relative model (by creating a new game)" sample).</p>

                {!isSubmited ?
                    <button onClick={this.upload} disabled={this.state.isSubmitDisabled}>Submit</button> :
                    <div className="uploaded-images">
                        {this.state.uploadedImages.map((uploadedImage, i) =>
                            <div key={i}>
                                <UploadedImage {...uploadedImage} />
                            </div>)}
                    </div>}
            </div>
        );
    }
}