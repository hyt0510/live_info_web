export interface ArtistLink {
  type: "instagram" | "tiktok" | "twitter" | "youtube" | "website" | "bandcamp"
  url: string
}

export interface Artist {
  name: string
  color: "cyan" | "purple" | "lime"
  image: string
  objectFit: "cover" | "contain"
  instagram?: string  // InstagramのURL（オプション・後方互換性のため）
  links?: ArtistLink[]  // 複数のリンク（オプション）
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
