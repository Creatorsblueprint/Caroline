import styles from './Product.module.css'
import { motion } from 'framer-motion';
import { loadStripe } from "@stripe/stripe-js";
import { useState } from 'react'


import { softFadeUp, containerStagger, softFadeIn, buttonHover } from '../animations';






const Product = () => {

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);



    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        setIsValidEmail(validateEmail(val));
    };



    const bookLearnings =
        [
            {
                svg: "Images/Icons/book_icon1.svg", // replace with your SVG import or path
                title: "Claim Your Visibility",
                text: "How to stop fading into the background and confidently take up space at every stage of life."
            },
            {
                svg: "Images/Icons/book_icon2.svg",
                title: "Rewrite the Narrative",
                text: "How to unlearn age-based limits and reframe experience as power, not decline."
            },
            {
                svg: "Images/Icons/book_icon3.svg",
                title: "Intentional Style",
                text: "How personal style becomes a tool for visibility, presence, and self-respect, not trends."
            },
            {
                svg: "Images/Icons/book_icon4.svg",
                title: "Own Your Next Chapter",
                text: "How to show up boldly, speak confidently, and move forward without apology, at any age."
            }
        ];
    const product = [
        {
            type: "ebook",
            title: "Aging Without Apology",
            description: "Guide to owning your presence, personal style, and confidence, no matter where you are in life.",
            price: 29,
            currency: "usd",
            image: "https://lebohangdev.github.io/Caroline/Images/ebook/ebook_cover2.png",
            email: email,
            successUrl: "https://carolinelabouchere.com/?payment=success",
            cancelUrl: "https://carolinelabouchere.com/?payment=cancel",


        }
    ]





    // asyncronous function to handle stripe checkout when called 
    async function handleCheckout(productPayload) {
        const res = await fetch("https://carolinebackend.onrender.com/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // sending product payload to backend
            body: JSON.stringify(productPayload),
        });

        // storing response from backend in json format

        const data = await res.json();
        console.log("Session response:", data);

        // redirect to stripe checkout
        window.location.href = data.url;
    }



    return (
        <motion.div
            id="product"
            className={styles.productContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerStagger}
        >
            <div className={styles.section1}>
                <motion.div className={styles.productContent1} variants={softFadeUp}>
                    <div className={styles.productImage}>
                        <img src="Images/ebook/ebook_cover2.png" alt="" />
                    </div>
                </motion.div>

                <motion.div className={styles.productContent2} variants={containerStagger}>
                    <motion.div className={styles.productText} variants={softFadeUp}>
                        <p>EBOOK</p>
                        <div className={styles.title}>
                            <h1>Becoming Visible at Any Age</h1>
                        </div>
                        <p>guide to owning your presence, personal style, and confidence, no matter where you are in life</p>

                    </motion.div>
                    <motion.div className={styles.productEmailField} variants={softFadeUp}>
                        <p className={isValidEmail ? styles.valid : styles.invalid}>*Enter a valid email</p>
                        <input type="text" value={email} placeholder="Enter your email" onChange={handleEmailChange} />
                        <motion.button disabled={!isValidEmail} whileHover={isValidEmail ? buttonHover : ""} onClick={() => { handleCheckout(product[0]); setEmail(''); }}>GET STARTED NOW!</motion.button>
                    </motion.div>
                    <motion.div className={styles.priceContainer} variants={softFadeUp}>
                        <h1>Price</h1>
                        <p>$29</p>
                        <p>After payment, eBook will be sent to given email (Check spam/junk folder if you dont see it in a few minutes.)</p>
                    </motion.div>
                </motion.div>

            </div>
            <motion.div
                className={styles.section2}
                variants={containerStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={styles.title}>
                    <motion.h1 variants={softFadeUp}>About the book</motion.h1>
                    <motion.p variants={softFadeUp}>Inside the Pages: Confidence, Visibility, and Self-Expression</motion.p>
                </div>
                <motion.div className={styles.videoContainer} variants={softFadeUp}>
                    <iframe src="https://www.youtube.com/embed/Lz-QdJ_fK5E?si=LBUNnvjiTYnpuiLp&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </motion.div>
                <div className={styles.bookGrid}>
                    <motion.div className={styles.bookGridItems} variants={containerStagger}>
                        {bookLearnings.map((item, index) => (
                            <motion.div className={styles.bookGridItem} key={index} variants={softFadeUp}>
                                <img src={item.svg} alt={item.title} />
                                <h1>{item.title}</h1>
                                <p>{item.text}</p>
                            </motion.div>
                        ))}

                    </motion.div>
                </div>
            </motion.div>


        </motion.div>
    )
}

export default Product
