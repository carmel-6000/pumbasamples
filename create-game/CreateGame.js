import React, { Component } from 'react';
import Auth from '../../auth/Auth';
import ImageUploader from '../../fileshandler/client/components/ImageUploader';
import './CreateGame.scss';

export default class CreateGame extends Component {

    constructor(props) {
        super(props);
        this.state = { uploadedImage: null };
    }

    onInputChange = (inputEvent) => {
        let name = (inputEvent.target && inputEvent.target.name) || null;
        let value = (inputEvent.target && inputEvent.target.value) || null;
        if (name && value) {
            this.setState({ [name]: value });
        }
    }

    getGameData = () => {
        const fieldsToSave = ["title", "description", "schoolName","imgId"];

        let fieldsToSaveObj = {};
        for (let field of fieldsToSave) {
            fieldsToSaveObj[field] = this.state[field];
        }

        return fieldsToSaveObj;
    }

    createGame = async () => {

        let newGame = this.getGameData();

        let [res, err] = await Auth.superAuthFetch('/api/Games/createNewGame', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({newGameData: newGame})
        });

        if (err) return console.log("ERR:", err);

        await this.previewImg();
    };

    previewImg = async () => {
        let filter = "filter[order]=id DESC&filter[limit]=1";
        let [res, err] = await Auth.superAuthFetch('/api/Images?' + filter);

        console.log([res, err]);

        if (err) return console.log("ERR:", err);

        this.setState({ uploadedImage: res[0] });
    }

    render() {
        return (
            <div dir="ltr">
                <div>
                    Creates a new game and uploads an image through Games model.
                    <br />
                    Supported image format: .png, .jpg, .jpeg, .gif
                </div>

                <br />

                <h2>Create a new game</h2>

                <div className="form">
                    <div className="field">
                        <label>Title:</label>
                        <input
                            onChange={this.onInputChange}
                            name="title"
                            // required={true}
                            type="text" />
                    </div>

                    <div className="field">
                        <label>Description:</label>
                        <textarea
                            onChange={this.onInputChange}
                            name="description"
                            // required={false}
                            rows="5"
                            cols="23"
                        />
                    </div>

                    <div className="field">
                        <label>School Name:</label>
                        <input
                            onChange={this.onInputChange}
                            name="schoolName"
                            // required={true}
                            type="text" />
                    </div>

                    <ImageUploader
                        category='uploaded_images' // image is saved into public/images/[category]
                        name='imgId' // [IMAGE_NAME_LIKE_IN_DATABASE]
                        required={false}
                        onChange={this.onInputChange}
                        label='Upload an image' />
                </div>

                <button onClick={this.createGame}>Submit</button>

                {this.state.uploadedImage && <UploadedImage {...this.state.uploadedImage} />}
            </div>
        );
    }
}

const UploadedImage = (props) => {
    return (
        <div className='uploaded-image'>
            <div>
                <img src={props.path} alt={props.title} title={props.title}/>
                <label>{props.description}</label>
            </div>
        </div>
    );
}