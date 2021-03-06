import * as React from "react";
import './../Gallery/Gallery.css';
import {request} from "../../helpers";
import {formatDate, formatName} from "../Box/Box";
import favorites from '../../public/Favorites.png';

import {Link} from "react-router-dom";

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesArray: []
        }
    }

    componentDidMount(){
        request('get', "/v1/community/likes", {},
            (response) => {
                this.state.imagesArray.unshift.apply(this.state.imagesArray, response.data);
                this.setState({imagesArray: this.state.imagesArray})},
            (error) => {})
    }

    onMouseOver = (hash) => e => {
        e.preventDefault();
        this.props.photoClick(hash);
    }

    render() {
        return (
            <div>
                <img src={favorites} alt="header" width="auto" height="210"/>
                <div className="gallery-body">
                    {this.state.imagesArray.map((image, i) =>
                        <section className="image-gallery" key={i}>
                            <div className = "image-gallery-header">
                                <div className = "image-title">{image.title + " - "}</div>
                                <div className = "price">{image.price + " Wei"}</div>
                                <div className = "box-date">{formatDate(image.createdDate)}</div>
                            </div>
                            <Link to={{pathname: "/history"}}><img id = "image-content" className = "image-content" alt = {image.title} src = {`data:image/jpg;base64,${image.path}`} onMouseOver={this.onMouseOver(image.hash)}/></Link>
                            <div className="image-gallery-bottom">
                                <div className = "box-author">{formatName(image.userDto)}</div>
                            </div>
                        </section>)}
                </div>
            </div>
        )
    }
}

export default Favorites;