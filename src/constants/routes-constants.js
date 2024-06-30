export const ROUTE_PATH = {
  ROOT_PATH: '/',
  ARTICLES: '/articles/',
  ARTICLE_WITH_SLUG: '/articles/:slug',
  EDIT_ARTICLE: '/articles/:slug/edit',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  NEW_ARTICLE: '/new-article',
}

export const ROUTE_PATH_TEMPLATES = {
  ARTICLE_WITH_SLUG(slug) {
    return `/articles/${slug}`
  },
  EDIT_ARTICLE(slug) {
    return `/articles/${slug}/edit`
  },
  ARTICLES_PAGES(page) {
    return `/articles/?page=${page}`
  },
}
