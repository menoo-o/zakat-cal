  // app/data-component.tsx
async function getRates() {
  const res = await fetch(
    'https://api.metals.dev/v1/latest?api_key=18WGQCAOAVT6DMMAMFII467MAMFII&currency=USD&unit=g',
    {
      next: { tags: ['daily-updates'] },
    }
  )

  const data = await res.json()

  // Return ONLY what you need
  return {
    gold: data.metals.gold,
    silver: data.metals.silver,
  }
}

export default getRates