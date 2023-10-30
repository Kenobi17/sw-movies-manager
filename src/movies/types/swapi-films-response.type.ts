import { Film } from "./film.type"

export type FilmsResponse = {
  count: number
  next: null
  previous: null
  results: Film[]
}
