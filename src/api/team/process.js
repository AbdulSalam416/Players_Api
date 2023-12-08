// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from '../../db/model/player';
export default async (req, res,next) => {

  const teamRequirements = req.body;

  try {
    
    const allPlayers = await Player.findAll();

    const selectedTeam = {};


    for (const requirement of teamRequirements) {
      const { position, mainSkill, numberOfPlayers } = requirement;

      const playersByPosition = allPlayers.filter(player => player.position === position);

      if (playersByPosition.length < numberOfPlayers) {
        return res.status(400).json({ message: `Insufficient number of players for position: ${position}` });
      }
      const playersWithSkill = playersByPosition.filter(player => {
        
        const skill = player.playerSkills.find(skill => skill.skill === mainSkill);

        
        if (!skill) {
          return true;
        }

        return playersByPosition.every(otherPlayer => {
          const otherPlayerSkill = otherPlayer.playerSkills.find(sk => sk.skill === mainSkill);
          return otherPlayerSkill.value <= (skill.value || 0);
        });
      });

      
      const selectedPlayers = playersWithSkill.length > 0 ? playersWithSkill.slice(0, numberOfPlayers) : playersByPosition.slice(0, numberOfPlayers);

      selectedTeam[position] = selectedPlayers.map(player => ({
        name: player.name,
        position: player.position,
        playerSkills: player.playerSkills.filter(skill => skill.skill === mainSkill),
      }));
    }


    res.status(200).json(Object.values(selectedTeam).flat());
  } catch (error) {
    next(error); 
    console.log(error)
  }
}
