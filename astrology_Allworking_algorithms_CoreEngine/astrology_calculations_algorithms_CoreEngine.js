// ===============================================
// ASTROLOGY CALCULATION ALGORITHMS - CORE ENGINE
// ===============================================
// This module handles all astrological calculations
// Integrates with Swiss Ephemeris backend data
// ===============================================

class AstrologyCalculator {
  constructor() {
    this.AYANAMSA_LAHIRI = 'LAHIRI'; // Default ayanamsa
    this.HOUSE_SYSTEMS = {
      PLACIDUS: 'P',
      KOCH: 'K',
      EQUAL: 'E',
      WHOLE_SIGN: 'W'
    };
    
    // Zodiac signs data
    this.ZODIAC_SIGNS = [
      { name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' },
      { name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', ruler: 'Venus' },
      { name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', ruler: 'Mercury' },
      { name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', ruler: 'Moon' },
      { name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', ruler: 'Sun' },
      { name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' },
      { name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', ruler: 'Venus' },
      { name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', ruler: 'Mars' },
      { name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' },
      { name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' },
      { name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', ruler: 'Saturn' },
      { name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', ruler: 'Jupiter' }
    ];

    // Planetary data
    this.PLANETS = {
      SUN: { name: 'Sun', symbol: '☉', nature: 'Benefic', element: 'Fire' },
      MOON: { name: 'Moon', symbol: '☽', nature: 'Benefic', element: 'Water' },
      MERCURY: { name: 'Mercury', symbol: '☿', nature: 'Neutral', element: 'Earth' },
      VENUS: { name: 'Venus', symbol: '♀', nature: 'Benefic', element: 'Water' },
      MARS: { name: 'Mars', symbol: '♂', nature: 'Malefic', element: 'Fire' },
      JUPITER: { name: 'Jupiter', symbol: '♃', nature: 'Benefic', element: 'Air' },
      SATURN: { name: 'Saturn', symbol: '♄', nature: 'Malefic', element: 'Earth' },
      RAHU: { name: 'Rahu', symbol: '☊', nature: 'Malefic', element: 'Air' },
      KETU: { name: 'Ketu', symbol: '☋', nature: 'Malefic', element: 'Fire' }
    };

    // Exaltation and debilitation degrees
    this.EXALTATION_DEGREES = {
      SUN: { sign: 0, degree: 10 }, // Aries 10°
      MOON: { sign: 1, degree: 3 }, // Taurus 3°
      MERCURY: { sign: 5, degree: 15 }, // Virgo 15°
      VENUS: { sign: 11, degree: 27 }, // Pisces 27°
      MARS: { sign: 9, degree: 28 }, // Capricorn 28°
      JUPITER: { sign: 3, degree: 5 }, // Cancer 5°
      SATURN: { sign: 6, degree: 20 } // Libra 20°
    };

    // Aspect orbs (in degrees)
    this.ASPECT_ORBS = {
      CONJUNCTION: 8,
      OPPOSITION: 8,
      TRINE: 6,
      SQUARE: 6,
      SEXTILE: 4,
      QUINCUNX: 3
    };
  }

  // ===============================================
  // COORDINATE CONVERSION METHODS
  // ===============================================

  /**
   * Convert decimal degrees to degrees, minutes, seconds
   */
  decimalToDMS(decimal) {
    const degrees = Math.floor(decimal);
    const minutes = Math.floor((decimal - degrees) * 60);
    const seconds = Math.round(((decimal - degrees) * 60 - minutes) * 60);
    
    return {
      degrees,
      minutes,
      seconds,
      formatted: `${degrees}°${minutes}'${seconds}"`
    };
  }

  /**
   * Convert degrees to zodiac sign and position
   */
  degreesToZodiacPosition(longitude) {
    const signIndex = Math.floor(longitude / 30);
    const degreeInSign = longitude % 30;
    
    return {
      sign: this.ZODIAC_SIGNS[signIndex],
      signIndex,
      degreeInSign,
      dms: this.decimalToDMS(degreeInSign),
      formatted: `${this.ZODIAC_SIGNS[signIndex].symbol} ${this.decimalToDMS(degreeInSign).formatted}`
    };
  }

  // ===============================================
  // HOUSE CALCULATION METHODS
  // ===============================================

  /**
   * Calculate house cusps using Placidus system
   * Input: ascendant, midheaven, latitude
   */
  calculateHouseCusps(ascendant, midheaven, latitude) {
    const houses = [];
    
    // House 1 (Ascendant)
    houses[0] = ascendant;
    
    // House 10 (Midheaven)
    houses[9] = midheaven;
    
    // House 4 (IC - opposite to MC)
    houses[3] = (midheaven + 180) % 360;
    
    // House 7 (Descendant - opposite to Ascendant)
    houses[6] = (ascendant + 180) % 360;
    
    // Calculate intermediate houses (simplified Placidus)
    const houseSpan = 30; // Equal house approximation for now
    
    for (let i = 1; i < 12; i++) {
      if (houses[i] === undefined) {
        houses[i] = (houses[0] + (i * houseSpan)) % 360;
      }
    }
    
    return houses.map((cusp, index) => ({
      house: index + 1,
      cusp: cusp,
      sign: this.degreesToZodiacPosition(cusp)
    }));
  }

  /**
   * Determine which house a planet is in
   */
  getPlanetHouse(planetLongitude, houseCusps) {
    for (let i = 0; i < 12; i++) {
      const currentHouse = houseCusps[i];
      const nextHouse = houseCusps[(i + 1) % 12];
      
      if (nextHouse > currentHouse) {
        // Normal case
        if (planetLongitude >= currentHouse && planetLongitude < nextHouse) {
          return i + 1;
        }
      } else {
        // Crosses 0° (Aries)
        if (planetLongitude >= currentHouse || planetLongitude < nextHouse) {
          return i + 1;
        }
      }
    }
    return 1; // Default to first house
  }

  // ===============================================
  // PLANETARY STRENGTH CALCULATIONS
  // ===============================================

  /**
   * Calculate planetary dignity
   */
  calculatePlanetaryDignity(planet, longitude) {
    const position = this.degreesToZodiacPosition(longitude);
    const signIndex = position.signIndex;
    const degree = position.degreeInSign;
    
    // Own sign (Sva-rashi)
    const ownSigns = this.getOwnSigns(planet);
    if (ownSigns.includes(signIndex)) {
      return {
        dignity: 'Own Sign',
        strength: 100,
        description: `${planet} is in its own sign ${position.sign.name}`
      };
    }
    
    // Exaltation (Uchcha)
    const exaltation = this.EXALTATION_DEGREES[planet];
    if (exaltation && exaltation.sign === signIndex) {
      const exaltationStrength = this.calculateExaltationStrength(degree, exaltation.degree);
      return {
        dignity: 'Exaltation',
        strength: exaltationStrength,
        description: `${planet} is exalted in ${position.sign.name}`
      };
    }
    
    // Debilitation (Neecha)
    const debilitationSign = (exaltation.sign + 6) % 12;
    if (exaltation && debilitationSign === signIndex) {
      const debilitationStrength = this.calculateDebilitationStrength(degree, exaltation.degree);
      return {
        dignity: 'Debilitation',
        strength: debilitationStrength,
        description: `${planet} is debilitated in ${position.sign.name}`
      };
    }
    
    // Friendly sign
    const friendlySigns = this.getFriendlySigns(planet);
    if (friendlySigns.includes(signIndex)) {
      return {
        dignity: 'Friendly',
        strength: 70,
        description: `${planet} is in friendly sign ${position.sign.name}`
      };
    }
    
    // Enemy sign
    const enemySigns = this.getEnemySigns(planet);
    if (enemySigns.includes(signIndex)) {
      return {
        dignity: 'Enemy',
        strength: 30,
        description: `${planet} is in enemy sign ${position.sign.name}`
      };
    }
    
    // Neutral
    return {
      dignity: 'Neutral',
      strength: 50,
      description: `${planet} is neutral in ${position.sign.name}`
    };
  }

  /**
   * Calculate exaltation strength (0-100)
   */
  calculateExaltationStrength(currentDegree, exaltationDegree) {
    const difference = Math.abs(currentDegree - exaltationDegree);
    const maxStrength = 100;
    const minStrength = 60;
    
    // Strength decreases as distance from exact exaltation increases
    const strengthReduction = (difference / 30) * (maxStrength - minStrength);
    return Math.max(minStrength, maxStrength - strengthReduction);
  }

  /**
   * Calculate debilitation strength (0-40)
   */
  calculateDebilitationStrength(currentDegree, exaltationDegree) {
    const difference = Math.abs(currentDegree - exaltationDegree);
    const maxWeakness = 0;
    const minWeakness = 40;
    
    // Weakness increases as we get closer to exact debilitation
    const strengthIncrease = (difference / 30) * (minWeakness - maxWeakness);
    return Math.min(minWeakness, maxWeakness + strengthIncrease);
  }

  // ===============================================
  // ASPECT CALCULATIONS
  // ===============================================

  /**
   * Calculate aspects between planets
   */
  calculateAspects(planetPositions) {
    const aspects = [];
    const planets = Object.keys(planetPositions);
    
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const planet1 = planets[i];
        const planet2 = planets[j];
        const pos1 = planetPositions[planet1].longitude;
        const pos2 = planetPositions[planet2].longitude;
        
        const aspect = this.calculateAspectBetweenPlanets(pos1, pos2);
        
        if (aspect) {
          aspects.push({
            planet1,
            planet2,
            aspect: aspect.type,
            orb: aspect.orb,
            exactness: aspect.exactness,
            influence: this.calculateAspectInfluence(planet1, planet2, aspect.type)
          });
        }
      }
    }
    
    return aspects;
  }

  /**
   * Calculate specific aspect between two planetary positions
   */
  calculateAspectBetweenPlanets(pos1, pos2) {
    let difference = Math.abs(pos1 - pos2);
    if (difference > 180) difference = 360 - difference;
    
    const aspectTypes = [
      { type: 'Conjunction', angle: 0, orb: this.ASPECT_ORBS.CONJUNCTION },
      { type: 'Opposition', angle: 180, orb: this.ASPECT_ORBS.OPPOSITION },
      { type: 'Trine', angle: 120, orb: this.ASPECT_ORBS.TRINE },
      { type: 'Square', angle: 90, orb: this.ASPECT_ORBS.SQUARE },
      { type: 'Sextile', angle: 60, orb: this.ASPECT_ORBS.SEXTILE },
      { type: 'Quincunx', angle: 150, orb: this.ASPECT_ORBS.QUINCUNX }
    ];
    
    for (const aspectType of aspectTypes) {
      const orb = Math.abs(difference - aspectType.angle);
      if (orb <= aspectType.orb) {
        return {
          type: aspectType.type,
          orb: orb,
          exactness: ((aspectType.orb - orb) / aspectType.orb) * 100
        };
      }
    }
    
    return null;
  }

  /**
   * Calculate aspect influence strength
   */
  calculateAspectInfluence(planet1, planet2, aspectType) {
    const planetNatures = {
      [planet1]: this.PLANETS[planet1]?.nature || 'Neutral',
      [planet2]: this.PLANETS[planet2]?.nature || 'Neutral'
    };
    
    const aspectHarmony = {
      'Conjunction': 0.8,
      'Trine': 0.9,
      'Sextile': 0.7,
      'Square': -0.6,
      'Opposition': -0.8,
      'Quincunx': -0.4
    };
    
    const baseInfluence = aspectHarmony[aspectType] || 0;
    
    // Modify based on planetary natures
    let natureModifier = 1;
    if (planetNatures[planet1] === 'Benefic' && planetNatures[planet2] === 'Benefic') {
      natureModifier = 1.2;
    } else if (planetNatures[planet1] === 'Malefic' && planetNatures[planet2] === 'Malefic') {
      natureModifier = 0.8;
    }
    
    return {
      strength: Math.abs(baseInfluence * natureModifier),
      nature: baseInfluence > 0 ? 'Harmonious' : 'Challenging',
      description: this.generateAspectDescription(planet1, planet2, aspectType)
    };
  }

  // ===============================================
  // YOGA DETECTION METHODS
  // ===============================================

  /**
   * Detect major yogas in the chart
   */
  detectYogas(planetPositions, houseCusps) {
    const yogas = [];
    
    // Raja Yoga - benefic planets in kendras/trikonas
    const rajaYoga = this.detectRajaYoga(planetPositions, houseCusps);
    if (rajaYoga) yogas.push(rajaYoga);
    
    // Dhana Yoga - wealth combinations
    const dhanaYoga = this.detectDhanaYoga(planetPositions, houseCusps);
    if (dhanaYoga) yogas.push(dhanaYoga);
    
    // Gaja Kesari Yoga - Moon-Jupiter combination
    const gajaKesariYoga = this.detectGajaKesariYoga(planetPositions);
    if (gajaKesariYoga) yogas.push(gajaKesariYoga);
    
    // Chandra Mangal Yoga - Moon-Mars combination
    const chandraMangalYoga = this.detectChandraMangalYoga(planetPositions);
    if (chandraMangalYoga) yogas.push(chandraMangalYoga);
    
    return yogas;
  }

  /**
   * Detect Raja Yoga (combination of kendra and trikona lords)
   */
  detectRajaYoga(planetPositions, houseCusps) {
    const kendraHouses = [1, 4, 7, 10];
    const trikonaHouses = [1, 5, 9];
    
    // This is a simplified version - full implementation would be more complex
    const aspects = this.calculateAspects(planetPositions);
    
    for (const aspect of aspects) {
      const house1 = this.getPlanetHouse(planetPositions[aspect.planet1].longitude, houseCusps);
      const house2 = this.getPlanetHouse(planetPositions[aspect.planet2].longitude, houseCusps);
      
      if ((kendraHouses.includes(house1) && trikonaHouses.includes(house2)) ||
          (trikonaHouses.includes(house1) && kendraHouses.includes(house2))) {
        
        if (aspect.aspect === 'Conjunction' || aspect.aspect === 'Trine') {
          return {
            name: 'Raja Yoga',
            strength: 80,
            description: `${aspect.planet1} and ${aspect.planet2} form Raja Yoga through ${aspect.aspect}`,
            effects: 'Leadership, success, recognition, prosperity'
          };
        }
      }
    }
    
    return null;
  }

  /**
   * Detect Gaja Kesari Yoga (Moon-Jupiter combination)
   */
  detectGajaKesariYoga(planetPositions) {
    const moonPos = planetPositions.MOON?.longitude;
    const jupiterPos = planetPositions.JUPITER?.longitude;
    
    if (!moonPos || !jupiterPos) return null;
    
    const moonSign = Math.floor(moonPos / 30);
    const jupiterSign = Math.floor(jupiterPos / 30);
    
    // Jupiter in kendra (1, 4, 7, 10) from Moon
    const signDifference = Math.abs(moonSign - jupiterSign);
    const kendraPositions = [0, 3, 6, 9];
    
    if (kendraPositions.includes(signDifference) || kendraPositions.includes(12 - signDifference)) {
      return {
        name: 'Gaja Kesari Yoga',
        strength: 85,
        description: 'Jupiter in kendra from Moon creates powerful Gaja Kesari Yoga',
        effects: 'Wisdom, prosperity, respect, good fortune, strong intuition'
      };
    }
    
    return null;
  }

  // ===============================================
  // DASHA CALCULATIONS
  // ===============================================

  /**
   * Calculate Vimshottari Dasha periods
   */
  calculateVimshottariDasha(moonLongitude, birthDate) {
    const nakshatraYears = [
      7, 20, 6, 10, 7, 18, 16, 19, 17, 7, 20, 16, 19, 17, 7, 20, 16, 19, 17, 7, 20, 16, 19, 17, 7, 20, 16
    ];
    
    const nakshatraLords = [
      'KETU', 'VENUS', 'SUN', 'MOON', 'MARS', 'RAHU', 'JUPITER', 'SATURN', 'MERCURY'
    ];
    
    // Calculate nakshatra from moon longitude
    const nakshatra = Math.floor(moonLongitude / (360 / 27));
    const nakshatraLord = nakshatraLords[nakshatra % 9];
    
    // Calculate balance of first dasha
    const degreeInNakshatra = moonLongitude % (360 / 27);
    const totalDegrees = 360 / 27;
    const completedFraction = degreeInNakshatra / totalDegrees;
    const lordIndex = nakshatraLords.indexOf(nakshatraLord);
    const totalYears = nakshatraYears[lordIndex];
    const balanceYears = totalYears * (1 - completedFraction);
    
    // Generate dasha periods
    const dashaPeriods = [];
    const birthYear = new Date(birthDate).getFullYear();
    let currentYear = birthYear;
    
    // First dasha (balance)
    dashaPeriods.push({
      lord: nakshatraLord,
      startYear: currentYear,
      endYear: currentYear + balanceYears,
      totalYears: balanceYears,
      isBalance: true
    });
    
    currentYear += balanceYears;
    
    // Subsequent full dashas
    for (let i = 1; i < 9; i++) {
      const nextLordIndex = (lordIndex + i) % 9;
      const nextLord = nakshatraLords[nextLordIndex];
      const nextYears = nakshatraYears[nextLordIndex];
      
      dashaPeriods.push({
        lord: nextLord,
        startYear: currentYear,
        endYear: currentYear + nextYears,
        totalYears: nextYears,
        isBalance: false
      });
      
      currentYear += nextYears;
    }
    
    return dashaPeriods;
  }

  /**
   * Get current dasha period
   */
  getCurrentDasha(dashaPeriods, currentDate = new Date()) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDecimal = currentYear + (currentMonth / 12);
    
    for (const period of dashaPeriods) {
      if (currentDecimal >= period.startYear && currentDecimal < period.endYear) {
        return {
          ...period,
          remainingYears: period.endYear - currentDecimal,
          completedYears: currentDecimal - period.startYear,
          progressPercentage: ((currentDecimal - period.startYear) / period.totalYears) * 100
        };
      }
    }
    
    return null;
  }

  // ===============================================
  // HELPER METHODS
  // ===============================================

  /**
   * Get own signs for a planet
   */
  getOwnSigns(planet) {
    const ownSigns = {
      SUN: [4], // Leo
      MOON: [3], // Cancer
      MERCURY: [2, 5], // Gemini, Virgo
      VENUS: [1, 6], // Taurus, Libra
      MARS: [0, 7], // Aries, Scorpio
      JUPITER: [8, 11], // Sagittarius, Pisces
      SATURN: [9, 10] // Capricorn, Aquarius
    };
    
    return ownSigns[planet] || [];
  }

  /**
   * Get friendly signs for a planet
   */
  getFriendlySigns(planet) {
    // Simplified friendship - full calculation would be more complex
    const friendships = {
      SUN: [0, 8, 11], // Aries, Sagittarius, Pisces
      MOON: [1, 3, 5], // Taurus, Cancer, Virgo
      MERCURY: [1, 4, 6], // Taurus, Leo, Libra
      VENUS: [2, 9, 10], // Gemini, Capricorn, Aquarius
      MARS: [3, 4, 8], // Cancer, Leo, Sagittarius
      JUPITER: [0, 3, 4], // Aries, Cancer, Leo
      SATURN: [1, 2, 6] // Taurus, Gemini, Libra
    };
    
    return friendships[planet] || [];
  }

  /**
   * Get enemy signs for a planet
   */
  getEnemySigns(planet) {
    // Simplified enmity - full calculation would be more complex
    const enmities = {
      SUN: [6, 10], // Libra, Aquarius
      MOON: [7, 9], // Scorpio, Capricorn
      MERCURY: [8, 11], // Sagittarius, Pisces
      VENUS: [0, 7], // Aries, Scorpio
      MARS: [2, 6], // Gemini, Libra
      JUPITER: [2, 5], // Gemini, Virgo
      SATURN: [0, 3, 4] // Aries, Cancer, Leo
    };
    
    return enmities[planet] || [];
  }

  /**
   * Generate aspect description
   */
  generateAspectDescription(planet1, planet2, aspectType) {
    const descriptions = {
      'Conjunction': `${planet1} and ${planet2} are closely united, blending their energies`,
      'Opposition': `${planet1} and ${planet2} are in tension, creating dynamic challenge`,
      'Trine': `${planet1} and ${planet2} form a harmonious, flowing connection`,
      'Square': `${planet1} and ${planet2} create friction that drives growth`,
      'Sextile': `${planet1} and ${planet2} offer opportunities for cooperation`,
      'Quincunx': `${planet1} and ${planet2} require adjustment and adaptation`
    };
    
    return descriptions[aspectType] || `${planet1} and ${planet2} form a ${aspectType} aspect`;
  }

  // ===============================================
  // MAIN CALCULATION METHOD
  // ===============================================

  /**
   * Process complete birth chart calculations
   * Input: Swiss Ephemeris data from backend
   */
  processChart(swissEphemerisData) {
    const {
      planetPositions,
      houseCusps,
      birthDetails
    } = swissEphemerisData;

    // Calculate zodiac positions
    const zodiacPositions = {};
    for (const [planet, data] of Object.entries(planetPositions)) {
      zodiacPositions[planet] = {
        ...data,
        zodiacPosition: this.degreesToZodiacPosition(data.longitude),
        dignity: this.calculatePlanetaryDignity(planet, data.longitude),
        house: this.getPlanetHouse(data.longitude, houseCusps)
      };
    }

    // Calculate aspects
    const aspects = this.calculateAspects(planetPositions);

    // Detect yogas
    const yogas = this.detectYogas(planetPositions, houseCusps);

    // Calculate dasha periods
    const dashaPeriods = this.calculateVimshottariDasha(
      planetPositions.MOON.longitude,
      birthDetails.birthDate
    );

    // Get current dasha
    const currentDasha = this.getCurrentDasha(dashaPeriods);

    // Calculate house information
    const houses = this.calculateHouseCusps(
      houseCusps[0], // Ascendant
      houseCusps[9], // Midheaven
      birthDetails.latitude
    );

    return {
      planetPositions: zodiacPositions,
      aspects,
      yogas,
      dashaPeriods,
      currentDasha,
      houses,
      birthDetails,
      calculationTimestamp: new Date().toISOString()
    };
  }
}

// Export for use in your application
export default AstrologyCalculator;

// Usage example:
/*
const calculator = new AstrologyCalculator();

// Assuming you have Swiss Ephemeris data from backend
const swissEphemerisData = {
  planetPositions: {
    SUN: { longitude: 45.5 },
    MOON: { longitude: 120.3 },
    // ... other planets
  },
  houseCusps: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 0],
  birthDetails: {
    birthDate: '1990-01-01',
    latitude: 28.7041,
    longitude: 77.1025
  }
};

const chartResults = calculator.processChart(swissEphemerisData);
console.log(chartResults);
*/