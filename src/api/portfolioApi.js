// URL from Google Apps Script deployment
const API_URL = 'https://script.google.com/macros/s/AKfycbzsOHz5P2I3OjNrsH-oFwYGaLOR8SzOjyxZota1K89EEHbZV23B31bwjKWK4K-AgwmL/exec';

// Default data (fallback jika API error)
export const DEFAULT_DATA = {
  hero: {
    buttons: [
      { text: "resume.pdf", url: "#" },
      { text: "portfolio.pdf", url: "#" }
    ]
  },
  about: {
    description: "Hi, I'm",
    highlightName: "Toriq As Syarif",
    descriptionAfter: "...",
    stats: [
      { value: "2+", label: "Years Career" },
      { value: "23", label: "Certifications" },
      { value: "4", label: "Achievements" },
      { value: "30+", label: "Projects" }
    ]
  },
  skills: [],
  achievements: { items: [], link: "#" },
  licenses: { items: [], link: "#" },
  contact: {
    socials: [],
    map: { title: "", src: "" }
  }
};

// Fetch data dari Google Sheets API
export const fetchPortfolioData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    // Check if there's an error in response
    if (data.error) {
      console.error('API Error:', data.error);
      return DEFAULT_DATA;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return DEFAULT_DATA;
  }
};