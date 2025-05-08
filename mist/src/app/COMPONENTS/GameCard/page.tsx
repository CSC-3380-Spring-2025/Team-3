import React, {ReactElement} from 'react'
import  Link  from 'next/link'
import Game from '../../types/game.interface'

interface Props 
{
    content: Game
}

const GameCard = ({content}: Props): ReactElement => 
{
    const {id, title, thumbnail, short_description, genre} = content
    const link = '/game/${id}'
    
    return(
        <Link to={Link}>
            <img alt={`${title} logo`} src={thumbnail} />
            <h2>{title}</h2>
            <p>{short_description}</p>
            <p>{genre}</p>
        </Link>
    )
}

export default GameCard