import { api } from '../client'
import type { CategoryForm } from '@app-types/CategoryType'

export const createCategory = async (form: CategoryForm) => {
  const res = await api.post('/categories', form)

  return res.data
}

export const getCategory = async (categoryType: string) => {
  const res = await api.get('/categories/type', {
    params: {
      type: categoryType,
    },
  })

  //console.log(res.data)

  return res.data
}
