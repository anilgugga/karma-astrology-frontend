// astrology_data.js - Core data and constants for astrology dashboard

// Sample client data
let clients = [
    { 
        id: 1, 
        name: "Priya Sharma", 
        birthDate: "1992-03-15", 
        birthTime: "14:30",
        birthPlace: "Mumbai, India",
        sign: "Pisces", 
        status: "Active",
        email: "priya.sharma@email.com",
        phone: "+91 9876543210",
        gender: "Female",
        notes: "Interested in career guidance and relationship compatibility.",
        consultations: [
            { date: "2024-01-15", type: "Birth Chart Reading", notes: "Detailed analysis of career prospects", fee: 2500 },
            { date: "2024-02-20", type: "Compatibility Analysis", notes: "Relationship compatibility with partner", fee: 1800 }
        ]
    },
    { 
        id: 2, 
        name: "Rajesh Kumar", 
        birthDate: "1988-07-22", 
        birthTime: "09:15",
        birthPlace: "Delhi, India",
        sign: "Cancer", 
        status: "Active",
        email: "rajesh.kumar@email.com",
        phone: "+91 9876543211",
        gender: "Male",
        notes: "Business owner seeking financial guidance.",
        consultations: [
            { date: "2024-01-10", type: "Financial Prediction", notes: "Business expansion timing", fee: 3000 }
        ]
    },
    { 
        id: 3, 
        name: "Anita Patel", 
        birthDate: "1995-11-08", 
        birthTime: "18:45",
        birthPlace: "Ahmedabad, India",
        sign: "Scorpio", 
        status: "Inactive",
        email: "anita.patel@email.com",
        phone: "+91 9876543212",
        gender: "Female",
        notes: "Health concerns and remedies required.",
        consultations: [
            { date: "2023-12-05", type: "Health Analysis", notes: "Chronic health issues consultation", fee: 2200 }
        ]
    }
];

// Zodiac sign data with enhanced properties
const zodiacSigns = {
    "Aries": {
        emoji: "♈",
        element: "Fire",
        quality: "Cardinal",
        ruler: "Mars",
        luckyNumbers: [1, 8, 17],
        luckyColors: ["Red", "Orange"],
        compatibility: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
        strengths: ["Leadership", "Courage", "Enthusiasm", "Independence"],
        weaknesses: ["Impatience", "Aggression", "Impulsiveness"],
        dates: "March 21 - April 19"
    },
    "Taurus": {
        emoji: "♉",
        element: "Earth",
        quality: "Fixed",
        ruler: "Venus",
        luckyNumbers: [2, 6, 9, 12, 24],
        luckyColors: ["Green", "Pink"],
        compatibility: ["Virgo", "Capricorn", "Cancer", "Pisces"],
        strengths: ["Reliability", "Patience", "Practicality", "Devotion"],
        weaknesses: ["Stubbornness", "Possessiveness", "Materialism"],
        dates: "April 20 - May 20"
    },
    "Gemini": {
        emoji: "♊",
        element: "Air",
        quality: "Mutable",
        ruler: "Mercury",
        luckyNumbers: [5, 7, 14, 23],
        luckyColors: ["Yellow", "Blue"],
        compatibility: ["Libra", "Aquarius", "Aries", "Leo"],
        strengths: ["Adaptability", "Communication", "Curiosity", "Wit"],
        weaknesses: ["Inconsistency", "Indecision", "Superficiality"],
        dates: "May 21 - June 20"
    },
    "Cancer": {
        emoji: "♋",
        element: "Water",
        quality: "Cardinal",
        ruler: "Moon",
        luckyNumbers: [2, 7, 11, 16, 20, 25],
        luckyColors: ["White", "Silver"],
        compatibility: ["Scorpio", "Pisces", "Taurus", "Virgo"],
        strengths: ["Empathy", "Intuition", "Loyalty", "Nurturing"],
        weaknesses: ["Moodiness", "Sensitivity", "Clinginess"],
        dates: "June 21 - July 22"
    },
    "Leo": {
        emoji: "♌",
        element: "Fire",
        quality: "Fixed",
        ruler: "Sun",
        luckyNumbers: [1, 3, 10, 19],
        luckyColors: ["Gold", "Orange"],
        compatibility: ["Aries", "Sagittarius", "Gemini", "Libra"],
        strengths: ["Confidence", "Generosity", "Creativity", "Leadership"],
        weaknesses: ["Arrogance", "Stubbornness", "Self-centeredness"],
        dates: "July 23 - August 22"
    },
    "Virgo": {
        emoji: "♍",
        element: "Earth",
        quality: "Mutable",
        ruler: "Mercury",
        luckyNumbers: [6, 14, 18, 29],
        luckyColors: ["Navy Blue", "Grey"],
        compatibility: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
        strengths: ["Analytical", "Practical", "Reliable", "Hardworking"],
        weaknesses: ["Overcritical", "Perfectionism", "Worry"],
        dates: "August 23 - September 22"
    },
    "Libra": {
        emoji: "♎",
        element: "Air",
        quality: "Cardinal",
        ruler: "Venus",
        luckyNumbers: [4, 6, 13, 15, 24],
        luckyColors: ["Blue", "Green"],
        compatibility: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
        strengths: ["Diplomacy", "Balance", "Charm", "Fairness"],
        weaknesses: ["Indecision", "Avoidance", "Superficiality"],
        dates: "September 23 - October 22"
    },
    "Scorpio": {
        emoji: "♏",
        element: "Water",
        quality: "Fixed",
        ruler: "Pluto",
        luckyNumbers: [8, 11, 18, 22],
        luckyColors: ["Deep Red", "Black"],
        compatibility: ["Cancer", "Pisces", "Virgo", "Capricorn"],
        strengths: ["Intensity", "Passion", "Determination", "Loyalty"],
        weaknesses: ["Jealousy", "Secretiveness", "Vindictiveness"],
        dates: "October 23 - November 21"
    },
    "Sagittarius": {
        emoji: "♐",
        element: "Fire",
        quality: "Mutable",
        ruler: "Jupiter",
        luckyNumbers: [3, 7, 9, 15, 21],
        luckyColors: ["Purple", "Turquoise"],
        compatibility: ["Aries", "Leo", "Libra", "Aquarius"],
        strengths: ["Adventure", "Optimism", "Freedom", "Honesty"],
        weaknesses: ["Impatience", "Tactlessness", "Restlessness"],
        dates: "November 22 - December 21"
    },
    "Capricorn": {
        emoji: "♑",
        element: "Earth",
        quality: "Cardinal",
        ruler: "Saturn",
        luckyNumbers: [6, 9, 15, 18, 26],
        luckyColors: ["Brown", "Black"],
        compatibility: ["Taurus", "Virgo", "Scorpio", "Pisces"],
        strengths: ["Ambition", "Discipline", "Responsibility", "Patience"],
        weaknesses: ["Pessimism", "Stubbornness", "Materialism"],
        dates: "December 22 - January 19"
    },
    "Aquarius": {
        emoji: "♒",
        element: "Air",
        quality: "Fixed",
        ruler: "Uranus",
        luckyNumbers: [4, 7, 11, 22, 29],
        luckyColors: ["Blue", "Silver"],
        compatibility: ["Gemini", "Libra", "