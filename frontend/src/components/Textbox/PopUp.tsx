import { Heading, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import usePlayersInTown from '../../hooks/usePlayersInTown';
import ConversationAreasList from './ConversationAreasList';
import PlayersList from './PlayersList';
import Textbox from './frontend/src/classes/Player';


function PlayerInList(playerID: string) : JSX.Element {

    const player = usePlayersInTown().find(player2 => player2.id === playerID);
  
    // checks if a player is undefined
    if (player === undefined) {
      return <li key='undefined'>undefined</li>
    }
  
    // returns and calls a players name
    return <>
      <li key={player.id}>{PlayerName({player})}</li>
    </>
  
  }
  
// edit align to follow player
export default function PopUp(): JSX.Element {
    return (
      <VStack align="left"
        spacing={2}
        border='2px'
        padding={2}
        marginLeft={2}
        borderColor='gray.500'
        height='5%'
        divider={<StackDivider borderColor='gray.200' />}
        borderRadius='4px'>
          <Heading fontSize='xl' as='h1'>Info</Heading>
        <Textbox />
      </VStack>
    );
  }