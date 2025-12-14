/**
 * API 요청 방식 정의
 */
export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod]

/**
 * API 요청시 content type 정의
 */
export const ContentEnum = {
  JSON: 'application/json',
  FORM_URLENCODED: 'application/x-www-form-urlencoded;',
  FORM_DATA: 'multipart/form-data',
} as const
export type ContentEnum = (typeof ContentEnum)[keyof typeof ContentEnum]
