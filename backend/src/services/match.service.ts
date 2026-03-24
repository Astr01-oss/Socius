import { likes } from "../data/likes";
import { matches } from "../data/matches";


export const likeUser = (from : string, to : string) => {
  likes.push({ from, to})

  const isMutual = likes.find(
    (like) => like.from === to && like.from === from
  )


  if (isMutual){
    matches.push({users: [from, to]})
    return {match: true}
  }
  return {match: false}
}
export const getMathes = (userId : string) => {
    return matches.filter(
      (match) => match.users[0] === userId || match.users[1] === userId
    )
  }