
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { softFadeIn, softFadeUp, containerStagger } from '../animations';

const Footer = ({ setActiveNav }) => {
    return (
        <motion.div
            className={styles.footerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={softFadeIn}
        >
            <div className={styles.footerWrapper}>
                <motion.div
                    className={styles.footerContent}
                    variants={containerStagger}
                >
                    <motion.div className={styles.signatureContainer} variants={softFadeUp}>
                        <p><a href="https://www.cgc.global/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnwqk8vDHLqIurIWtwfHKp5lbPLKoBL9Zny0WzgCVrEzTeOBDQKMgEYXQHQqA_aem_rPG_qT-JKK24nZT54iJijg">@CGC</a></p>
                    </motion.div>
                    <motion.div className={styles.media} variants={softFadeUp}>
                        <p>Media</p>
                        <motion.div className={styles.socialIcons} variants={containerStagger}>
                            <motion.a href="https://www.instagram.com/carolinelabouchere" target="_blank" variants={softFadeIn} whileHover={{ scale: 1.1, rotate: 3 }}><i className="ri-instagram-line"></i></motion.a>
                            <motion.a href="https://www.facebook.com/carolinelabouchereisgrey" target="_blank" variants={softFadeIn} whileHover={{ scale: 1.1, rotate: 3 }}><i className="ri-facebook-fill"></i></motion.a>
                            <motion.a href="https://www.youtube.com/@CarolineLabouchere" target="_blank" variants={softFadeIn} whileHover={{ scale: 1.1, rotate: 3 }}><i className="ri-youtube-line"></i></motion.a>
                        </motion.div>
                    </motion.div>
                    <div className={styles.footerNav}>
                        <motion.ul variants={containerStagger}>
                            <motion.li variants={softFadeUp}><a href="#home" onClick={() => setActiveNav('Home')}>Home</a></motion.li>
                            <motion.li variants={softFadeUp}><a href="#about" onClick={() => setActiveNav('About')}>About</a></motion.li>
                            <motion.li variants={softFadeUp}><a href="#product" onClick={() => setActiveNav('Product')}>Product</a></motion.li>
                            <motion.li variants={softFadeUp}><a href="/Images/Portfolio/My_Portfolio_Caroline_Labouchere.pdf" download onClick={() => setActiveNav('Portfolio')}>Portfolio</a></motion.li>
                            <motion.li variants={softFadeUp}><a href="#gallery" onClick={() => setActiveNav('Gallery')}>Gallery</a></motion.li>
                        </motion.ul>
                    </div>
                </motion.div>

            </div>
            <motion.hr variants={softFadeIn} />
            <motion.p variants={softFadeIn}>© {new Date().getFullYear()} Caroline Labouchere. All rights reserved.| www.creatorsblueprint.net</motion.p>
        </motion.div>
    );
};

export default Footer;
