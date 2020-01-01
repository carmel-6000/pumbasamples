import React, { Component } from 'react';
import Auth from './../auth/Auth';
import './Samples.scss';
import ImageUploader from './../fileshandler/client/components/ImageUploader';

const UploadedImage=(props)=>{
    return(
        <div className='figure-container'>
            <figure className='uploaded-figure'>
                <img src={props.path} alt={props.title} title={props.title} />
                <figcaption>{props.description}</figcaption>
            </figure>
        </div>
    );
}


export default class FileUploaderView extends Component {

    constructor(props) {
        super(props);
        this.state = {uploadedImage:null, isDisabled: true};
    }

    handleFileChange = (fileEvent) => {
        let name = (fileEvent.target && fileEvent.target.name) || null;
        let value = (fileEvent.target && fileEvent.target.value) || null;
        let isDisabled = true;
        if (isDisabled && value) isDisabled = false;
        this.setState({ [name]: value, isDisabled });
    }

    getFilesData = () => {
        const fieldsToSave = ['fileSampleId', 'audioSampleId', 'imageSampleId'];

        let fieldsToSaveObj = {};
        for (let field of fieldsToSave) {
            fieldsToSaveObj[field] = this.state[field];
        }

        return fieldsToSaveObj;
    }

    upload = async () => {
        let filesData = this.getFilesData();

        console.log("about to upload files YAYYYAY:)", filesData)
        await Auth.superAuthFetch('/api/Files', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(filesData)
        });


        
        let filter="filter[order]=id DESC&filter[limit]=1";
        let [res,err]= await Auth.superAuthFetch('/api/Images?'+filter);

        console.log("RES?",res);
        this.setState({uploadedImage:res[0]});



    };


    



    render() {
        return (

            <div>
                <br /><br /><br />
                <div>UPLOAD IMAGE --> .png, .jpg, .jpeg, .gif</div>
                
                <ImageUploader
                    category='uploaded_images' // image is saved into public/images/[category]
                    name='imageSampleId' // [IMAGE_NAME_LIKE_IN_DATABASE]
                    required={false}
                    onChange={this.handleFileChange}
                    label='Show us your dog'
                />


                <button onClick={this.upload} disabled={this.state.isDisabled}>SUBMIT FILES</button>

                {this.state.uploadedImage && <UploadedImage {...this.state.uploadedImage} />}
                
            </div>
        );
    }
}

