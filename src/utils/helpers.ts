import type { Timestamp } from 'firebase/firestore'
import dayjs from 'dayjs'

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const formatFirebaseTimestamp = (timestamp: Timestamp) => {
  return dayjs(timestamp.toDate()).format('DD:MM:YYYY HH:mm:ss')
}

export const convertArrayToCommaSeperatedList = (list: string[]) => {
  return list.join(', ')
}

export const removeDuplicatesFromArray = (array: any[]) => {
  return [...new Set(array)]
}
