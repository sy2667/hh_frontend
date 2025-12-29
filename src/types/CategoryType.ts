export interface CategoryReq {
  categoryPk: string
  categoryName: string
}

export interface CategoryForm {
  categoryName: string
  categoryType: string
}

export interface CategoryList {
  CategoryList: CategoryReq[]
}
