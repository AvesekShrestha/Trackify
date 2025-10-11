interface ReportResponseData {
  _id: string
  amount: number
  date?: string
}

interface ReportFormatedData {
  name: string
  value: number
  color?: string
}


export { ReportResponseData, ReportFormatedData }
