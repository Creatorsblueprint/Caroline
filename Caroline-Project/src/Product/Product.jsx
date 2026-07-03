import styles from './Product.module.css'
import { motion } from 'framer-motion';
import { loadStripe } from "@stripe/stripe-js";
import { useState } from 'react'


import { softFadeUp, containerStagger, softFadeIn, buttonHover } from '../animations';






const Product = () => {

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [ebookChoice, setEbookChoice] = useState(2);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;
    let ebookPrice;
    if (ebookChoice === 1) {
        ebookPrice = 1;
    } else if (ebookChoice === 2) {
        ebookPrice = 1;
    }

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setEbookChoice(1);
        } else if (isRightSwipe) {
            setEbookChoice(2);
        }
    };

    const selectEbook = (choice) => {
        setEbookChoice(choice);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        setIsValidEmail(validateEmail(val));
    };

    const bookLearnings = [
        {
            svg: "Images/Icons/book_icon1.svg",
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

    const handlePurchase = async (choice) => {
        const payload = choice === 1
            ? {
                Ebook_choice: 1,
                type: "ebook",
                title: "Aging Without Apology",
                description: "Guide to owning your presence, personal style, and confidence, no matter where you are in life.",
                price: ebookPrice,
                currency: "usd",
                image: "https://Creatorsblueprint.github.io/Caroline/Images/ebook/ebook_cover2.png",
                email: email,
                successUrl: "https://carolinelabouchere.com/?payment=success",
                cancelUrl: "https://carolinelabouchere.com/?payment=cancel",
            }
            : {
                Ebook_choice: 2,
                type: "ebook",
                title: "Beauty, Under the Skin",
                description: "A candid guide to medical aesthetics. Caroline shares honest personal experiences, realistic recovery timelines, treatments to try, and what to avoid.",
                price: ebookPrice,
                currency: "usd",
                image: "https://Creatorsblueprint.github.io/Caroline/Images/ebook/ebook_cover3.png",
                email: email,
                successUrl: "https://carolinelabouchere.com/?payment=success",
                cancelUrl: "https://carolinelabouchere.com/?payment=cancel",
            };

        const res = await fetch("https://carolinebackend-648711352735.me-west1.run.app/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("Session response:", data);

        window.location.href = data.url;
    };



    return (
        <motion.div
            id="product"
            className={styles.productContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerStagger}
        >
            <div
                className={styles.carouselContainer}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <button
                    className={`${styles.carouselArrow} ${styles.arrowLeft}`}
                    onClick={() => selectEbook(2)}
                    disabled={ebookChoice === 2}
                    aria-label="Previous ebook"
                >
                    <i className="ri-arrow-left-s-line"></i>
                </button>
                <button
                    className={`${styles.carouselArrow} ${styles.arrowRight}`}
                    onClick={() => selectEbook(1)}
                    disabled={ebookChoice === 1}
                    aria-label="Next ebook"
                >
                    <i className="ri-arrow-right-s-line"></i>
                </button>

                <div className={styles.carouselViewport}>
                    <div
                        className={styles.carouselTrack}
                        style={{ transform: `translateX(-${ebookChoice === 2 ? 0 : 50}%)` }}
                    >
                        {/* Slide 1 - Beauty, Under the Skin */}
                        <div className={styles.carouselSlide}>
                            <div className={styles.productContent1}>
                                <div className={`${styles.productImage} ${styles.hasBadge}`}>
                                    <div className={styles.newBadge}>NEW</div>
                                    <img src="Images/ebook/ebook_cover3.png" alt="Beauty, Under the Skin Cover" />
                                </div>
                            </div>

                            <div className={styles.productContent2}>
                                <div className={styles.productText}>
                                    <p>EBOOK</p>
                                    <div className={styles.title}>
                                        <h1>Beauty, Under the Skin</h1>
                                    </div>
                                    <h3 className={styles.subtitle}>Medical Interventions, Real Results, and What I’d Actually Do Again</h3>
                                    <p className={styles.descriptionText}>
                                        A candid guide to medical aesthetics. Caroline shares honest personal experiences, realistic recovery timelines, treatments to try, and what to avoid.
                                    </p>
                                </div>
                                <div className={styles.productEmailField}>
                                    <p className={isValidEmail ? styles.valid : styles.invalid}>*Enter a valid email</p>
                                    <input
                                        type="text"
                                        value={email}
                                        placeholder="Enter your email"
                                        onChange={handleEmailChange}
                                    />
                                    <motion.button
                                        disabled={!isValidEmail}
                                        whileHover={isValidEmail ? buttonHover : ""}
                                        onClick={() => { handlePurchase(ebookChoice); setEmail(''); }}
                                    >
                                        GET STARTED NOW!
                                    </motion.button>
                                </div>
                                <div className={styles.priceContainer}>
                                    <div className={styles.priceValue}>${ebookPrice}</div>
                                    <p className={styles.priceNote}>
                                        *Sent directly to your email after checkout (check spam/junk folder if it doesn't arrive within a few minutes).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2 - Becoming Visible at Any Age */}
                        <div className={styles.carouselSlide}>
                            <div className={styles.productContent1}>
                                <div className={styles.productImage}>
                                    <img src="Images/ebook/ebook_cover2.png" alt="Aging Without Apology Cover" />
                                </div>
                            </div>

                            <div className={styles.productContent2}>
                                <div className={styles.productText}>
                                    <p>EBOOK</p>
                                    <div className={styles.title}>
                                        <h1>Becoming Visible at Any Age</h1>
                                    </div>
                                    <p className={styles.descriptionText}>
                                        A guide to owning your presence, personal style, and confidence, no matter where you are in life.
                                    </p>
                                </div>
                                <div className={styles.productEmailField}>
                                    <p className={isValidEmail ? styles.valid : styles.invalid}>*Enter a valid email</p>
                                    <input
                                        type="text"
                                        value={email}
                                        placeholder="Enter your email"
                                        onChange={handleEmailChange}
                                    />
                                    <motion.button
                                        disabled={!isValidEmail}
                                        whileHover={isValidEmail ? buttonHover : ""}
                                        onClick={() => { handlePurchase(ebookChoice); setEmail(''); }}
                                    >
                                        GET STARTED NOW!
                                    </motion.button>
                                </div>
                                <div className={styles.priceContainer}>
                                    <div className={styles.priceValue}>$29</div>
                                    <p className={styles.priceNote}>
                                        *Sent directly to your email after checkout (check spam/junk folder if it doesn't arrive within a few minutes).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.scrollHint}>
                    <i className="ri-arrow-left-right-line"></i> Swipe or tap arrows to see other ebook option
                </div>

                <div className={styles.paginationDots}>
                    <button
                        className={`${styles.dot} ${ebookChoice === 2 ? styles.activeDot : ''}`}
                        onClick={() => selectEbook(2)}
                        aria-label="Ebook: Beauty, Under the Skin"
                    ></button>
                    <button
                        className={`${styles.dot} ${ebookChoice === 1 ? styles.activeDot : ''}`}
                        onClick={() => selectEbook(1)}
                        aria-label="Ebook: Becoming Visible at Any Age"
                    ></button>
                </div>
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
