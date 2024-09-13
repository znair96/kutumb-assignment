import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuoteCard = ({ quote }) => (
  <div className="quote-card">
    <div className="image-container">
      <img src={quote.mediaUrl} alt="Quote" className="quote-image" />
      <div className="text-overlay">
        <p>{quote.text}</p>
      </div>
    </div>
    <div className="quote-details">
      <p className="username">{quote.username}</p>
      <p className="created-at">{quote.created_at}</p>
    </div>
  </div>
);

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]); // Store fetched quotes
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const limit = 20; // Number of results per page

  // Function to fetch quotes from API
  const fetchQuotes = async (page) => {
    setLoading(true); // Show loading state
    const offset = (page - 1) * limit; // Calculate offset based on current page

    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const fetchedQuotes = response.data.data;
      setQuotes(fetchedQuotes); // Update state with fetched quotes
      setTotalPages(Math.ceil(fetchedQuotes.length / limit)); // Set total pages based on the total number of quotes
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Fetch quotes whenever the currentPage changes
  useEffect(() => {
    fetchQuotes(currentPage);
  }, [currentPage]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app">
      {quotes.map((quote, index) => (
        <QuoteCard key={index} quote={quote} />
      ))}

      {/* Pagination Controls */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="floating-button"
        onClick={() => navigate("/create-quote")}
      >
        +
      </button>
    </div>
  );
};

export default QuoteListPage;
