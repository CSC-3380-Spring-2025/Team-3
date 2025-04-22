import React, { useEffect, ReactElement, useState } from 'react'
import axios from 'axios'
import GameListRender from './GameList.render'
import {Game} from 'types'
import {API_KEY, API_HOST} from './constants'

const GameList = (): ReactElement =>
{
    const [games, setGames] = useState<Game[]>([])
    const [error, setErr] = useState<string>('')

    useEffect(() => 
    {
        axios
        .get('/games', 
        {
            baseURL: `https://${API_HOST}/api`,
            headers: 
            {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST,
            },
            params: 
            {
                platform: 'browser'
            }
        })
        .then(res => setGames(res.data))
        .catch(e => setErr(e.message))
    }, [])
    return <GameListRender err={err} games={games} />
}

export default GameList