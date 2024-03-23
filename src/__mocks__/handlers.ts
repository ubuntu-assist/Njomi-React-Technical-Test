import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { IResponse } from '../types'

/**
 * Creates a mock response object for the API.
 * @param originalUrl the original URL that was requested
 * @returns the mock response object
 */
function createResponse(originalUrl: string): IResponse {
  const response = {
    data: {
      key: `key=${Math.random() * 100}`,
      shrtlnk: 'mockTestShort',
      url: `http://${originalUrl}`,
    },
  }
  return response
}

const handlers = rest.get(
  'https://shrtlnk.dev/api/v2/link',
  (req, res, ctx) => {
    const originalUrl = req.url.searchParams.get('url') as string
    const response = createResponse(originalUrl)
    return res(ctx.json(response.data))
  }
)

const server = setupServer(handlers)
export default server
