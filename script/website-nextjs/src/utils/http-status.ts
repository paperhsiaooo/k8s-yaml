export const isHttpError = (httpStatus: number): boolean => {
  return httpStatus >= 400 && httpStatus < 600
}
