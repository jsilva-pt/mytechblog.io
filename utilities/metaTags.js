export default function metaTags({
  title = 'MyTechBlog',
  description,
  publishedTime,
  modifiedTime,
  isTitlePrepended = false,
  isTitlePrefixed = true,
}) {
  const template = (chunk) =>
    `${isTitlePrepended ? 'MyTechBlog — ' : ''}${chunk}${
      isTitlePrefixed ? ' — MyTechBlog' : ''
    }`

  const author = 'José Silva'

  const metas = [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'author',
      name: 'author',
      content: author,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      template: (chunk) => template(chunk),
      content: title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      template: (chunk) => template(chunk),
      content: title,
    },
    {
      hid: 'twitter:description',
      property: 'twitter:description',
      content: description,
    },
  ]

  if (publishedTime) {
    metas.push(
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'article',
      },
      {
        hid: 'article:author',
        name: 'article:author',
        content: author,
      },
      {
        hid: 'article:published_time',
        name: 'article:published_time',
        content: publishedTime,
      }
    )

    if (modifiedTime) {
      metas.push({
        hid: 'article:modified_time',
        name: 'article:modified_time',
        content: modifiedTime,
      })
    }
  }

  return metas
}
