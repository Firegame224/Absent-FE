export type Absen = {
  tanggal: string
  Alpha: number
  Hadir: number
  Izin: number
  Terlambat: number
}

export type AbsenTodayType = {
  id: string
  tanggal: string
  userAbsens: userAbsen[]
}

export type userAbsen = {
  userId: string
  absenId: string
  status: string
  absen_status: boolean
}
