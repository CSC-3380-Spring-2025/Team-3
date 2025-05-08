export type Game = {
    id: number
    title: string
    thumbnail: string
    short_description: string
    game_url: string
    genre: string
    platform: string
    publisher: string
    developer: string
    release_date: string
    freetogame_profile_url: string
}

/*
This is mainly for the reason of creating a pull request to fix the error I caused when pushing changes I made in the development
branch instead of making those changes in a separate branch and pulling to development. I added and edited code to make sure we could
log in to our accounts after making them without using API requests. We instead wanted to use simple fetch requests and were able to
implement that.
*/