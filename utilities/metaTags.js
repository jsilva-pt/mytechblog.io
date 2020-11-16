export default function metaTags({
  title = 'MyTechBlog',
  description,
  isTitlePrepended = false,
  isTitlePrefixed = true,
}) {
  const template = (chunk) =>
    `${isTitlePrepended ? 'MyTechBlog — ' : ''}${chunk}${
      isTitlePrefixed ? ' — MyTechBlog' : ''
    }`

  return [
    {
      hid: 'description',
      name: 'description',
      content: description,
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
}
