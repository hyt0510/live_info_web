export interface Artist {
  name: string
  color: "cyan" | "purple" | "lime"
  image: string
  objectFit: "cover" | "contain"
  instagram?: string  // InstagramのURL（オプション）
}

export interface ArtistsData {
  day1: Artist[]
  day2: Artist[]
}

export interface TimetableItem {
  time: string
  artist?: string
  event?: string
  color: "cyan" | "purple" | "lime" | "muted"
}

export interface TimetableData {
  day1: TimetableItem[]
  day2: TimetableItem[]
}
