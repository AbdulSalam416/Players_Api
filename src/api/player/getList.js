// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------


import Player from '../../db/model/player';
import PlayerSkill from '../../db/model/playerSkill';


export default async (req, res,next) => {

  try {
    const players = await Player.findAll({
      include: [
        {
          model: PlayerSkill,
          as: 'playerSkills',
        },
      ],
    });

    res.status(200).json(players);
  } catch (error) {
    next(error); 
    console.log(error)
  }
 
}