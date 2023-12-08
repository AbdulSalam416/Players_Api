const validatePlayer = (player) => {
    const { name, position, playerSkills } = player;
    const availablePositions = ['defender', 'midfielder', 'forward'];
    const availableSkills = ['defense', 'attack', 'speed', 'strength', 'stamina'];
  

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return { isValid: false, message: 'Player name is required and must be a non-empty string' };
    }
  
    if (!position || typeof position !== 'string' || !availablePositions.includes(position)) {
      return {
        isValid: false,
        message: `Invalid value for position: ${position}. Available positions are ${availablePositions.join(', ')}`,
      };
    }
  
    
    if (!playerSkills || !Array.isArray(playerSkills) || playerSkills.length === 0) {
      return { isValid: false, message: 'Player must have at least one skill' };
    }
  

    for (const skill of playerSkills) {
      const { skill: skillName, value } = skill;
      if (!skillName || !availableSkills.includes(skillName)) {
        return {
          isValid: false,
          message: `Invalid skill name: ${skillName}. Available skills are ${availableSkills.join(', ')}`,
        };
      }
  
      if (typeof value !== 'number' || value < 0 || value > 100) {
        return { isValid: false, message: `Invalid value for ${skillName}: ${value}. Value must be between 0 and 100` };
      }
    }
  
    return { isValid: true, message: 'Player data is valid' };
  };
  
  

  export default validatePlayer;