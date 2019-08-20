import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.scss';


class Footer extends React.Component {
    render() {
        return (
            <div className="row fixedfooter" style={{ height: '130px' }}>
                <div className="col-md-8 offset-md-2">
                    <div className="text-center center-block">
                        <p className="txt-railway"></p>
                        <br />
                        <a style={{ marginRight: '50px' }} href="https://www.facebook.com/aolabanji"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                        <a style={{ marginRight: '50px' }} href="https://twitter.com/AlabiTemitopeW1"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
                        <a style={{ marginRight: '50px' }} href="https://www.linkedin.com/in/alabi-temitope-aa036b103"><i id="social-gp" className="fa fa-linkedin fa-3x social"></i></a>
                        <a href="mailto:engr.temitope@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>

                    </div>

                    {/* copyright */}
                    <div className="text-center center-block">
                        <div className="footer-copyright text-center py-3">© 2018 Copyright:
      <a href="https://mompop-9c94f.firebaseapp.com"> PauseWork</a>
                        </div>
                        <br />

                    </div>
                </div>
                {/* <div className="container fixedfooter ">

    <hr/>
        <div className="text-center center-block">
            <p className="txt-railway"></p>
            <br />
            <a style={{marginRight: '50px'}} href="https://www.facebook.com/aolabanji"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
	            <a style={{marginRight: '50px'}} href="https://twitter.com/AlabiTemitopeW1"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
	            <a style={{marginRight: '50px'}} href="https://plus.google.com/engrtemitope"><i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i></a>
	            <a href="mailto:engr.temitope@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>

</div>
    <hr/>
</div> */}
            </div>
        );
    }
}
export default Footer;