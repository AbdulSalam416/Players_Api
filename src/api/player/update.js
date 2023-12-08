// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from '../../db/model/player';
import Skill from '../../db/model/playerSkill';


export default async (req, res,next) => {
  const playerId = req.params.playerId; 
  const { name, position, playerSkills } = req.body;

  try {
   
    const player = await Player.findByPk(playerId, {
      include: [{ model: Skill, as: 'playerSkills' }],
    });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    player.name = name || player.name; 
    player.position = position || player.position; 

    
    if (playerSkills && playerSkills.length > 0) {
      await Promise.all(playerSkills.map(async (skill) => {
        let existingSkill = player.playerSkills.find((ps) => ps.skill === skill.skill);

        if (existingSkill) {
          existingSkill.value = skill.value;
          await existingSkill.save();
        } else {
          const newSkill = await Skill.create({
            skill: skill.skill,
            value: skill.value,
            PlayerId: player.id,
          });
          player.playerSkills.push(newSkill);
        }
      }));
    }

    
    await player.save();

    
    res.status(200).json({
      id: player.id,
      name: player.name,
      position: player.position,
      playerSkills: player.playerSkills,
    });
  } catch (error) {
    next(error); 
    console.log(error)
  }
}