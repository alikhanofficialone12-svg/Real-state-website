import React from "react";
import Header from "../components/header";
import homeImage from "../assets/image.png";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image2 from "../assets/image copy 2.png";
import Image3 from "../assets/image copy 3.png";
import Image4 from "../assets/image copy.png";
import Card from "../components/card";
import { IoMdStar } from "react-icons/io";
import Image6 from "../assets/image copy 5.png";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import BeforeEnd from "../components/before-end";
import End from "../components/end";
import Card4 from "../components/card4";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/db";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        // Get ALL products from firestore
        const querySnapshot = await getDocs(
          collection(db, "products")
        );

        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsArray);

      } catch (error) {

        console.log("Error fetching products:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);
  return (
    <div>
      <div className="home-part-1">
        <Header />
        <div className="home-part-1-content">
          <div className="home-part-1-content-1">
            <h1>Discover Your Dream Home Today</h1>
            <p>
              Find the perfect property that suits your lifestyle. Our real estate service offers unique selling propositions that set us apart from the competition. Find your perfect home today!
            </p>
            <div className="home-part-1-content-1-buttons">
              <button className="explore-button">Explore Now</button>
              <button className="learn-more-button">Learn More</button>
            </div>
          </div>
          <div className="home-part-1-content-2">
            <img src={homeImage} alt="Home" />
          </div>
        </div>
      </div>
      <div className="home-part-2">
        <div className="home-part-2-content-1">
          <div className="home-part-2-content-1-1">
            <div className="home-part-2-content-1-1-1">
              Discover
            </div>
            <div className="home-part-2-content-1-1-2">
              Find Your Dream Property with Us
            </div>
          </div>
          <div className="home-part-2-content-1-2">
            <p>
              At our real estate agency, we offer a range of services to help you with your property needs. Whether you're looking to buy, sell, or get a valuation, our experienced team is here to assist you every step of the way.
            </p>
          </div>
        </div>
        <div className="home-part-2-content-2">
          <div className="home-part-2-content-2-1">
            <div className="home-part-2-content-2-1-1">
              <IoDocumentTextOutline />
            </div>
            <div className="home-part-2-content-2-1-2">
              Property Buying and Selling
            </div>
            <div className="home-part-2-content-2-1-3">
              <p>
                We provide expert guidance for buying and selling properties, ensuring a smooth and successful transaction.
              </p>
            </div>
          </div>
          <div className="home-part-2-content-2-1">
            <div className="home-part-2-content-2-1-1">
              <IoDocumentTextOutline />
            </div>
            <div className="home-part-2-content-2-1-2">
              Property Valuation Services
            </div>
            <div className="home-part-2-content-2-1-3">
              <p>
                Our team of certified appraisers offers accurate property valuations to help you make informed decisions.
              </p>
            </div>
          </div>
          <div className="home-part-2-content-2-1">
            <div className="home-part-2-content-2-1-1">
              <IoDocumentTextOutline />
            </div>
            <div className="home-part-2-content-2-1-2">
              Real Estate Investment Advice
            </div>
            <div className="home-part-2-content-2-1-3">
              <p>
                Get expert advice on real estate investment strategies to maximize your returns.
              </p>
            </div>
          </div>
        </div>
        <div className="home-part-2-content-3">
          <button className="learn-more-button" style={{ backgroundColor: "#B7E08A", borderColor: "transparent" }}>Learn More</button>
          <button className="contact-button">
            Contact <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
      <div className="home-part-3">
        <div className="home-part-3-content-1">
          <div className="home-part-3-content-1-1">
            Simplify
          </div>
          <div className="home-part-3-content-1-2">
            Streamline Your Property Buying or Selling Process
          </div>
          <div className="home-part-3-content-1-3">
            <p>
              Our website provides a step-by-step guide to help you seamlessly navigate the process of buying or selling property. From finding the perfect property to closing the deal, we've got you covered
            </p>
          </div>
        </div>
        <div className="home-part-3-content-2">
          <div className="home-part-3-content-2-1">
            <div className="home-part-3-content-2-1-1">
              <img src={Image2} alt="" />
            </div>
            <div className="home-part-3-content-2-1-2">
              Find Your Dream Property
            </div>
            <div className="home-part-3-content-2-1-3">
              <p>
                Browse through a wide selection of properties that match your preferences and requirements.
              </p>
            </div>
          </div>
          <div className="home-part-3-content-2-1">
            <div className="home-part-3-content-2-1-1">
              <img src={Image3} alt="" />
            </div>
            <div className="home-part-3-content-2-1-2">
              Connect with Trusted Agents
            </div>
            <div className="home-part-3-content-2-1-3">
              <p>
                Our platform connects you with experienced and reliable real estate agents who will guide you through the process.
              </p>
            </div>
          </div>
          <div className="home-part-3-content-2-1">
            <div className="home-part-3-content-2-1-1">
              <img src={Image4} alt="" />
            </div>
            <div className="home-part-3-content-2-1-2">
              Negotiate and Close the Deal
            </div>
            <div className="home-part-3-content-2-1-3">
              <p>
                Our experts will assist you in negotiating the best terms and ensuring a smooth closing process
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-part-4">
        <div className="home-part-4-content-1">
          <div className="home-part-4-content-1-1">
            <div className="home-part-4-content-1-1-1">Innovative</div>
            <div className="home-part-4-content-1-1-2">Transforming the Real Estate Industry with Excellence</div>
          </div>
          <div className="home-part-4-content-1-2">
            <p className="home-part-4-content-1-2-1">At our company, we take pride in our exceptional success rate, having listed thousands of properties, and ensuring client satisfaction is our top priority.</p>
            <button className="learn-more-button" style={{ backgroundColor: "#B7E08A", borderColor: "transparent" }}>Learn More</button>
          </div>
        </div>
        <div className="home-part-4-content-2">
          <div className="home-part-4-content-2-1">
            <div className="home-part-4-content-2-1-1">
              <h1>30%</h1>
              <div className="home-part-4-content-2-1-1-2">Success Rate</div>
            </div>
          </div>
          <div className="home-part-4-content-2-1">
            <div className="home-part-4-content-2-1-1">
              <h1>30%</h1>
              <div className="home-part-4-content-2-1-1-2">Properties Listed</div>
            </div>
          </div>
          <div className="home-part-4-content-2-1">
            <div className="home-part-4-content-2-1-1">
              <h1>30%</h1>
              <div className="home-part-4-content-2-1-1-2">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-part-5">
        <div className="home-part-5-content-1">
          <div className="home-part-5-content-1-1">
            Find
          </div>
          <div className="home-part-5-content-1-2">
            Properties
          </div>
          <div className="home-part-5-content-1-3">
            Explore our curated list of properties and find your dream home.
          </div>
        </div>
        <div className="home-part-5-content-2">
          {/* Products */}
          <div className="product">
            {loading ? (

              <div className="text-center w-100">
                Loading products...
              </div>

            ) : products.length > 0 ? (

              products.map((item) => (
                <Card4
                  key={item.id}
                  name={item.title}
                  type={item.category}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  date={item.Date}
                />
              ))

            ) : (

              <div className="text-center w-100 text-muted">
                No products found.
              </div>

            )}
          </div>
        </div>
      </div>
      <div className="home-part-6">
        <div className="home-part-6-content-1">
          Customer Testimonials
        </div>
        <div className="home-part-6-content-2">
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
        </div>
        <div className="home-part-6-content-3">
          Our experience with this real estate website design has been nothing short of amazing. The team was professional, responsive, and delivered beyond our expectations.
        </div>
        <div className="home-part-6-content-4">
          <div className="home-part-6-content-4-1">
            <img src={Image6} alt="" />
          </div>
          <div className="home-part-6-content-4-2">
            <div className="home-part-6-content-4-2-1">
              Jhon Doe
            </div>
            <div className="home-part-6-content-4-2-2">
              CEO, Company
            </div>
          </div>
        </div>
      </div>
      <div className="home-part-7">
        <div className="home-part-7-content-1">
          <div className="home-part-7-content-1-1">
            FAQ
          </div>
          <div className="home-part-7-content-1-2">
            Frequently Asked Question
          </div>
          <div className="home-part-7-content-1-3">
            Did you find the question as you expected?
          </div>
        </div>
        <div className="home-part-7-content-2">
          <div className="home-part-7-content-2-1">
            <div className="home-part-7-content-2-1-1">
              <div className="home-part-7-content-2-1-1-1">
                <div className="home-part-7-content-2-1-1-1-1">
                  How many steps to get a job?
                </div>
                <div className="home-part-7-content-2-1-1-1-2">
                  <FiMinus />
                </div>
              </div>
              <div className="home-part-7-content-2-1-1-2">
                Et lectus viverra aenean malesuada praesent. Egestas praesent quam auctor amet ac, ac vel. Euismod proin massa feugiat gravida tellus auctor ac, vitae justo.
              </div>
              <div className="home-part-7-content-2-1-1-3">
                Read More
              </div>
            </div>
            <div className="home-part-7-content-2-1-2">
              <div className="home-part-7-content-2-1-2-1">
                What do we need to apply for a job?
              </div>
              <div className="home-part-7-content-2-1-2-2">
                <FaPlus />
              </div>
            </div>
          </div>
          <div className="home-part-7-content-2-2">
            <div className="home-part-7-content-2-2-1">
              <div className="home-part-7-content-2-2-1-1">
                Do we get cv from jobify?
              </div>
              <div className="home-part-7-content-2-2-1-2">
                <FaPlus />
              </div>
            </div>
            <div className="home-part-7-content-2-2-1">
              <div className="home-part-7-content-2-2-1-1">
                Can we reschedule the interview meeting?
              </div>
              <div className="home-part-7-content-2-2-1-2">
                <FaPlus />
              </div>
            </div>
            <div className="home-part-7-content-2-2-1">
              <div className="home-part-7-content-2-2-1-1">
                Can we apply for all jobs?
              </div>
              <div className="home-part-7-content-2-2-1-2">
                <FaPlus />
              </div>
            </div>
          </div>
        </div>
        <div className="home-part-7-content-3">
          <button className="explore-button">Give a Quote</button>
        </div>
      </div>
      <BeforeEnd />
      <End />
    </div>
  );
}

export default Home;