import { Dispatch, SetStateAction } from 'react'

export interface IResponse {
  data: {
    url: string
    key: string
    shrtlnk: string
  }
}

export interface ILink {
  key: string
  shrtlnk: string
  url: string
  index: number
}

export class LinkClass implements ILink {
  key: string
  shrtlnk: string
  url: string
  index: number
  static readonly index: number = 0
  constructor(key: string, shrtlnk: string, url: string) {
    this.key = key
    this.shrtlnk = shrtlnk
    this.url = url
    this.index = Date.now()
  }
}

export type SetValue<T> = Dispatch<SetStateAction<T>>
export type StoredValueFunction<T> = (storedValue: T) => T
export type ValueType<T> = T | StoredValueFunction<T>
