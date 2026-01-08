export interface CategoryReq {
  categoryPk: string
  categoryName: string
}

export interface CategoryForm {
  categoryPk?: string
  categoryName: string
  categoryType: string
}

export interface CategoryList {
  CategoryList: CategoryReq[]
}
