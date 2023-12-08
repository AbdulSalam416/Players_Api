// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------


import Player from '../../db/model/player';
import PlayerSkill from '../../db/model/playerSkill';
import validatePlayer from './validatePlayer';



export default async (req, res, next) => {

    try {
      console.log(req.body)

      const { name, position, playerSkills } = req.body;

  
      const validation = validatePlayer({ name, position, playerSkills });
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }
  
    
      const newPlayer = await Player.create({ name, position });
  
      if (playerSkills && playerSkills.length > 0) {
        const createdSkills = await Promise.all(playerSkills.map(async (skill) => {
          const createdSkill = await PlayerSkill.create({
            skill: skill.skill,
            value: skill.value,
            PlayerId: newPlayer.id,
          });
          return createdSkill;
        }));
  
        newPlayer.playerSkills = createdSkills;
      }
  
      res.status(201).json({
        id: newPlayer.id,
        name: newPlayer.name,
        position: newPlayer.position,
        playerSkills: newPlayer.playerSkills,
      });
    } catch (error) {
      next(error); 
      console.log(error)
    }
  };