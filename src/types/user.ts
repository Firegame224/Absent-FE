// model User {
//   id       String  @id @default(uuid())
//   email    String  @unique
//   password String?
//   name     String?
//   image String  @default("https://i.pinimg.com/736x/5e/39/6b/5e396bb1b17681759922dd10f8a9d702.jpg")

//   role Role @default(User)

//   absens    AbsenUser[]
//   createdAt DateTime    @default(now())
//   updateAt  DateTime    @updatedAt
// }

export type User = {
  id: string
  email: string
  name: string
  image: string
  role: string
  absen: []
  createdAt: Date
  updateAt: string
}

export type UpdateUser = {
  userId : string
  email : string
  name : string
  role : string
}
