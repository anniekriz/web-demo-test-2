import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../payload.config'

const heroBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAIAAADW1PEeAAABW0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4G0GkwABdC8lNQAAAABJRU5ErkJggg=='
const aboutBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAIAAADW1PEeAAABW0lEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4G0GkQAB4rta8QAAAABJRU5ErkJggg=='

async function base64ToFile(filename: string, data: string) {
  const output = path.join(process.cwd(), 'scripts', filename)
  await fs.writeFile(output, Buffer.from(data, 'base64'))
  return output
}

async function seed() {
  const payload = await getPayload({ config })

  const heroPath = await base64ToFile('hero.png', heroBase64)
  const aboutPath = await base64ToFile('about.png', aboutBase64)

  const users = await payload.find({ collection: 'users', limit: 1 })
  if (!users.docs.length) {
    await payload.create({
      collection: 'users',
      data: { email: 'admin@example.com', password: 'admin12345' },
    })
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 1,
    limit: 1,
  })

  if (existing.docs.length) {
    console.log('Seed hotový: stránka home už existuje.')
    return
  }

  const heroMedia = await payload.create({
    collection: 'media',
    data: { alt: 'Hero obrázek pro Neo World Weby' },
    filePath: heroPath,
  })

  const aboutMedia = await payload.create({
    collection: 'media',
    data: { alt: 'Obrázek sekce o projektu' },
    filePath: aboutPath,
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Domů',
      slug: 'home',
      heroHeadline: 'Vítejte v Neo World Weby',
      heroSubheadline: 'Jednoduchý web postavený na Next.js 15 a Payload CMS.',
      heroCtaText: 'Zjistit víc',
      heroImage: heroMedia.id,
      aboutHeading: 'O projektu',
      aboutBody:
        'Tento demo projekt ukazuje, jak propojit Next.js 15, Payload CMS a PostgreSQL do jednoduchého, ale praktického webu s editací obsahu v reálném čase.',
      aboutImage: aboutMedia.id,
    },
  })

  console.log('Seed dokončen: vytvořena stránka /home a 2 média.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
