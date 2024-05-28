export default function isStorage (data: any): Storage {
  if (!(data instanceof Storage)) {
    throw new Error(`${data} should be a instance of Storage`)
  }

  return data
}
