import { HttpResponse, http } from "msw"

export const authApiHandlers = [
  http.get('/api/user', async () => {
    return HttpResponse.json('John Smith')
  })
]