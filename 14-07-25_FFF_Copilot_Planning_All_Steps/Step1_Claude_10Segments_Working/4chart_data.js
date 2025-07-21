// chart-data.js - Data Layer for Vedic Astrology Chart Engine

/**
 * ZODIAC SIGNS AND THEIR PROPERTIES
 */
const ZODIAC_SIGNS = {
  ARIES: { name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', ruler: 'MARS', degree: 0 },
  TAURUS: { name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', ruler: 'VENUS', degree: 30 },
  GEMINI: { name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', ruler: 'MERCURY', degree: 60 },
  CANCER: { name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', ruler: 'MOON', degree: 90 },
  LEO: { name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', ruler: 'SUN', degree: 120 },
  VIRGO: { name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', ruler: 'MERCURY', degree: 150 },
  LIBRA: { name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', ruler: 'VENUS', degree: 180 },
  SCORPIO: { name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', ruler: 'MARS', degree: 210 },
  SAGITTARIUS: { name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', ruler: 'JUPITER', degree: 240 },
  CAPRICORN: { name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', ruler: 'SATURN', degree: 270 },
  AQUARIUS: { name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', ruler: 'SATURN', degree: 300 },
  PISCES: { name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', ruler: 'JUPITER', degree: 330 }
};

/**
 * PLANET DEFINITIONS AND PROPERTIES
 */
const PLANETS = {
  SUN: { 
    name: 'Sun', 
    symbol: '☉', 
    type: 'Luminary',
    exaltation: 'ARIES',
    ownSign: ['LEO'],
    debilitation: 'LIBRA',
    enemySigns: ['AQUARIUS', 'LIBRA'],
    friendSigns: ['ARIES', 'CANCER', 'LEO', 'SCORPIO', 'SAGITTARIUS', 'PISCES']
  },
  MOON: { 
    name: 'Moon', 
    symbol: '☽', 
    type: 'Luminary',
    exaltation: 'TAURUS',
    ownSign: ['CANCER'],
    debilitation: 'SCORPIO',
    enemySigns: [],
    friendSigns: ['TAURUS', 'GEMINI', 'VIRGO', 'LIBRA', 'CAPRICORN', 'AQUARIUS']
  },
  MERCURY: { 
    name: 'Mercury', 
    symbol: '☿', 
    type: 'Personal',
    exaltation: 'VIRGO',
    ownSign: ['GEMINI', 'VIRGO'],
    debilitation: 'PISCES',
    enemySigns: [],
    friendSigns: ['TAURUS', 'CANCER', 'LEO', 'SCORPIO', 'CAPRICORN', 'AQUARIUS']
  },
  VENUS: { 
    name: 'Venus', 
    symbol: '♀', 
    type: 'Personal',
    exaltation: 'PISCES',
    ownSign: ['TAURUS', 'LIBRA'],
    debilitation: 'VIRGO',
    enemySigns: [],
    friendSigns: ['GEMINI', 'CANCER', 'LEO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS']
  },
  MARS: { 
    name: 'Mars', 
    symbol: '♂', 
    type: 'Personal',
    exaltation: 'CAPRICORN',
    ownSign: ['ARIES', 'SCORPIO'],
    debilitation: 'CANCER',
    enemySigns: ['GEMINI', 'VIRGO'],
    friendSigns: ['ARIES', 'LEO', 'SCORPIO', 'SAGITTARIUS', 'PISCES']
  },
  JUPITER: { 
    name: 'Jupiter', 
    symbol: '♃', 
    type: 'Social',
    exaltation: 'CANCER',
    ownSign: ['SAGITTARIUS', 'PISCES'],
    debilitation: 'CAPRICORN',
    enemySigns: ['GEMINI', 'VIRGO'],
    friendSigns: ['ARIES', 'CANCER', 'LEO', 'SCORPIO', 'SAGITTARIUS', 'PISCES']
  },
  SATURN: { 
    name: 'Saturn', 
    symbol: '♄', 
    type: 'Social',
    exaltation: 'LIBRA',
    ownSign: ['CAPRICORN', 'AQUARIUS'],
    debilitation: 'ARIES',
    enemySigns: ['ARIES', 'CANCER', 'LEO', 'SCORPIO'],
    friendSigns: ['TAURUS', 'GEMINI', 'VIRGO', 'LIBRA', 'CAPRICORN', 'AQUARIUS']
  },
  RAHU: { 
    name: 'Rahu', 
    symbol: '☊', 
    type: 'Shadow',
    exaltation: 'TAURUS',
    ownSign: [],
    debilitation: 'SCORPIO',
    enemySigns: [],
    friendSigns: ['GEMINI', 'VIRGO', 'LIBRA', 'SAGITTARIUS', 'PISCES']
  },
  KETU: { 
    name: 'Ketu', 
    symbol: '☋', 
    type: 'Shadow',
    exaltation: 'SCORPIO',
    ownSign: [],
    debilitation: 'TAURUS',
    enemySigns: [],
    friendSigns: ['ARIES', 'CANCER', 'LEO', 'SCORPIO', 'SAGITTARIUS', 'PISCES']
  }
};

/**
 * ASPECT DEFINITIONS
 */
const ASPECTS = {
  CONJUNCTION: { name: 'Conjunction', angle: 0, orb: 8, strength: 1.0 },
  SEXTILE: { name: 'Sextile', angle: 60, orb: 6, strength: 0.6 },
  SQUARE: { name: 'Square', angle: 90, orb: 8, strength: 0.8 },
  TRINE: { name: 'Trine', angle: 120, orb: 8, strength: 0.8 },
  OPPOSITION: { name: 'Opposition', angle: 180, orb: 8, strength: 0.9 }
};

/**
 * SAMPLE CHART DATA
 */
const SAMPLE_CHART_DATA = {
  // Birth details
  birthInfo: {
    name: 'Sample Person',
    dateTime: '1990-03-15T14:30:00Z',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      city: 'New Delhi',
      country: 'India',
      timezone: 'Asia/Kolkata'
    }
  },
  
  // Planet positions
  planetPositions: {
    SUN: {
      longitude: 354.75,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.PISCES,
        degreeInSign: 24.75
      },
      house: 1,
      retrograde: false,
      dignity: {
        dignity: 'Neutral',
        strength: 55
      }
    },
    MOON: {
      longitude: 125.32,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.LEO,
        degreeInSign: 5.32
      },
      house: 4,
      retrograde: false,
      dignity: {
        dignity: 'Friend Sign',
        strength: 70
      }
    },
    MERCURY: {
      longitude: 15.80,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.ARIES,
        degreeInSign: 15.80
      },
      house: 2,
      retrograde: false,
      dignity: {
        dignity: 'Neutral',
        strength: 60
      }
    },
    VENUS: {
      longitude: 330.25,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.PISCES,
        degreeInSign: 0.25
      },
      house: 11,
      retrograde: false,
      dignity: {
        dignity: 'Exaltation',
        strength: 95
      }
    },
    MARS: {
      longitude: 280.15,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.CAPRICORN,
        degreeInSign: 10.15
      },
      house: 9,
      retrograde: false,
      dignity: {
        dignity: 'Exaltation',
        strength: 88
      }
    },
    JUPITER: {
      longitude: 95.60,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.CANCER,
        degreeInSign: 5.60
      },
      house: 3,
      retrograde: false,
      dignity: {
        dignity: 'Exaltation',
        strength: 92
      }
    },
    SATURN: {
      longitude: 215.45,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.SCORPIO,
        degreeInSign: 5.45
      },
      house: 7,
      retrograde: true,
      dignity: {
        dignity: 'Enemy Sign',
        strength: 25
      }
    },
    RAHU: {
      longitude: 75.90,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.GEMINI,
        degreeInSign: 15.90
      },
      house: 2,
      retrograde: true,
      dignity: {
        dignity: 'Friend Sign',
        strength: 65
      }
    },
    KETU: {
      longitude: 255.90,
      zodiacPosition: {
        sign: ZODIAC_SIGNS.SAGITTARIUS,
        degreeInSign: 15.90
      },
      house: 8,
      retrograde: true,
      dignity: {
        dignity: 'Friend Sign',
        strength: 70
      }
    }
  },
  
  // House cusps
  houses: [
    { house: 1, cusp: 330, sign: ZODIAC_SIGNS.PISCES, lord: 'JUPITER' },
    { house: 2, cusp: 0, sign: ZODIAC_SIGNS.ARIES, lord: 'MARS' },
    { house: 3, cusp: 30, sign: ZODIAC_SIGNS.TAURUS, lord: 'VENUS' },
    { house: 4, cusp: 60, sign: ZODIAC_SIGNS.GEMINI, lord: 'MERCURY' },
    { house: 5, cusp: 90, sign: ZODIAC_SIGNS.CANCER, lord: 'MOON' },
    { house: 6, cusp: 120, sign: ZODIAC_SIGNS.LEO, lord: 'SUN' },
    { house: 7, cusp: 150, sign: ZODIAC_SIGNS.VIRGO, lord: 'MERCURY' },
    { house: 8, cusp: 180, sign: ZODIAC_SIGNS.LIBRA, lord: 'VENUS' },
    { house: 9, cusp: 210, sign: ZODIAC_SIGNS.SCORPIO, lord: 'MARS' },
    { house: 10, cusp: 240, sign: ZODIAC_SIGNS.SAGITTARIUS, lord: 'JUPITER' },
    { house: 11, cusp: 270, sign: ZODIAC_SIGNS.CAPRICORN, lord: 'SATURN' },
    { house: 12, cusp: 300, sign: ZODIAC_SIGNS.AQUARIUS, lord: 'SATURN' }
  ],
  
  // Calculated aspects
  aspects: [
    { from: 'SUN', to: 'VENUS', type: 'CONJUNCTION', orb: 5.5, strength: 'Strong' },
    { from: 'MOON', to: 'JUPITER', type: 'TRINE', orb: 6.28, strength: 'Moderate' },
    { from: 'MARS', to: 'SATURN', type: 'SQUARE', orb: 4.7, strength: 'Strong' },
    { from: 'MERCURY', to: 'VENUS', type: 'SEXTILE', orb: 4.45, strength: 'Moderate' },
    { from: 'JUPITER', to: 'SATURN', type: 'OPPOSITION', orb: 0.15, strength: 'Very Strong' },
    { from: 'RAHU', to: 'KETU', type: 'OPPOSITION', orb: 0, strength: 'Exact' }
  ]
};

/**
 * DATA VALIDATION UTILITIES
 */
class ChartDataValidator {
  // Validate longitude (0-360 degrees)
  static validateLongitude(longitude) {
    if (typeof longitude !== 'number' || isNaN(longitude)) {
      throw new Error('Longitude must be a valid number');
    }
    if (longitude < 0 || longitude >= 360) {
      throw new Error('Longitude must be between 0 and 360 degrees');
    }
    return true;
  }
  
  // Validate house number (1-12)
  static validateHouse(house) {
    if (!Number.isInteger(house) || house < 1 || house > 12) {
      throw new Error('House must be an integer between 1 and 12');
    }
    return true;
  }
  
  // Validate planet name
  static validatePlanet(planet) {
    if (!PLANETS[planet]) {
      throw new Error(`Invalid planet: ${planet}`);
    }
    return true;
  }
  
  // Validate zodiac sign
  static validateZodiacSign(sign) {
    if (!ZODIAC_SIGNS[sign]) {
      throw new Error(`Invalid zodiac sign: ${sign}`);
    }
    return true;
  }
  
  // Validate complete planet position
  static validatePlanetPosition(planet, position) {
    this.validatePlanet(planet);
    this.validateLongitude(position.longitude);
    this.validateHouse(position.house);
    
    if (!position.zodiacPosition || !position.zodiacPosition.sign) {
      throw new Error('Planet position must include zodiac sign');
    }
    
    const degreeInSign = position.zodiacPosition.degreeInSign;
    if (typeof degreeInSign !== 'number' || degreeInSign < 0 || degreeInSign >= 30) {
      throw new Error('Degree in sign must be between 0 and 30');
    }
    
    return true;
  }
  
  // Validate complete chart data
  static validateChartData(chartData) {
    if (!chartData || typeof chartData !== 'object') {
      throw new Error('Chart data must be an object');
    }
    
    if (!chartData.planetPositions) {
      throw new Error('Chart data must include planet positions');
    }
    
    // Validate each planet position
    Object.entries(chartData.planetPositions).forEach(([planet, position]) => {
      this.validatePlanetPosition(planet, position);
    });
    
    // Validate houses if present
    if (chartData.houses) {
      chartData.houses.forEach(house => {
        this.validateHouse(house.house);
        if (house.cusp !== undefined) {
          this.validateLongitude(house.cusp);
        }
      });
    }
    
    return true;
  }
}

/**
 * CHART DATA TRANSFORMATION FUNCTIONS
 */
class ChartDataTransformer {
  // Convert longitude to zodiac position
  static longitudeToZodiacPosition(longitude) {
    ChartDataValidator.validateLongitude(longitude);
    
    const signIndex = Math.floor(longitude / 30);
    const degreeInSign = longitude % 30;
    const signKeys = Object.keys(ZODIAC_SIGNS);
    
    return {
      sign: ZODIAC_SIGNS[signKeys[signIndex]],
      degreeInSign: degreeInSign
    };
  }
  
  // Convert zodiac position to longitude
  static zodiacPositionToLongitude(zodiacPosition) {
    const signKeys = Object.keys(ZODIAC_SIGNS);
    const signIndex = signKeys.findIndex(key => 
      ZODIAC_SIGNS[key].name === zodiacPosition.sign.name
    );
    
    if (signIndex === -1) {
      throw new Error('Invalid zodiac sign');
    }
    
    return (signIndex * 30) + zodiacPosition.degreeInSign;
  }
  
  // Calculate planet dignity
  static calculatePlanetDignity(planet, sign) {
    ChartDataValidator.validatePlanet(planet);
    
    const planetData = PLANETS[planet];
    const signName = sign.name.toUpperCase();
    
    if (planetData.exaltation === signName) {
      return { dignity: 'Exaltation', strength: 95 };
    }
    
    if (planetData.ownSign.includes(signName)) {
      return { dignity: 'Own Sign', strength: 85 };
    }
    
    if (planetData.debilitation === signName) {
      return { dignity: 'Debilitation', strength: 15 };
    }
    
    if (planetData.enemySigns.includes(signName)) {
      return { dignity: 'Enemy Sign', strength: 30 };
    }
    
    if (planetData.friendSigns.includes(signName)) {
      return { dignity: 'Friend Sign', strength: 70 };
    }
    
    return { dignity: 'Neutral', strength: 50 };
  }
  
  // Calculate house for planet based on longitude and house cusps
  static calculateHouseForPlanet(planetLongitude, houses) {
    ChartDataValidator.validateLongitude(planetLongitude);
    
    for (let i = 0; i < houses.length; i++) {
      const currentHouse = houses[i];
      const nextHouse = houses[(i + 1) % houses.length];
      
      let currentCusp = currentHouse.cusp;
      let nextCusp = nextHouse.cusp;
      
      // Handle crossing 0 degrees
      if (nextCusp < currentCusp) {
        nextCusp += 360;
      }
      
      let adjustedPlanetLongitude = planetLongitude;
      if (planetLongitude < currentCusp && nextCusp > 360) {
        adjustedPlanetLongitude += 360;
      }
      
      if (adjustedPlanetLongitude >= currentCusp && adjustedPlanetLongitude < nextCusp) {
        return currentHouse.house;
      }
    }
    
    return 1; // Default to first house if calculation fails
  }
  
  // Calculate aspect between two planets
  static calculateAspect(planet1Longitude, planet2Longitude) {
    ChartDataValidator.validateLongitude(planet1Longitude);
    ChartDataValidator.validateLongitude(planet2Longitude);
    
    let angleDifference = Math.abs(planet1Longitude - planet2Longitude);
    
    // Handle crossing 0 degrees
    if (angleDifference > 180) {
      angleDifference = 360 - angleDifference;
    }
    
    // Find closest aspect
    for (const [aspectName, aspectData] of Object.entries(ASPECTS)) {
      const orb = Math.abs(angleDifference - aspectData.angle);
      if (orb <= aspectData.orb) {
        let strength = 'Weak';
        if (orb <= 2) strength = 'Very Strong';
        else if (orb <= 4) strength = 'Strong';
        else if (orb <= 6) strength = 'Moderate';
        
        return {
          type: aspectName,
          orb: orb,
          strength: strength,
          angle: angleDifference
        };
      }
    }
    
    return null; // No aspect found
  }
  
  // Transform raw planetary data to complete chart data
  static transformRawData(rawData) {
    const transformedData = {
      birthInfo: rawData.birthInfo || {},
      planetPositions: {},
      houses: rawData.houses || SAMPLE_CHART_DATA.houses,
      aspects: []
    };
    
    // Transform planet positions
    Object.entries(rawData.planetPositions).forEach(([planet, data]) => {
      const zodiacPosition = this.longitudeToZodiacPosition(data.longitude);
      const house = this.calculateHouseForPlanet(data.longitude, transformedData.houses);
      const dignity = this.calculatePlanetDignity(planet, zodiacPosition.sign);
      
      transformedData.planetPositions[planet] = {
        longitude: data.longitude,
        zodiacPosition: zodiacPosition,
        house: house,
        retrograde: data.retrograde || false,
        dignity: dignity
      };
    });
    
    // Calculate aspects
    const planets = Object.keys(transformedData.planetPositions);
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const planet1 = planets[i];
        const planet2 = planets[j];
        const aspect = this.calculateAspect(
          transformedData.planetPositions[planet1].longitude,
          transformedData.planetPositions[planet2].longitude
        );
        
        if (aspect) {
          transformedData.aspects.push({
            from: planet1,
            to: planet2,
            ...aspect
          });
        }
      }
    }
    
    return transformedData;
  }
  
  // Group planets by house
  static groupPlanetsByHouse(chartData) {
    const houseGroups = {};
    
    Object.entries(chartData.planetPositions).forEach(([planet, data]) => {
      const house = data.house;
      if (!houseGroups[house]) {
        houseGroups[house] = [];
      }
      houseGroups[house].push({ planet, data });
    });
    
    return houseGroups;
  }
  
  // Get planets in specific sign
  static getPlanetsInSign(chartData, signName) {
    const planetsInSign = [];
    
    Object.entries(chartData.planetPositions).forEach(([planet, data]) => {
      if (data.zodiacPosition.sign.name === signName) {
        planetsInSign.push({ planet, data });
      }
    });
    
    return planetsInSign;
  }
}

/**
 * UTILITY FUNCTIONS
 */
const ChartDataUtils = {
  // Get planet color for UI
  getPlanetColor: (planet) => {
    const colors = {
      SUN: '#fbbf24',
      MOON: '#e5e7eb',
      MERCURY: '#10b981',
      VENUS: '#f472b6',
      MARS: '#ef4444',
      JUPITER: '#3b82f6',
      SATURN: '#6366f1',
      RAHU: '#8b5cf6',
      KETU: '#f59e0b'
    };
    return colors[planet] || '#9ca3af';
  },
  
  // Get planet symbol
  getPlanetSymbol: (planet) => {
    return PLANETS[planet]?.symbol || '?';
  },
  
  // Get sign symbol
  getSignSymbol: (signName) => {
    const sign = Object.values(ZODIAC_SIGNS).find(s => s.name === signName);
    return sign?.symbol || '?';
  },
  
  // Format degree display
  formatDegree: (degree) => {
    return `${Math.floor(degree)}°${Math.floor((degree % 1) * 60)}'`;
  },
  
  // Get aspect symbol
  getAspectSymbol: (aspectType) => {
    const symbols = {
      CONJUNCTION: '☌',
      SEXTILE: '⚹',
      SQUARE: '□',
      TRINE: '△',
      OPPOSITION: '☍'
    };
    return symbols[aspectType] || '○';
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ZODIAC_SIGNS,
    PLANETS,
    ASPECTS,
    SAMPLE_CHART_DATA,
    ChartDataValidator,
    ChartDataTransformer,
    ChartDataUtils
  };
}

// Example usage and testing
console.log('Chart Data Layer Initialized');
console.log('Sample Chart Data:', SAMPLE_CHART_DATA);
console.log('Validation Test:', ChartDataValidator.validateChartData(SAMPLE_CHART_DATA));
console.log('Transformation Test:', ChartDataTransformer.groupPlanetsByHouse(SAMPLE_CHART_DATA));