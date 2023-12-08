// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from '../../db/model/player';

export default async (req, res,next) => {
  const playerId = req.params.playerId; 
  const token = req.headers.authorization;

  const expectedToken = 'Bearer SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE=';
  if (!token || token !== expectedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {


    
    const player = await Player.findByPk(playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    await player.destroy();

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    next(error); 
    console.log(error)
  
  }}
