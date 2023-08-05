import React from 'react';
import './Footer.css';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBAccordion,
    MDBAccordionItem
  } from 'mdb-react-ui-kit';

const Footer = () => {

    return (
    <section className="footer-section">
        <div className='footer-row'>
            <div className='footer-column'>
                <h3>MOVIES</h3>
                <div className='footer-desc'>
                    <a href=''><p>Upcoming Movie</p></a>
                </div>
            </div>
            <div className='footer-column'>
                <h3>LOCATION</h3>
                <div className='footer-desc'>
                <MDBAccordion>
                    <MDBAccordionItem collapseId={1} headerTitle='MELBOURNE' bodyClassName='accordionStyle'>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                    </MDBAccordionItem>
                    <MDBAccordionItem collapseId={2} headerTitle='SDYNEY'>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                    </MDBAccordionItem>
                    <MDBAccordionItem collapseId={3} headerTitle='PERTH'>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                    </MDBAccordionItem>
                    <MDBAccordionItem collapseId={4} headerTitle='BRISBANE'>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                    </MDBAccordionItem>
                    <MDBAccordionItem collapseId={5} headerTitle='CANBERRA'>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                        <p>Melbourne Central</p>
                    </MDBAccordionItem>
                </MDBAccordion>
                </div>
            </div>
            <div className='footer-column'>
                <h3>CONTACT US</h3>
                <div className='footer-desc'>
                    <a href="mailto:contact@loopcinemas.com"><p>contact@loopcinemas.com</p></a>
                    <h2>LOOP CINEMAS Head Office</h2>
                    <p>122 Toorak Rd, South Yarra VIC 3141, Australia</p>
                </div>
            </div>
            <div className='footer-column'>
                <h3>FOLLOW US ON</h3>
                <div className='footer-desc'>
                    <MDBBtn outline color="light" floating href='#!' role='button' className='social-icon'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating href='#!' role='button' className='social-icon'>
                        <MDBIcon fab icon='instagram' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating href='#!' role='button' className='social-icon'>
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating href='#!' role='button' className='social-icon'>
                        <MDBIcon fab icon="tiktok" />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating href='#!' role='button' className='social-icon'>
                        <MDBIcon fab icon="youtube" />
                    </MDBBtn>
                </div>
            </div>
        </div>
        <div className='copyright'>
            <p>© 2023 Copyright Loop Cinemas. All Rights Reserved</p>
        </div>
      
    </section>
    );
}

export default Footer;