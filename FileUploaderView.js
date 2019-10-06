import React, { Component } from 'react';
import Auth from './../auth/Auth';
import FileUploader from './../dashboard/components/FileUploader';
import AudioUploader from './../dashboard/components/AudioUploader';
import ImageUploader from './../dashboard/components/ImageUploader';

export default class FileUploaderView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleFileChange = (fileEvent) => {
        let name = (fileEvent.target && fileEvent.target.name) || null;
        let value = (fileEvent.target && fileEvent.target.value) || null;
        if (name && value) {
            this.setState({ [name]: value });
        }
    }

    getFilesData = () => {
        const fieldsToSave = ['fileSampleId', 'audioSampleId', 'imageSampleId'];

        let fieldsToSaveObj = {};
        for (let field of fieldsToSave) {
            fieldsToSaveObj[field] = this.state[field];
        }

        return fieldsToSaveObj;
    }

    upload = () => {
        let filesData = this.getFilesData();

        console.log("about to upload files YAYYYAY:)", filesData)
        Auth.superAuthFetch('/api/Files', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(filesData)
        })
    };


    render() {
        return (

            <div>
                <br /><br /><br />
                <div>UPLOAD FILE --> pdf, doc, docx</div>
                <FileUploader
                    category='uploaded_files' // file is saved into public/files/[category]
                    name='fileSampleId' // [FILE_NAME_LIKE_IN_DATABASE]
                    required={true}
                    onChange={this.handleFileChange}
                    label='קורות חיים'
                />

                <br /><br /><br />
                <div>UPLOAD AUDIO --> mp3, wav</div>
                <AudioUploader
                    category='uploaded_audio' // audio is saved into public/files/[category]
                    name='audioSampleId' // [AUDIO_NAME_LIKE_IN_DATABASE]
                    required={false}
                    onChange={this.handleFileChange}
                    label='Choose ur favorite song'
                />

                <br /><br /><br />
                <div>UPLOAD IMAGE --> .png, .jpg, .jpeg, .gif</div>
                <ImageUploader
                    category='uploaded_images' // image is saved into public/images/[category]
                    name='imageSampleId' // [IMAGE_NAME_LIKE_IN_DATABASE]
                    required={false}
                    onChange={this.handleFileChange}
                    label='Show us your dog'
                    // defaultThumbnailImageSrc=[PATH_TO_YOUR_DEFAULT_IMAGE]//a path in public, example:'/images/mydefaultimg.png'
                />


                <button onClick={this.upload}>SUBMIT FILES</button>
            </div>
        );
    }
}

