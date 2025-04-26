"use client"

import { useState, useEffect } from "react"
import "./App.css"
import { BookOpen, Map, Home, User, Video, Menu, X, ExternalLink, Play } from "lucide-react"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  // Modal states
  const [imageModal, setImageModal] = useState({ isOpen: false, src: "", alt: "" })
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoId: "" })
  const [cardModal, setCardModal] = useState({ isOpen: false, content: null })

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const openImageModal = (src, alt) => {
    setImageModal({ isOpen: true, src, alt })
    document.body.style.overflow = "hidden"
  }

  const closeImageModal = () => {
    setImageModal({ isOpen: false, src: "", alt: "" })
    document.body.style.overflow = "auto"
  }

  const openVideoModal = (videoId) => {
    setVideoModal({ isOpen: true, videoId })
    document.body.style.overflow = "hidden"
  }

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoId: "" })
    document.body.style.overflow = "auto"
  }

  const openCardModal = (content) => {
    setCardModal({ isOpen: true, content })
    document.body.style.overflow = "hidden"
  }

  const closeCardModal = () => {
    setCardModal({ isOpen: false, content: null })
    document.body.style.overflow = "auto"
  }

  return (
    <div className="app">

      <header className="header">
        <div className="logo">Journey & Pages</div>
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
              <Home size={18} />
              <span>Home</span>
            </li>
            <li className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>
              <User size={18} />
              <span>About Me</span>
            </li>
            <li className={activeTab === "books" ? "active" : ""} onClick={() => setActiveTab("books")}>
              <BookOpen size={18} />
              <span>Book Notes</span>
            </li>
            <li className={activeTab === "travel" ? "active" : ""} onClick={() => setActiveTab("travel")}>
              <Map size={18} />
              <span>Travel Diaries</span>
            </li>
            <li className={activeTab === "vlogs" ? "active" : ""} onClick={() => setActiveTab("vlogs")}>
              <Video size={18} />
              <span>Vlogs</span>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {activeTab === "home" && (
          <HomePage openImageModal={openImageModal} openCardModal={openCardModal} openVideoModal={openVideoModal} />
        )}
        {activeTab === "about" && <AboutPage openImageModal={openImageModal} />}
        {activeTab === "books" && <BooksPage openCardModal={openCardModal} />}
        {activeTab === "travel" && <TravelPage openImageModal={openImageModal} openCardModal={openCardModal} />}
        {activeTab === "vlogs" && <VlogsPage openVideoModal={openVideoModal} />}
      </main>

      <footer>
        <p>© 2025 Journey & Pages | Remote Bookkeeper & Travel Enthusiast</p>
        <div className="social-links">
          <a href="#" className="social-link">
            Instagram
          </a>
          <a href="#" className="social-link">
            YouTube
          </a>
          <a href="#" className="social-link">
            LinkedIn
          </a>
        </div>
      </footer> 

      {/* Image Modal */}
      {imageModal.isOpen && (
        <div className="modal-overlay" onClick={closeImageModal}>
          <div className="modal-content image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImageModal}>
              <X size={24} />
            </button>
            <img src={imageModal.src || "/placeholder.svg"} alt={imageModal.alt} className="modal-image" />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div className="modal-overlay" onClick={closeVideoModal}>
          <div className="modal-content video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVideoModal}>
              <X size={24} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoModal.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {cardModal.isOpen && (
        <div className="modal-overlay" onClick={closeCardModal}>
          <div className="modal-content card-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCardModal}>
              <X size={24} />
            </button>
            {cardModal.content}
          </div>
        </div>
      )}
    </div>
  )
}

const HomePage = ({ openImageModal, openCardModal, openVideoModal }) => {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mount
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 2000); // 2 seconds as requested

    return () => clearTimeout(timer);
  }, []);

  const bookReviewContent = (
    <div className="modal-article">
      <h2>Do more of what makes you happy by Andy Bon</h2>
      <div className="modal-article-meta">
        <span>Published: January 15, 2025</span>
        <span>Reading Time: 8 minutes</span>
      </div>
      <img src="/images/andybon.jpg" alt="The Midnight Library" className="modal-article-image" />
      <div className="modal-article-content">
        <p>
          Between life and death there is a library, and within that library, the shelves go on forever. Every book
          provides a chance to try another life you could have lived. To see how things would be if you had made other
          choices...
        </p>
        <p>
          Matt Haig's novel explores the concept of regret and the infinite possibilities our lives could take through
          the story of Nora Seed, who finds herself in the Midnight Library after attempting to end her life.
        </p>
        <h3>Key Themes</h3>
        <ul>
          <li>The nature of regret and possibility</li>
          <li>Depression and mental health</li>
          <li>The butterfly effect of our choices</li>
          <li>Finding meaning in life</li>
        </ul>
        <p>
          What makes this book particularly impactful is how it resonated with my own journey through different
          countries and life paths. As someone who has chosen an unconventional lifestyle, I often wonder about the
          roads not taken.
        </p>
        <div className="rating-section">
          <h3>My Rating: 4.5/5</h3>
          <div className="stars">★★★★½</div>
        </div>
      </div>
    </div>
  );

  const travelArticleContent = (
    <div className="modal-article">
      <h2>You are capable of amazing things ( Japan travel )</h2>
      <div className="modal-article-meta">
        <span>Published: March 20, 2025</span>
        <span>Reading Time: 6 minutes</span>
      </div>
      <img src="/images/andybon1.jpg" alt="Prague Cafe" className="modal-article-image" />
      <div className="modal-article-content">
        <p>
          Japan is known for its stunning architecture and rich history, but hidden within its winding streets are
          charming cafés that offer both excellent coffee and perfect remote work environments.
        </p>
        <h3>My Top 3 Discoveries</h3>
        <h4>1. Café Louvre</h4>
        <p>
          A historic café frequented by Franz Kafka and Albert Einstein, Café Louvre offers high ceilings, plenty of
          natural light, and reliable WiFi. The apple strudel is a must-try!
        </p>
        <h4>2. Café Savoy</h4>
        <p>
          With its Neo-Renaissance ceiling from 1893 and elegant atmosphere, this café provides a luxurious environment
          for both work and relaxation. Their breakfast menu is exceptional.
        </p>
        <h4>3. EMA Espresso Bar</h4>
        <p>
          For serious coffee enthusiasts, EMA offers some of the best specialty coffee in Prague. The minimalist design
          creates a distraction-free work environment.
        </p>
        <p>
          Working from these cafés allowed me to immerse myself in local culture while maintaining my productivity as a
          remote bookkeeper. The change of scenery inspired new perspectives on both my work and personal projects.
        </p>
      </div>
    </div>
  );

  const vlogArticleContent = (
    <div className="modal-article">
      <h2>Working Remotely from Bali: A Day in My Life</h2>
      <div className="modal-article-meta">
        <span>Published: February 5, 2025</span>
        <span>Video Length: 12:45</span>
      </div>
      <div className="modal-video-container">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="modal-article-content">
        <p>
          In this vlog, I take you through a typical workday as a remote bookkeeper in Bali, Indonesia. From my morning
          routine at a beachside villa to my favorite coworking space in Canggu.
        </p>
        <h3>Video Highlights</h3>
        <ul>
          <li>
            <strong>07:15</strong> - Morning meditation and beach walk
          </li>
          <li>
            <strong>09:30</strong> - Setting up at Tropical Nomad Coworking
          </li>
          <li>
            <strong>12:45</strong> - Lunch break at a local warung
          </li>
          <li>
            <strong>15:20</strong> - Client Zoom meetings
          </li>
          <li>
            <strong>18:00</strong> - Sunset yoga session
          </li>
        </ul>
        <p>
          The digital nomad community in Bali has been incredibly welcoming and supportive. Through coworking spaces and
          networking events, I've connected with professionals from various industries, expanding both my personal and
          professional horizons.
        </p>
      </div>
    </div>
  );

  return (
    <div className="page home-page">

      <div className="brand-header">
        <div className={`welcome-animation-container ${showTagline ? 'show-tagline' : ''}`}>
          <div className="name-container">
            <div className="andy-container">
              <h1 className="big-text">ANDY</h1>
              <h2 className="small-text">Hi, I'm</h2>
            </div>
            <div className="bon-container">
              <h1 className="big-text">BON</h1>
            </div>
          </div>
          
          <div className="tagline-container">
            <h1 className="tagline">
              LET'S MAKE SOMETHING SPECIAL AND HAVE A LITTLE FUN ALONG THE WAY
            </h1>
          </div>
        </div>
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <div className="hero">
        <img
          src="/images/andybon.jpg"
          alt="Travel & Books Hero"
          className="hero-image"
          onClick={() => openImageModal("/images/andybon.jpg", "Travel & Books Hero")}
        />
        <div className="hero-overlay">
          <h1 className="animated-text">Welcome to my World of Books & Travel</h1>
          <p className="animated-text-delay">Exploring pages and places, one journey at a time</p>
        </div>
      </div>

      <section className="featured-content">
        <div className="featured-card" onClick={() => openCardModal(bookReviewContent)}>
          <img src="/images/andybon.jpg" alt="Latest Book Review" />
          <div className="card-content">
            <h3>Latest Book Review</h3>
            <p>My thoughts on "The Midnight Library" by Matt Haig</p>
            <button className="btn">Read More</button>
          </div>
          <div className="card-hover-info">
            <span className="icon">↗</span>
            <span>View Full Article</span>
          </div>
        </div>

        <div className="featured-card" onClick={() => openCardModal(travelArticleContent)}>
          <img src="/images/andybon1.jpg" alt="Recent Travel" />
          <div className="card-content">
            <h3>Recent Adventure</h3>
            <p>Exploring hidden cafés in Prague's historic center</p>
            <button className="btn">See Photos</button>
          </div>
          <div className="card-hover-info">
            <span className="icon">↗</span>
            <span>View Full Article</span>
          </div>
        </div>

        <div className="featured-card" onClick={() => openCardModal(vlogArticleContent)}>
          <img src="/images/andybon2.jpg" alt="Latest Vlog" />
          <div className="card-content">
            <h3>Latest Vlog</h3>
            <p>Working remotely from a beachside villa in Bali</p>
            <button className="btn">Watch Now</button>
          </div>
          <div className="card-hover-info">
            <span className="icon">▶</span>
            <span>Watch Video</span>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <h2 className="glow-text">Stay Updated</h2>
        <p>Subscribe to my newsletter for book recommendations and travel tips</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your email address" className="animated-input" />
          <button className="btn pulse-btn">Subscribe</button>
        </div>
      </section>
    </div>
  );
};


const AboutPage = ({ openImageModal }) => (
  <div className="page about-page">
    <h1 className="page-title">About Me</h1>
    <div className="about-content">
      <div className="about-image">
        <img
          src="/images/andybon3.jpg"
          alt="Profile"
          onClick={() => openImageModal("/images/andybon.jpg", "Profile")}
          className="clickable-image"
        />
        <div className="image-overlay">
          <div className="zoom-icon">🔍</div>
        </div>
      </div>
      <div className="about-text">
        <p className="highlight-text">
          Hello! I'm a remote bookkeeper with a passion for literature and an insatiable wanderlust. My professional
          life involves balancing numbers, while my personal journey revolves around balancing the masculine and
          feminine energies that make me who I am.
        </p>

        <p>
          By day, I help businesses keep their finances in order, working remotely from wherever my travels take me.
          This flexibility has allowed me to explore over 25 countries in the past five years, each leaving their unique
          imprint on my soul.
        </p>

        <p>
          Books have been my constant companions throughout life's journey. From classic literature to contemporary
          fiction, I find comfort and inspiration between the pages. Through this blog, I share my thoughts on the books
          that have shaped my perspectives.
        </p>

        <p>
          My style and approach to life embrace both traditionally masculine and feminine elements – structured yet
          flowing, analytical yet intuitive. This duality influences everything from my fashion choices to how I
          decorate my temporary homes around the world.
        </p>

        <h3 className="animated-underline">Professional Background</h3>
        <p>
          With over 8 years of experience in bookkeeping and financial management, I've worked with clients across
          various industries. Remote work has been my lifestyle choice for the past 5 years, allowing me to combine my
          career with my love for exploration.
        </p>
      </div>
    </div>
  </div>
)

const BooksPage = ({ openCardModal }) => {
  const bookDetails = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: "★★★★☆",
      excerpt:
        "A thought-provoking exploration of the infinite possibilities our lives could take, discovered while traveling through Northern Europe...",
      cover: "/images/andybon.jpg",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      rating: "★★★★★",
      excerpt:
        "A practical guide to building good habits and breaking bad ones, which helped me establish routines while constantly on the move...",
      cover: "/images/andybon.jpg",
    },
    {
      title: "Educated",
      author: "Tara Westover",
      rating: "★★★★☆",
      excerpt:
        "A memoir about the transformative power of education, which resonated with my own journey of self-discovery through travel...",
      cover: "/images/andybon.jpg",
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      rating: "★★★★★",
      excerpt:
        "A fascinating look at human history that changed my perspective during my travels through historical sites in the Middle East...",
      cover: "/images/andybon.jpg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      rating: "★★★★☆",
      excerpt:
        "A spiritual fable about following your dreams that inspired me to take the leap into full-time travel and remote work...",
      cover: "/images/andybon.jpg",
    },
    {
      title: "Digital Minimalism",
      author: "Cal Newport",
      rating: "★★★★☆",
      excerpt:
        "A thoughtful examination of our relationship with technology that helped me balance connectivity with presence during my travels...",
      cover: "/images/andybon.jpg",
    },
  ]

  const generateBookModal = (book) => (
    <div className="modal-article">
      <h2>{book.title}</h2>
      <div className="modal-article-meta">
        <span>Author: {book.author}</span>
        <span>Rating: {book.rating}</span>
      </div>
      <img src={book.cover || "/placeholder.svg"} alt={book.title} className="modal-article-image" />
      <div className="modal-article-content">
        <p>{book.excerpt}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <h3>Key Takeaways</h3>
        <ul>
          <li>Important insight from the book</li>
          <li>Another valuable lesson</li>
          <li>How this book influenced my perspective</li>
          <li>Practical applications in daily life</li>
        </ul>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="rating-section">
          <h3>My Rating: {book.rating}</h3>
          <p>
            Would I recommend this book? <strong>Absolutely!</strong>
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page books-page">
      <h1 className="page-title">Book Notes & Reviews</h1>

      <div className="book-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Fiction</button>
        <button className="filter-btn">Non-Fiction</button>
        <button className="filter-btn">Travel Memoirs</button>
        <button className="filter-btn">Business</button>
      </div>

      <div className="books-grid">
        {bookDetails.map((book, index) => (
          <div className="book-card fade-in-card" key={index} onClick={() => openCardModal(generateBookModal(book))}>
            <div className="book-cover">
              <img src={book.cover || "/placeholder.svg"} alt={`Book cover ${book.title}`} />
              <div className="book-hover-effect">
                <ExternalLink size={24} />
                <span>Read Review</span>
              </div>
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <div className="rating">{book.rating}</div>
              <p className="excerpt">{book.excerpt}</p>
              <button className="btn">Read Review</button>
            </div>
          </div>
        ))}
      </div>

      <div className="reading-now">
        <h2 className="glow-text">Currently Reading</h2>
        <div className="current-book">
          <img src="/images/andybon.jpg" alt="Current book" />
          <div>
            <h3 className="animated-underline">Atomic Habits</h3>
            <p>by James Clear</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "65%" }}>
                65%
              </div>
            </div>
            <p>My thoughts so far: This book is transforming how I approach daily routines, even as I travel!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const TravelPage = ({ openImageModal, openCardModal }) => {
  const travelImages = [
    { src: "/images/andybon.jpg", alt: "City skyline" },
    { src: "/images/andybon.jpg", alt: "Street scene" },
    { src: "/images/andybon.jpg", alt: "Cafe" },
    { src: "/images/andybon.jpg", alt: "Bookstore" },
    { src: "/images/andybon.jpg", alt: "Sunset view" },
  ]

  const generateTravelModal = (title, date) => (
    <div className="modal-article">
      <h2>{title}</h2>
      <div className="modal-article-meta">
        <span>Dates: {date}</span>
        <span>Location: Prague, Czech Republic</span>
      </div>
      <div className="modal-gallery">
        {travelImages.map((img, i) => (
          <img key={i} src={img.src || "/placeholder.svg"} alt={img.alt} className="modal-gallery-image" />
        ))}
      </div>
      <div className="modal-article-content">
        <p>
          Finding the perfect balance between work and exploration can be challenging, but Prague offered the ideal
          setting. With its abundant cafés, reliable WiFi, and incredible atmosphere, my productivity soared while still
          leaving plenty of time for adventure.
        </p>

        <p>
          Mornings were spent in a quaint café near the Old Town Square, where I'd handle my bookkeeping clients' needs
          while sipping excellent Czech coffee. Afternoons involved wandering through the winding streets, discovering
          hidden bookshops with treasures in multiple languages.
        </p>

        <h3>Favorite Discoveries:</h3>
        <ul>
          <li>A tiny bookstore with an exceptional English language section near Charles Bridge</li>
          <li>The perfect work-friendly café with window seats overlooking a quiet courtyard</li>
          <li>An excellent local restaurant serving traditional Czech cuisine with a modern twist</li>
        </ul>

        <h3>Remote Work Setup</h3>
        <p>
          During my stay in Prague, I established a routine that allowed me to maintain productivity while still
          enjoying the city:
        </p>
        <ul>
          <li>
            <strong>Morning:</strong> 3-4 hours of focused work at a café
          </li>
          <li>
            <strong>Afternoon:</strong> Exploration and photography
          </li>
          <li>
            <strong>Evening:</strong> 1-2 hours of client communication and planning
          </li>
        </ul>

        <p>
          This balance allowed me to meet all my professional obligations while immersing myself in the local culture
          and creating memories that will last a lifetime.
        </p>
      </div>
    </div>
  )

  return (
    <div className="page travel-page">
      <h1 className="page-title">Travel Diaries</h1>

      <div className="travel-map">
        <img
          src="/images/andybon.jpg"
          alt="World map with pins"
          className="map-image clickable-image"
          onClick={() => openImageModal("/images/andybon.jpg", "World map with pins")}
        />
        <p>Interactive map coming soon! Explore all the places I've visited.</p>
      </div>

      <div className="travel-entries">
        <div className="travel-entry fade-in-card">
          <div className="travel-images">
            <img
              src="/images/andybon.jpg"
              alt="City skyline"
              onClick={() => openImageModal("/images/andybon.jpg", "City skyline")}
              className="clickable-image"
            />
            <div className="image-grid">
              {travelImages.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  onClick={() => openImageModal(img.src, img.alt)}
                  className="clickable-image"
                />
              ))}
            </div>
          </div>

          <div className="travel-content">
            <h2 className="animated-underline">A Week in Prague: Working Remotely Between Gothic Spires</h2>
            <p className="travel-date">March 12-19, 2025</p>

            <p className="highlight-text">
              Finding the perfect balance between work and exploration can be challenging, but Prague offered the ideal
              setting. With its abundant cafés, reliable WiFi, and incredible atmosphere, my productivity soared while
              still leaving plenty of time for adventure.
            </p>

            <p>
              Mornings were spent in a quaint café near the Old Town Square, where I'd handle my bookkeeping clients'
              needs while sipping excellent Czech coffee. Afternoons involved wandering through the winding streets,
              discovering hidden bookshops with treasures in multiple languages.
            </p>

            <h3>Favorite Discoveries:</h3>
            <ul className="animated-list">
              <li>A tiny bookstore with an exceptional English language section near Charles Bridge</li>
              <li>The perfect work-friendly café with window seats overlooking a quiet courtyard</li>
              <li>An excellent local restaurant serving traditional Czech cuisine with a modern twist</li>
            </ul>

            <button
              className="btn pulse-btn"
              onClick={() =>
                openCardModal(
                  generateTravelModal("A Week in Prague: Working Remotely Between Gothic Spires", "March 12-19, 2025"),
                )
              }
            >
              Read Full Travel Diary
            </button>
          </div>
        </div>

        <div className="travel-entry fade-in-card">
          <div className="travel-images">
            <img
              src="/images/andybon.jpg"
              alt="Beach view"
              onClick={() => openImageModal("/images/andybon.jpg", "Beach view")}
              className="clickable-image"
            />
            <div className="image-grid">
              <img
                src="/images/andybon.jpg"
                alt="Remote workspace"
                onClick={() => openImageModal("/images/andybon.jpg", "Remote workspace")}
                className="clickable-image"
              />
              <img
                src="/images/andybon.jpg"
                alt="Beach sunset"
                onClick={() => openImageModal("/images/andybon.jpg", "Beach sunset")}
                className="clickable-image"
              />
              <img
                src="/images/andybon.jpg"
                alt="Local market"
                onClick={() => openImageModal("/images/andybon.jpg", "Local market")}
                className="clickable-image"
              />
              <img
                src="/images/andybon.jpg"
                alt="Beachside reading"
                onClick={() => openImageModal("/images/andybon.jpg", "Beachside reading")}
                className="clickable-image"
              />
            </div>
          </div>

          <div className="travel-content">
            <h2 className="animated-underline">Remote Work Paradise: Bali's Digital Nomad Scene</h2>
            <p className="travel-date">January 5-30, 2025</p>

            <p className="highlight-text">
              Starting the year in Bali proved to be exactly what I needed. The combination of beautiful surroundings,
              affordable living, and excellent coworking spaces created the perfect environment for balancing my
              bookkeeping work with relaxation and exploration.
            </p>

            <p>
              I joined a local coworking space in Canggu, which introduced me to other digital nomads from around the
              world. Between client meetings and financial reports, I found time to explore local temples, take
              batik-making classes, and read several books while lounging on the beach.
            </p>

            <button
              className="btn pulse-btn"
              onClick={() =>
                openCardModal(
                  generateTravelModal("Remote Work Paradise: Bali's Digital Nomad Scene", "January 5-30, 2025"),
                )
              }
            >
              Read Full Travel Diary
            </button>
          </div>
        </div>
      </div>

      <div className="travel-tips">
        <h2 className="glow-text">Travel Tips for Remote Workers</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>Essential Tech Setup</h3>
            <p>My go-to gadgets and apps for maintaining productivity anywhere in the world.</p>
            <button className="btn-small">Read More</button>
            <div className="card-hover-effect">
              <span>View Tips</span>
            </div>
          </div>
          <div className="tip-card">
            <h3>Finding Work-Friendly Accommodations</h3>
            <p>How I research and select places with reliable internet and comfortable workspaces.</p>
            <button className="btn-small">Read More</button>
            <div className="card-hover-effect">
              <span>View Tips</span>
            </div>
          </div>
          <div className="tip-card">
            <h3>Managing Client Relationships Across Time Zones</h3>
            <p>Communication strategies that keep my bookkeeping clients happy while I travel.</p>
            <button className="btn-small">Read More</button>
            <div className="card-hover-effect">
              <span>View Tips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const VlogsPage = ({ openVideoModal }) => {
  // Sample YouTube video IDs
  const videoIds = [
    "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    "jNQXAC9IVRw",
    "9bZkp7q19f0",
    "kJQP7kiw5Fk",
    "FTQbiNvZqaY",
    "fJ9rUzIMcZQ",
  ]

  return (
    <div className="page vlogs-page">
      <h1 className="page-title">Video Journals</h1>

      <div className="featured-vlog">
        <div className="video-container" onClick={() => openVideoModal(videoIds[0])}>
          <img src="/images/andybon.jpg" alt="Video thumbnail" className="video-placeholder" />
          <div className="play-button">
            <Play size={40} />
          </div>
          <div className="video-duration">12:45</div>
        </div>
        <h2 className="animated-underline">A Day in My Life: Remote Bookkeeping from Bali</h2>
        <p className="highlight-text">
          Follow along as I balance client work with beach time and local exploration in my temporary home office with
          an ocean view.
        </p>
      </div>

      <div className="vlogs-grid">
        {videoIds.map((videoId, index) => (
          <div className="vlog-card fade-in-card" key={index} onClick={() => openVideoModal(videoId)}>
            <div className="video-thumbnail">
              <img src={`/images/andybon.jpg`} alt={`Video thumbnail ${index + 1}`} />
              <div className="play-button-small">
                <Play size={24} />
              </div>
              <div className="video-duration">8:12</div>
            </div>
            <h3>Vlog Title Goes Here</h3>
            <p className="vlog-date">March 15, 2025</p>
            <p className="vlog-excerpt">
              Short description of this vlog episode highlighting both travel and either books or remote work
              experiences.
            </p>
          </div>
        ))}
      </div>

      <div className="vlog-playlists">
        <h2 className="glow-text">Playlists</h2>
        <div className="playlist-cards">
          <div className="playlist-card">
            <img src="/images/andybon.jpg" alt="Playlist thumbnail" />
            <div className="playlist-overlay">
              <div className="playlist-count">12 videos</div>
              <div className="playlist-icon">
                <Play size={24} />
              </div>
            </div>
            <h3>Bookstore Tours Around the World</h3>
            <p>12 videos</p>
          </div>
          <div className="playlist-card">
            <img src="/images/andybon.jpg" alt="Playlist thumbnail" />
            <div className="playlist-overlay">
              <div className="playlist-count">8 videos</div>
              <div className="playlist-icon">
                <Play size={24} />
              </div>
            </div>
            <h3>Remote Work Setup Tours</h3>
            <p>8 videos</p>
          </div>
          <div className="playlist-card">
            <img src="/images/andybon.jpg" alt="Playlist thumbnail" />
            <div className="playlist-overlay">
              <div className="playlist-count">15 videos</div>
              <div className="playlist-icon">
                <Play size={24} />
              </div>
            </div>
            <h3>Reading Vlogs From Different Countries</h3>
            <p>15 videos</p>
          </div>
          <div className="playlist-card">
            <img src="/images/andybon.jpg" alt="Playlist thumbnail" />
            <div className="playlist-overlay">
              <div className="playlist-count">6 videos</div>
              <div className="playlist-icon">
                <Play size={24} />
              </div>
            </div>
            <h3>Travel Day Routines</h3>
            <p>6 videos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
