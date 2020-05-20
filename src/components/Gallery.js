import React, { Component } from 'react'
import MainLayout from '../layouts/MainLayout'
import ImageGallery from 'react-image-gallery';
import '../css/gallery.css';
const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

export default class Gallery extends Component {
    render() {
        return (
            <div>
            <MainLayout/>
                <div className="coursemain">
                  <div className="maintext">Gallery</div>
                  <div className='imageGallery'>
                        <ImageGallery items={images} />;
                  </div>
                </div>
            </div>
        )
    }
}
