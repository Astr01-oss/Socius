import { useState } from "react";
import { User } from '@/entities/user/model/types'

export const useSwipe = (users : User[]) => {
  const [index, setIndex] = useState(0)

  const like = () => {
    setIndex(prev => prev + 1)
  }
  const dislike = () => {
    setIndex(prev => prev + 1)
  }

  return {
    currentUser : users[index],
    like,
    dislike
  }
}