import React, { Component } from 'react';
import Auth from './../auth/Auth';
import ImageUploader from './../fileshandler/client/components/ImageUploader';
import PreviewWidget from './../fileshandler/client/components/PreviewWidget';
import { PreviewWidgetExtension } from './../fileshandler/client/components/PreviewWidget';
import './ImageUploaderView.scss';
import './Samples.scss';

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

export default class ImageUploaderView extends Component {

    constructor(props) {
        super(props);
        this.state = { uploadedImage: null, isDisabled: true };
    }

    handleFileChange = (fileEvent) => {
        let name = (fileEvent.target && fileEvent.target.name) || null;
        let value = (fileEvent.target && fileEvent.target.value) || null;
        let isDisabled = true;
        if (isDisabled && value) isDisabled = false;
        this.setState({ [name]: value, isDisabled });
    }

    getFilesData = () => {
        const fieldsToSave = ['imageSample1', 'imageSample2', 'imageSample3', 'imageSample4'];

        let fieldsToSaveObj = {};
        for (let field of fieldsToSave) {
            fieldsToSaveObj[field] = this.state[field];
        }

        return fieldsToSaveObj;
    }

    upload = async () => {
        let filesData = this.getFilesData();

        console.log("about to upload files", filesData)
        let [r, e] = await Auth.superAuthFetch('/api/Files', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(filesData)
        });

        console.log("r", r)

        let filter = "filter[order]=id DESC&filter[limit]=1";
        let [res, err] = await Auth.superAuthFetch('/api/Images?' + filter);

        if (err) return console.log("ERR:", err);

        console.log("res", res);

        this.setState({ uploadedImage: res[0] });
    };

    render() {
        return (
            <div className="image-uploader-sample">

                <h1>Image Uploader</h1>
                <p>There are a few default styles you can easly implement by adding props</p>

                <div className="image-input-sample">
                    <p>This is the default design</p>
                    <ImageUploader
                        category="my-images" // image is saved into public/images/[category]
                        name="imageSample1"
                        title="my-image"
                        onChange={this.handleFileChange} />
                </div>

                <ImageUploader
                    category="my-images" // image is saved into public/images/[category]
                    name="imageSample2"
                    title="my-image"
                    theme="circle-theme"
                    onChange={this.handleFileChange} />

                <ImageUploader
                    category="my-images" // image is saved into public/images/[category]
                    name="imageSample3"
                    title="my-image"
                    previewWidget={<PreviewWidget enableEdit={true} enableDelete={true} />}
                    onChange={this.handleFileChange} />

                <ImageUploader
                    category="my-images" // image is saved into public/images/[category]
                    name="imageSample4"
                    title="my-image"
                    theme="circle-theme"
                    previewWidget={<PreviewWidget enableEdit={true} enableDelete={true} />}
                    onChange={this.handleFileChange} />

                <button onClick={this.upload} disabled={this.state.isDisabled}>Submit</button>

                {this.state.uploadedImage && <UploadedImage {...this.state.uploadedImage} />}
            </div>
        );
    }
}