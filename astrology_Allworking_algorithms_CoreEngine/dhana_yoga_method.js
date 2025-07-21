/**
 * Detect Dhana Yoga (wealth combinations) in the chart
 * Dhana Yoga is formed by connections between wealth houses (2nd, 5th, 9th, 11th)
 * and their lords, especially involving benefic planets
 */
detectDhanaYoga(planetPositions, houseCusps) {
  const dhanaYogas = [];
  
  // Define wealth-related houses
  const wealthHouses = [2, 5, 9, 11]; // 2nd=wealth, 5th=gains, 9th=fortune, 11th=income
  const kendraHouses = [1, 4, 7, 10]; // Angular houses
  const trikonaHouses = [1, 5, 9]; // Trine houses
  
  // Get house lords based on house cusps
  const houseLords = this.calculateHouseLords(houseCusps);
  
  // 1. Check for connections between wealth house lords
  const wealthHouseLords = wealthHouses.map(house => houseLords[house - 1]);
  
  // 2. Check for benefic planets in wealth houses
  const beneficPlanets = ['VENUS', 'JUPITER', 'MERCURY']; // Mercury is neutral but generally benefic
  const strongBenefics = ['VENUS', 'JUPITER'];
  
  // Type 1: Wealth house lords in conjunction or mutual aspect
  for (let i = 0; i < wealthHouseLords.length; i++) {
    for (let j = i + 1; j < wealthHouseLords.length; j++) {
      const lord1 = wealthHouseLords[i];
      const lord2 = wealthHouseLords[j];
      
      if (lord1 && lord2 && planetPositions[lord1] && planetPositions[lord2]) {
        const aspect = this.calculateAspectBetweenPlanets(
          planetPositions[lord1].longitude,
          planetPositions[lord2].longitude
        );
        
        if (aspect && (aspect.type === 'Conjunction' || aspect.type === 'Trine')) {
          const houses = [wealthHouses[i], wealthHouses[j]];
          dhanaYogas.push({
            name: 'Dhana Yoga',
            type: 'Wealth Lords Connection',
            strength: this.calculateDhanaYogaStrength(lord1, lord2, aspect.type, houses),
            description: `${lord1} (${this.getOrdinalHouse(houses[0])} lord) and ${lord2} (${this.getOrdinalHouse(houses[1])} lord) form ${aspect.type}`,
            effects: 'Multiple sources of wealth, financial prosperity, good fortune',
            planets: [lord1, lord2],
            houses: houses
          });
        }
      }
    }
  }
  
  // Type 2: Strong benefics in wealth houses
  for (const planet of strongBenefics) {
    if (planetPositions[planet]) {
      const planetHouse = this.getPlanetHouse(planetPositions[planet].longitude, houseCusps);
      
      if (wealthHouses.includes(planetHouse)) {
        const dignity = this.calculatePlanetaryDignity(planet, planetPositions[planet].longitude);
        
        if (dignity.strength > 60) { // Strong placement
          dhanaYogas.push({
            name: 'Dhana Yoga',
            type: 'Benefic in Wealth House',
            strength: Math.min(90, dignity.strength + 10),
            description: `${planet} strongly placed in ${this.getOrdinalHouse(planetHouse)} house`,
            effects: planet === 'JUPITER' ? 'Wealth through wisdom, teaching, or spiritual pursuits' : 'Wealth through beauty, arts, luxury goods, or relationships',
            planets: [planet],
            houses: [planetHouse]
          });
        }
      }
    }
  }
  
  // Type 3: Wealth house lords in Kendra or Trikona
  for (let i = 0; i < wealthHouseLords.length; i++) {
    const lord = wealthHouseLords[i];
    if (lord && planetPositions[lord]) {
      const lordHouse = this.getPlanetHouse(planetPositions[lord].longitude, houseCusps);
      
      if (kendraHouses.includes(lordHouse) || trikonaHouses.includes(lordHouse)) {
        const dignity = this.calculatePlanetaryDignity(lord, planetPositions[lord].longitude);
        
        if (dignity.strength > 50) {
          dhanaYogas.push({
            name: 'Dhana Yoga',
            type: 'Wealth Lord in Kendra/Trikona',
            strength: Math.min(85, dignity.strength + 15),
            description: `${lord} (${this.getOrdinalHouse(wealthHouses[i])} lord) in ${this.getOrdinalHouse(lordHouse)} house`,
            effects: 'Stable and sustained wealth, financial security',
            planets: [lord],
            houses: [wealthHouses[i], lordHouse]
          });
        }
      }
    }
  }
  
  // Type 4: 2nd and 11th lord connection (classic Dhana Yoga)
  const secondLord = houseLords[1]; // 2nd house lord
  const eleventhLord = houseLords[10]; // 11th house lord
  
  if (secondLord && eleventhLord && planetPositions[secondLord] && planetPositions[eleventhLord]) {
    const aspect = this.calculateAspectBetweenPlanets(
      planetPositions[secondLord].longitude,
      planetPositions[eleventhLord].longitude
    );
    
    if (aspect && (aspect.type === 'Conjunction' || aspect.type === 'Trine' || aspect.type === 'Sextile')) {
      dhanaYogas.push({
        name: 'Dhana Yoga',
        type: 'Classic 2nd-11th Lord Connection',
        strength: 85,
        description: `2nd lord (${secondLord}) and 11th lord (${eleventhLord}) form ${aspect.type}`,
        effects: 'Excellent wealth accumulation, multiple income sources, financial gains',
        planets: [secondLord, eleventhLord],
        houses: [2, 11]
      });
    }
  }
  
  // Type 5: Lakshmi Yoga (Venus-Jupiter connection in wealth houses)
  if (planetPositions.VENUS && planetPositions.JUPITER) {
    const venusHouse = this.getPlanetHouse(planetPositions.VENUS.longitude, houseCusps);
    const jupiterHouse = this.getPlanetHouse(planetPositions.JUPITER.longitude, houseCusps);
    
    const aspect = this.calculateAspectBetweenPlanets(
      planetPositions.VENUS.longitude,
      planetPositions.JUPITER.longitude
    );
    
    if (aspect && aspect.type === 'Conjunction' && wealthHouses.includes(venusHouse)) {
      dhanaYogas.push({
        name: 'Lakshmi Yoga',
        type: 'Venus-Jupiter in Wealth House',
        strength: 95,
        description: `Venus and Jupiter conjunct in ${this.getOrdinalHouse(venusHouse)} house`,
        effects: 'Abundance, luxury, wealth through multiple sources, divine blessings',
        planets: ['VENUS', 'JUPITER'],
        houses: [venusHouse]
      });
    }
  }
  
  // Type 6: Check for exalted planets in wealth houses
  for (const [planet, position] of Object.entries(planetPositions)) {
    if (this.EXALTATION_DEGREES[planet]) {
      const dignity = this.calculatePlanetaryDignity(planet, position.longitude);
      const planetHouse = this.getPlanetHouse(position.longitude, houseCusps);
      
      if (dignity.dignity === 'Exaltation' && wealthHouses.includes(planetHouse)) {
        dhanaYogas.push({
          name: 'Dhana Yoga',
          type: 'Exalted Planet in Wealth House',
          strength: 90,
          description: `Exalted ${planet} in ${this.getOrdinalHouse(planetHouse)} house`,
          effects: 'Exceptional wealth potential, prosperity through the significations of the exalted planet',
          planets: [planet],
          houses: [planetHouse]
        });
      }
    }
  }
  
  // Filter out weak yogas and return only significant ones
  return dhanaYogas.filter(yoga => yoga.strength > 65);
}

/**
 * Calculate strength of Dhana Yoga based on planets involved
 */
calculateDhanaYogaStrength(planet1, planet2, aspectType, houses) {
  let baseStrength = 70;
  
  // Boost for strong benefics
  const strongBenefics = ['VENUS', 'JUPITER'];
  if (strongBenefics.includes(planet1)) baseStrength += 10;
  if (strongBenefics.includes(planet2)) baseStrength += 10;
  
  // Boost for aspect type
  const aspectBonus = {
    'Conjunction': 15,
    'Trine': 10,
    'Sextile': 5
  };
  baseStrength += aspectBonus[aspectType] || 0;
  
  // Boost for important wealth houses
  const houseBonus = {
    2: 10,  // Primary wealth house
    11: 8,  // Gains house
    5: 6,   // Investment/speculation
    9: 5    // Fortune house
  };
  
  for (const house of houses) {
    baseStrength += houseBonus[house] || 0;
  }
  
  return Math.min(100, baseStrength);
}

/**
 * Calculate house lords based on house cusps
 * This is a simplified version - full implementation would consider exact degrees
 */
calculateHouseLords(houseCusps) {
  const houseLords = [];
  
  // Rulership mapping (simplified)
  const signRulers = {
    0: 'MARS',    // Aries
    1: 'VENUS',   // Taurus
    2: 'MERCURY', // Gemini
    3: 'MOON',    // Cancer
    4: 'SUN',     // Leo
    5: 'MERCURY', // Virgo
    6: 'VENUS',   // Libra
    7: 'MARS',    // Scorpio
    8: 'JUPITER', // Sagittarius
    9: 'SATURN',  // Capricorn
    10: 'SATURN', // Aquarius
    11: 'JUPITER' // Pisces
  };
  
  for (const cusp of houseCusps) {
    const sign = Math.floor(cusp / 30);
    houseLords.push(signRulers[sign]);
  }
  
  return houseLords;
}

/**
 * Helper method to get ordinal house names
 */
getOrdinalHouse(houseNumber) {
  const ordinals = {
    1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th',
    7: '7th', 8: '8th', 9: '9th', 10: '10th', 11: '11th', 12: '12th'
  };
  return ordinals[houseNumber] || `${houseNumber}th`;
}