import './style.css';
import {myImageDataURL} from './constants';


const ImageText = () => {
    return (
        <div className='image-text-container'>
            <div className='image-text-text'>
                <p className='title'>Hi, I am Anubhav Kumar</p>
                <p className='subtitle'>I am a Senior Software Developer by Profession</p>
                <p className='subtitle'>I have 5+ Years of experience in this field</p>
                <p className='subtitle'>I love travelling, driving my car and exploring new places</p>
            </div>
            <div className='image-text-image'>
                <img src={myImageDataURL} alt='Me' />
            </div>
        </div>
    )
}

export default ImageText