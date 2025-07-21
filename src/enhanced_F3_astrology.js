// Enhanced Astrology Dashboard JavaScript - File 3 of 3

// Global State Management
const AstroApp = {
    currentPage: 'dashboard',
    clients: [],
    consultations: [],
    birthCharts: [],
    compatibilityResults: [],
    currentCompatibilityType: 'marriage'
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateDateTime();
    loadSampleData();
});

// App Initialization
function initializeApp() {
    console.log('🌟 AstroVision Dashboard Initialized');
    showPage('dashboard');
    setInterval(updateDateTime, 1000);
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            showPage(page);
        });
    });

    // Birth Chart Form
    const birthChartForm = document.getElementById('birthChartForm');
    if (birthChartForm) {
        birthChartForm.addEventListener('submit', handleBirthChartSubmit);
    }

    // Compatibility Form
    const compatibilityForm = document.getElementById('compatibilityForm');
    if (compatibilityForm) {
        compatibilityForm.addEventListener('submit', handleCompatibilitySubmit);
    }

    // Compatibility Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchCompatibilityTab(this.dataset.tab);
        });
    });

    // Horoscope Controls
    const horoscopeType = document.getElementById('horoscopeType');
    if (horoscopeType) {
        horoscopeType.addEventListener('change', updateHoroscopes);
    }

    // Q&A Categories
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterQAByCategory(this.dataset.category);
        });
    });

    // Q&A Items
    document.querySelectorAll('.qa-question').forEach(question => {
        question.addEventListener('click', function() {
            toggleQAAnswer(this.parentElement);
        });
    });

    // Consultation Filters
    const consultationFilter = document.getElementById('consultationFilter');
    if (consultationFilter) {
        consultationFilter.addEventListener('change', filterConsultations);
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const activeNav = document.querySelector(`[data-page="${pageId}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    AstroApp.currentPage = pageId;

    // Load page-specific data
    switch(pageId) {
        case 'clients':
            loadClientsTable();
            break;
        case 'consultations':
            loadConsultations();
            break;
        case 'horoscopes':
            updateHoroscopes();
            break;
    }
}

// DateTime Update
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Birth Chart Functionality
function handleBirthChartSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const chartData = {
        id: Date.now(),
        clientName: formData.get('clientName'),
        birthDate: formData.get('birthDate'),
        birthTime: formData.get('birthTime'),
        birthPlace: formData.get('birthPlace'),
        timestamp: new Date().toISOString()
    };

    // Basic validation
    if (!chartData.clientName || !chartData.birthDate || !chartData.birthTime || !chartData.birthPlace) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Generate birth chart
    generateBirthChart(chartData);
    
    // Save to app state
    AstroApp.birthCharts.push(chartData);
    
    // Add to clients if new
    addClientFromChart(chartData);
    
    showNotification('Birth chart generated successfully!', 'success');
}

function generateBirthChart(chartData) {
    const chartDisplay = document.getElementById('chartDisplay');
    if (!chartDisplay) return;

    // Calculate age
    const birthDate = new Date(chartData.birthDate);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    // Generate zodiac sign (simplified)
    const zodiacSign = getZodiacSign(birthDate);

    // Create chart visualization
    chartDisplay.innerHTML = `
        <div class="chart-result">
            <div class="chart-header">
                <h3>Birth Chart for ${chartData.clientName}</h3>
                <p>Born: ${new Date(chartData.birthDate).toLocaleDateString()} at ${chartData.birthTime}</p>
                <p>Location: ${chartData.birthPlace}</p>
            </div>
            <div class="chart-wheel">
                <div class="zodiac-wheel">
                    <div class="center-info">
                        <div class="sun-sign">${zodiacSign}</div>
                        <div class="age">Age: ${age}</div>
                    </div>
                    <div class="zodiac-signs">
                        ${generateZodiacWheel(zodiacSign)}
                    </div>
                </div>
            </div>
            <div class="chart-details">
                <div class="planetary-positions">
                    <h4>Key Planetary Positions</h4>
                    ${generatePlanetaryPositions(chartData)}
                </div>
                <div class="chart-aspects">
                    <h4>Major Aspects</h4>
                    ${generateAspects(chartData)}
                </div>
            </div>
            <div class="chart-interpretation">
                <h4>Basic Interpretation</h4>
                <p>${getBasicInterpretation(zodiacSign)}</p>
            </div>
            <div class="chart-actions">
                <button class="btn btn-primary" onclick="downloadChart('${chartData.id}')">
                    <i class="fas fa-download"></i> Download Chart
                </button>
                <button class="btn btn-secondary" onclick="emailChart('${chartData.id}')">
                    <i class="fas fa-envelope"></i> Email to Client
                </button>
            </div>
        </div>
    `;
}

function getZodiacSign(birthDate) {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    
    const signs = [
        {name: 'Capricorn', start: [12, 22], end: [1, 19]},
        {name: 'Aquarius', start: [1, 20], end: [2, 18]},
        {name: 'Pisces', start: [2, 19], end: [3, 20]},
        {name: 'Aries', start: [3, 21], end: [4, 19]},
        {name: 'Taurus', start: [4, 20], end: [5, 20]},
        {name: 'Gemini', start: [5, 21], end: [6, 20]},
        {name: 'Cancer', start: [6, 21], end: [7, 22]},
        {name: 'Leo', start: [7, 23], end: [8, 22]},
        {name: 'Virgo', start: [8, 23], end: [9, 22]},
        {name: 'Libra', start: [9, 23], end: [10, 22]},
        {name: 'Scorpio', start: [10, 23], end: [11, 21]},
        {name: 'Sagittarius', start: [11, 22], end: [12, 21]}
    ];

    for (let sign of signs) {
        if (sign.name === 'Capricorn') {
            if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
                return sign.name;
            }
        } else {
            const [startMonth, startDay] = sign.start;
            const [endMonth, endDay] = sign.end;
            if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
                return sign.name;
            }
        }
    }
    return 'Unknown';
}

function generateZodiacWheel(primarySign) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    return signs.map((sign, index) => {
        const isActive = sign === primarySign;
        const rotation = index * 30;
        return `
            <div class="zodiac-sign ${isActive ? 'active' : ''}" 
                 style="transform: rotate(${rotation}deg)">
                ${sign}
            </div>
        `;
    }).join('');
}

function generatePlanetaryPositions(chartData) {
    // Simplified planetary positions (in real app, would use astronomical calculations)
    const planets = [
        {name: 'Sun', position: getRandomPosition(), sign: getZodiacSign(new Date(chartData.birthDate))},
        {name: 'Moon', position: getRandomPosition(), sign: getRandomSign()},
        {name: 'Mercury', position: getRandomPosition(), sign: getRandomSign()},
        {name: 'Venus', position: getRandomPosition(), sign: getRandomSign()},
        {name: 'Mars', position: getRandomPosition(), sign: getRandomSign()},
        {name: 'Jupiter', position: getRandomPosition(), sign: getRandomSign()}
    ];

    return planets.map(planet => `
        <div class="planet-position">
            <span class="planet-name">${planet.name}</span>
            <span class="planet-sign">${planet.position}° ${planet.sign}</span>
        </div>
    `).join('');
}

function generateAspects(chartData) {
    const aspects = [
        'Sun Conjunct Moon - Strong emotional connection',
        'Mercury Trine Venus - Harmonious communication',
        'Mars Square Jupiter - Dynamic energy, potential conflicts',
        'Venus Sextile Neptune - Creative and intuitive nature'
    ];

    return aspects.map(aspect => `
        <div class="aspect-item">
            <span class="aspect-description">${aspect}</span>
        </div>
    `).join('');
}

function getBasicInterpretation(zodiacSign) {
    const interpretations = {
        'Aries': 'Natural leader with pioneering spirit. Energetic and ambitious, but may need to work on patience.',
        'Taurus': 'Stable and reliable with strong aesthetic sense. Values security and comfort.',
        'Gemini': 'Versatile communicator with quick wit. Curious and adaptable nature.',
        'Cancer': 'Nurturing and intuitive with strong family connections. Emotionally sensitive.',
        'Leo': 'Creative and confident with natural charisma. Generous and dramatic.',
        'Virgo': 'Practical and analytical with attention to detail. Service-oriented.',
        'Libra': 'Harmonious and diplomatic with strong sense of justice. Artistic nature.',
        'Scorpio': 'Intense and transformative with deep insights. Mysterious and powerful.',
        'Sagittarius': 'Adventurous and philosophical with love of freedom. Optimistic.',
        'Capricorn': 'Ambitious and disciplined with strong work ethic. Traditional values.',
        'Aquarius': 'Independent and innovative with humanitarian interests. Unique perspective.',
        'Pisces': 'Intuitive and compassionate with artistic abilities. Dreamy nature.'
    };

    return interpretations[zodiacSign] || 'Your unique astrological profile reveals many fascinating aspects of your personality.';
}

function getRandomPosition() {
    return Math.floor(Math.random() * 30) + 1;
}

function getRandomSign() {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(Math.random() * signs.length)];
}

function saveChartData() {
    const formData = new FormData(document.getElementById('birthChartForm'));
    const chartData = {
        clientName: formData.get('clientName'),
        birthDate: formData.get('birthDate'),
        birthTime: formData.get('birthTime'),
        birthPlace: formData.get('birthPlace'),
        saved: true,
        timestamp: new Date().toISOString()
    };

    // Save to local storage (in memory since we can't use localStorage)
    AstroApp.savedCharts = AstroApp.savedCharts || [];
    AstroApp.savedCharts.push(chartData);

    showNotification('Chart data saved successfully!', 'success');
}

// Compatibility Analysis
function handleCompatibilitySubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const partner1Data = {
        name: formData.get('partner1Name') || e.target.querySelector('input[type="text"]').value,
        birthDate: formData.get('partner1BirthDate') || e.target.querySelector('input[type="date"]').value,
        birthTime: formData.get('partner1BirthTime') || e.target.querySelector('input[type="time"]').value,
        birthPlace: formData.get('partner1BirthPlace') || e.target.querySelector('input[placeholder*="City"]').value
    };

    const partner2Data = {
        name: formData.get('partner2Name') || e.target.querySelectorAll('input[type="text"]')[1].value,
        birthDate: formData.get('partner2BirthDate') || e.target.querySelectorAll('input[type="date"]')[1].value,
        birthTime: formData.get('partner2BirthTime') || e.target.querySelectorAll('input[type="time"]')[1].value,
        birthPlace: formData.get('partner2BirthPlace') || e.target.querySelectorAll('input[placeholder*="City"]')[1].value
    };

    // Validate data
    if (!partner1Data.name || !partner1Data.birthDate || !partner2Data.name || !partner2Data.birthDate) {
        showNotification('Please fill in all required fields for both partners', 'error');
        return;
    }

    // Generate compatibility analysis
    const compatibilityResult = generateCompatibilityAnalysis(partner1Data, partner2Data, AstroApp.currentCompatibilityType);
    
    // Display results
    displayCompatibilityResults(compatibilityResult);
    
    // Save to app state
    AstroApp.compatibilityResults.push(compatibilityResult);
    
    showNotification('Compatibility analysis completed!', 'success');
}

function switchCompatibilityTab(tabType) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');
    
    AstroApp.currentCompatibilityType = tabType;
    
    // Update form title and content based on tab
    const formTitle = document.querySelector('.compatibility-form h3');
    const tabTitles = {
        'marriage': 'Marriage Compatibility Analysis',
        'dating': 'Dating Compatibility Analysis',
        'casual': 'Casual Relationship Compatibility',
        'kundli': 'Kundli Milan Analysis'
    };
    
    if (formTitle) {
        formTitle.textContent = tabTitles[tabType];
    }
}

function generateCompatibilityAnalysis(partner1, partner2, type) {
    const sign1 = getZodiacSign(new Date(partner1.birthDate));
    const sign2 = getZodiacSign(new Date(partner2.birthDate));
    
    const compatibility = calculateCompatibility(sign1, sign2, type);
    
    return {
        id: Date.now(),
        partner1: {...partner1, sign: sign1},
        partner2: {...partner2, sign: sign2},
        type: type,
        compatibility: compatibility,
        timestamp: new Date().toISOString()
    };
}

function calculateCompatibility(sign1, sign2, type) {
    // Simplified compatibility calculation
    const elementCompatibility = {
        'Fire': ['Fire', 'Air'],
        'Earth': ['Earth', 'Water'],
        'Air': ['Air', 'Fire'],
        'Water': ['Water', 'Earth']
    };

    const signElements = {
        'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
        'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
        'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
        'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    };

    const element1 = signElements[sign1];
    const element2 = signElements[sign2];
    
    const isCompatible = elementCompatibility[element1]?.includes(element2) || false;
    
    let score = Math.floor(Math.random() * 40) + 60; // Base score 60-100
    
    if (isCompatible) {
        score += 10;
    }
    
    // Type-specific adjustments
    if (type === 'marriage') {
        score = Math.min(score + 5, 100);
    } else if (type === 'casual') {
        score = Math.max(score - 5, 50);
    }

    return {
        score: Math.min(score, 100),
        element1: element1,
        element2: element2,
        isCompatible: isCompatible,
        strengths: generateStrengths(sign1, sign2, type),
        challenges: generateChallenges(sign1, sign2, type),
        advice: generateAdvice(sign1, sign2, type)
    };
}

function generateStrengths(sign1, sign2, type) {
    const strengths = [
        'Strong emotional connection',
        'Excellent communication',
        'Shared values and goals',
        'Natural chemistry',
        'Complementary personalities',
        'Mutual respect and understanding'
    ];
    
    return strengths.slice(0, 3);
}

function generateChallenges(sign1, sign2, type) {
    const challenges = [
        'Different communication styles',
        'Varying life priorities',
        'Need for personal space',
        'Financial perspectives',
        'Family dynamics',
        'Career ambitions'
    ];
    
    return challenges.slice(0, 2);
}

function generateAdvice(sign1, sign2, type) {
    const advice = {
        'marriage': 'Focus on building trust and maintaining open communication. Consider pre-marital counseling.',
        'dating': 'Take time to understand each other\'s personalities and values. Don\'t rush into commitment.',
        'casual': 'Keep expectations clear and enjoy the connection without pressure.',
        'kundli': 'Consider the guna milan score and consult with family elders for traditional guidance.'
    };
    
    return advice[type] || 'Focus on understanding and respecting each other\'s differences.';
}

function displayCompatibilityResults(result) {
    const compatibilityContent = document.querySelector('.compatibility-content');
    if (!compatibilityContent) return;

    const resultsHTML = `
        <div class="compatibility-results">
            <div class="results-header">
                <h3>Compatibility Analysis Results</h3>
                <div class="compatibility-score">
                    <div class="score-circle">
                        <span class="score-value">${result.compatibility.score}%</span>
                        <span class="score-label">Compatibility</span>
                    </div>
                </div>
            </div>
            
            <div class="partners-summary">
                <div class="partner-summary">
                    <h4>${result.partner1.name}</h4>
                    <p><strong>Sign:</strong> ${result.partner1.sign}</p>
                    <p><strong>Element:</strong> ${result.compatibility.element1}</p>
                </div>
                <div class="compatibility-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="partner-summary">
                    <h4>${result.partner2.name}</h4>
                    <p><strong>Sign:</strong> ${result.partner2.sign}</p>
                    <p><strong>Element:</strong> ${result.compatibility.element2}</p>
                </div>
            </div>

            <div class="compatibility-details">
                <div class="detail-section">
                    <h4><i class="fas fa-plus-circle"></i> Strengths</h4>
                    <ul>
                        ${result.compatibility.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-exclamation-triangle"></i> Challenges</h4>
                    <ul>
                        ${result.compatibility.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-lightbulb"></i> Advice</h4>
                    <p>${result.compatibility.advice}</p>
                </div>
            </div>

            <div class="results-actions">
                <button class="btn btn-primary" onclick="downloadCompatibilityReport('${result.id}')">
                    <i class="fas fa-download"></i> Download Report
                </button>
                <button class="btn btn-secondary" onclick="scheduleCompatibilityConsultation('${result.id}')">
                    <i class="fas fa-calendar"></i> Schedule Consultation
                </button>
            </div>
        </div>
    `;

    compatibilityContent.innerHTML = resultsHTML;
}

// Horoscope Functionality
function updateHoroscopes() {
    const horoscopeType = document.getElementById('horoscopeType')?.value || 'daily';
    const horoscopeCards = document.querySelectorAll('.horoscope-card');
    
    horoscopeCards.forEach(card => {
        const sign = card.dataset.sign;
        updateHoroscopeCard(card, sign, horoscopeType);
    });
}

function updateHoroscopeCard(card, sign, type) {
    const horoscopeTexts = {
        'daily': getDailyHoroscope(sign),
        'weekly': getWeeklyHoroscope(sign),
        'monthly': getMonthlyHoroscope(sign),
        'yearly': getYearlyHoroscope(sign)
    };

    const textElement = card.querySelector('.horoscope-text');
    if (textElement) {
        textElement.textContent = horoscopeTexts[type];
    }

    // Update details if they exist
    const detailsElement = card.querySelector('.horoscope-details');
    if (detailsElement) {
        const details = getHoroscopeDetails(sign);
        detailsElement.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">Lucky Color</div>
                <div class="detail-value">${details.luckyColor}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Lucky Number</div>
                <div class="detail-value">${details.luckyNumber}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Mood</div>
                <div class="detail-value">${details.mood}</div>
            </div>
        `;
    }
}

function getDailyHoroscope(sign) {
    const horoscopes = {
        'aries': 'Your natural leadership qualities will shine today. Take charge of important projects and trust your instincts.',
        'taurus': 'Focus on financial matters and stability. A practical approach will yield the best results.',
        'gemini': 'Communication is key to your success today. Share your ideas and listen to others.',
        'cancer': 'Family and home matters take priority. Create a nurturing environment for yourself and loved ones.',
        'leo': 'Your creativity and confidence will attract attention. Step into the spotlight with pride.',
        'virgo': 'Attention to detail will serve you well. Organize your thoughts and plans carefully.',
        'libra': 'Balance and harmony are your themes today. Seek fairness in all your interactions.',
        'scorpio': 'Deep insights and transformation await. Trust your intuition and embrace change.',
        'sagittarius': 'Adventure and learning opportunities emerge. Expand your horizons and explore new possibilities.',
        'capricorn': 'Career ambitions and goals are highlighted. Take practical steps toward your objectives.',
        'aquarius': 'Innovation and friendship bring opportunities. Connect with like-minded individuals.',
        'pisces': 'Intuition and creativity guide your path. Trust your inner wisdom and artistic instincts.'
    };
    
    return horoscopes[sign] || 'The stars have special guidance for you today. Stay open to new possibilities.';
}

function getWeeklyHoroscope(sign) {
    return `This week brings significant opportunities for ${sign}. Focus on personal growth and relationship building. Mid-week planetary alignments favor new beginnings.`;
}

function getMonthlyHoroscope(sign) {
    return `${sign} enters a transformative period this month. Career and personal relationships will be highlighted. Expect positive changes in the second half of the month.`;
}

function getYearlyHoroscope(sign) {
    return `The year ahead holds great promise for ${sign}. Major life changes and opportunities for growth are indicated. This is a year of manifestation and achievement.`;
}

function getHoroscopeDetails(sign) {
    const colors = ['Blue', 'Red', 'Green', 'Purple', 'Gold', 'Silver', 'Orange', 'Pink'];
    const numbers = [3, 7, 11, 21, 33, 42, 51, 66];
    const moods = ['Optimistic', 'Energetic', 'Peaceful', 'Confident', 'Creative', 'Focused', 'Adventurous', 'Reflective'];
    
    return {
        luckyColor: colors[Math.floor(Math.random() * colors.length)],
        luckyNumber: numbers[Math.floor(Math.random() * numbers.length)],
        mood: moods[Math.floor(Math.random() * moods.length)]
    };
}

// Q&A Functionality
function filterQAByCategory(category) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter Q&A items
    const qaItems = document.querySelectorAll('.qa-item');
    qaItems.forEach(item => {
        const itemCategory = item.querySelector('.qa-category').textContent.toLowerCase();
        if (category === 'all' || itemCategory.includes(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function toggleQAAnswer(qaItem) {
    const answer = qaItem.querySelector('.qa-answer');
    const isVisible = answer.style.display === 'block';
    
    // Hide all other answers
    document.querySelectorAll('.qa-answer').forEach(ans => {
        ans.style.display = 'none';
    });
    
    // Toggle current answer
    if (!isVisible) {
        answer.style.display = 'block';
    }
}

// Client Management
function loadClientsTable() {
    const tableBody = document.getElementById('clientsTableBody');
    if (!tableBody) return;

    if (AstroApp.clients.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #636e72; padding: 40px;">
                    <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                    No clients found. Add your first client to get started.
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = AstroApp.clients.map(client => `
        <tr>
            <td>${client.name}</td>
            <td>${new Date(client.birthDate).toLocaleDateString()}</td>
            <td>${client.birthPlace}</td>
            <td>${client.lastConsultation ? new Date(client.lastConsultation).toLocaleDateString() : 'Never'}</td>
            <td>${client.services.join(', ')}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewClient('${client.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="editClient('${client.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function addClientFromChart(chartData) {
    const existingClient = AstroApp.clients.find(client => 
        client.name.toLowerCase() === chartData.clientName.toLowerCase() && 
        client.birthDate === chartData.birthDate
    );

    if (!existingClient) {
        const