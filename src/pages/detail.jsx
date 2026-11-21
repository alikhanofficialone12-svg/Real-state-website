import React from "react";
import Header from "../components/header";
import End from "../components/end";
import Image14 from "../assets/image copy 14.png";
import { LuDot } from "react-icons/lu";
import Image11 from "../assets/image copy 11.png";
import Image13 from "../assets/image copy 13.png";
import { useNavigate, useLocation } from "react-router-dom";

const Detail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cardData = location.state || {};
    const cardDate =
        cardData.Date ||
        cardData.createdAt ||
        cardData.date;

    const formatDate = (firebaseTimestamp) => {
        try {
            if (!firebaseTimestamp) return "N/A";

            let dateObj;

            // Handle Firebase Timestamp object
            if (firebaseTimestamp.toDate && typeof firebaseTimestamp.toDate === 'function') {
                dateObj = firebaseTimestamp.toDate();
            }
            // Handle Date object
            else if (firebaseTimestamp instanceof Date) {
                dateObj = firebaseTimestamp;
            }
            // Handle string
            else if (typeof firebaseTimestamp === 'string') {
                dateObj = new Date(firebaseTimestamp);
            }
            // Handle number (timestamp)
            else if (typeof firebaseTimestamp === 'number') {
                dateObj = new Date(firebaseTimestamp);
            }
            else {
                return "N/A";
            }

            // Check if dateObj is valid
            if (isNaN(dateObj.getTime())) {
                return "N/A";
            }

            return dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "N/A";
        }
    };

    const handleReadMore = () => {
        navigate("/articles");
    }

    return (
        <div className="detail-page">
            <Header />
            <div className="detail-container">
                <div className="detail-intro">
                    <div className="recent-meta">
                        <div className="recent-date">{formatDate(cardDate) || "N/A"}</div>
                        <div className="dot-icon"><LuDot /></div>
                        <div className="recent-category">{cardData.type || "Invest Strategies"}</div>
                    </div>
                    <h1>
                        {cardData.name || "From $0 to $40 Million: How a 10-Year Old Orphan Became a Successful Investor"}
                    </h1>
                    <p>
                        {cardData.description || "It can be a challenge to maintain balanced, healthy eating when you work from home. Try these 10 quick tips for healthy eating habits."}
                    </p>
                </div>
                <div className="detail-hero-image">
                    <img src={cardData.image || Image14} alt={cardData.name || "Detail"} />
                </div>
                <div className="detail-body">
                    <div className="detail-paragraphs">
                        <p>Imagine one day living in a luxurious, spacious house with everything you could possibly want in life. Now contrast that with red and blue lights filling your home, with officers yelling and sirens blaring. Then, envision a SWAT team ripping you away from your parents. Although it seems far-fetched, this actually happened. </p>
                        <br />
                        <br />
                        <p>
                            By all accounts, John was living a charmed “trust fund” life, but that was quickly all taken away from him. At age 10, that left John Mansor a ward of the state—orphaned and alone, with only his brother, David, alongside him. He’s spent the last 15-plus years climbing back to the top.
                        </p>
                    </div>
                    <div className="detail-section">
                        <h2>A Way Out: Focusing on What Can Be Controlled</h2>
                        <p>
                            Living as a ward of the state, life was a real battle of survival for John as a child. As he entered middle school, an opportunity for a change of scenery changed his perspective on life.
                            He was granted a scholarship to a sleepaway camp nestled in the Adirondack Mountains called the Raquette Lake Boys Camp. Soon after, John was taken in and adopted.
                        </p>
                    </div>
                    <div className="detail-section">
                        <h3>Preparation Meets Opportunity</h3>
                        <p>
                            Upon graduating, the harsh reality of the job market hit him when many potential employers believed he lacked relevant experience for an entry-level finance job. Undeterred, John entered tech sales.
                            After some success, John realized something was missing and couldn’t figure out how to get back to the life he used to have as a kid.
                        </p>
                    </div>
                    <div className="detail-section">
                        <h3>Luck or Fate? Becoming a Wholesaler</h3>
                        <p>
                            There’s a saying that “luck is when preparation meets opportunity.” This is the type of luck that those in search of financial freedom seek. They don’t wait for something good to happen—they find ways to stack the deck in their favor. That’s exactly what John did.
                            Once John set his sights on earning more, he began researching ways to create passive income, searching the internet for phrases like “how to build generational wealth.”
                        </p>
                    </div>
                    <div className="detail-section">
                        <h3>The Value of Active Listening</h3>
                        <p>
                            Early on, John realized that sales is fundamentally about active listening—a skill that involves understanding the other party’s needs, concerns, and motivations. With determination, grit, and an inherent knack for connecting with people on a genuine level, John recognized the power of emotional intelligence in real estate transactions.
                        </p>
                    </div>
                    <div className="detail-body-image">
                        <img src={Image11} alt="" />
                    </div>
                    <div className="detail-section">
                        <h2>From $0 to $40 Million in Assets</h2>
                        <p>
                            Taking down this eight-unit property marked a shift from quick, active income to a more strategic approach focused on creating sustainable wealth. With a keen eye for acquisitions and a knack for sourcing opportunities, John entered real estate with a commitment to invest back into the business.
                        </p>
                        <br />
                        <p>
                            The journey was one of bootstrapping, where each step forward was a lesson in sourcing, acquiring, and operating the acquired assets. This quickly led to rapid growth over a two-year period, where they would purchase RV parks and more multifamily properties, such as a 40-unit townhouse community on Cape Cod.
                        </p>
                    </div>
                </div>
                {/* Recent Articles */}
                <div className="recent-section">

                    <div className="section-header">
                        <div className="section-text">
                            <div className="section-title">Recent Articles</div>
                            <div className="section-subtitle">
                                Newest update article from AyEstate
                            </div>
                        </div>
                        <div className="section-action">
                            <button className="view-btn btn btn-outline-dark" onClick={handleReadMore}>View All</button>
                        </div>
                    </div>

                    <div className="recent-list">

                        <div className="recent-card">
                            <div className="recent-image">
                                <img src={Image13} alt="" />
                            </div>
                            <div className="recent-meta">
                                <div className="recent-date">2 Feb 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="recent-category">Invest Strategies</div>
                            </div>
                            <div className="recent-title">
                                15 Reasons Why Real Estate is the Best Investment
                            </div>
                        </div>

                        <div className="recent-card">
                            <div className="recent-image">
                                <img src={Image13} alt="" />
                            </div>
                            <div className="recent-meta">
                                <div className="recent-date">2 Feb 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="recent-category">Invest Strategies</div>
                            </div>
                            <div className="recent-title">
                                Renters Are Still Moving—These Markets Are Where You Should Be Investing
                            </div>
                        </div>

                        <div className="recent-card">
                            <div className="recent-image">
                                <img src={Image13} alt="" />
                            </div>
                            <div className="recent-meta">
                                <div className="recent-date">2 Feb 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="recent-category">Invest Strategies</div>
                            </div>
                            <div className="recent-title">
                                Every Major U.S. City Where It’s More Expensive to Rent Than Buy
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <End />
        </div>
    )
};

export default Detail;    