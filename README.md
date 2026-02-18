# Neo World Weby

Demo projekt s **Next.js 15 + Payload CMS + PostgreSQL**.

## Co projekt umí

- Jedna dynamická stránka přes `app/[slug]/page.tsx` s podporou `/home`.
- Admin UI Payload na `/admin`.
- Kolekce `pages` a `media`.
- Seed skript vytvoří:
  - 1 stránku (`slug: home`) s českým obsahem
  - 2 média (hero + about) s českým `alt`
  - admin uživatele `admin@example.com` / `admin12345`
- View/Edit režim:
  - defaultně View
  - pokud je uživatel přihlášený v Payload, zobrazí se tlačítko `Edit`
  - v Edit režimu jsou nahoře `Uložit` + `Exit`
  - inline text editace přes `contenteditable`
  - změna obrázku s okamžitým náhledem (cover crop, stabilní layout)
  - při výběru obrázku se vyžaduje ALT přes modal
  - `Exit` potvrzuje neuložené změny

## Požadavky

- Node.js 20+
- Docker + Docker Compose

## Environment proměnné

Vytvořte `.env` dle `.env.example`:

```env
DATABASE_URL=postgres://payload:payload@localhost:5432/payload
PAYLOAD_SECRET=replace-with-long-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Spuštění lokálně

1. Instalace závislostí:

```bash
npm install
```

2. Start PostgreSQL:

```bash
docker compose up -d
```

3. Seed dat:

```bash
npm run seed
```

4. Start aplikace:

```bash
npm run dev
```

5. Otevřete:

- Web: `http://localhost:3000/home`
- Admin: `http://localhost:3000/admin`

## Poznámky k přístupům

- `pages.update` a `media.create/update` jsou povoleny pouze přihlášeným uživatelům.
- Frontend používá `GET /api/users/me` pro zjištění přihlášení.
- Ukládání používá Payload REST API (`PATCH /api/pages/:id`, `POST /api/media`) s `credentials: include`.

