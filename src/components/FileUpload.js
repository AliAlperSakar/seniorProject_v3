import React, { Component } from 'react';
import axios from 'axios';
import { Button } from "semantic-ui-react";

export default class FileUpload extends Component {
    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        console.log(fd);
        axios.post('http://localhost:8081/upload', fd).then(res => {
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                <input style={{ marginTop: "20px" }} type="file" label="Choose a Photo" onChange={this.fileSelectedHandler} />
                {/* <Button onClick={this.fileUploadHandler} style={{ marginTop: "30px" }} primary>Upload Photo</Button> */}
            </div>
        )
    }
}

