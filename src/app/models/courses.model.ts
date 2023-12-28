export interface Course {
  courseName: string
  author: string
  actualPrice: number
  discountPrice?: number
  discountPercentage: string
  tags: string[]
}
