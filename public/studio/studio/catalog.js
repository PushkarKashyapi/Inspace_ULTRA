/* InspaceCraft Discovery Studio · catalogue
   Everything the studio sells lives here: packages, materials, colours, mood boards,
   rates and standard quantities. Change this file and the whole studio follows. */
window.IC_CATALOG = {
  version: '2026.11',
  brand: { name: 'InspaceCraft', city: 'Ranchi', address: '2nd Floor, Ekatvam Heights, Kokar Kantatoli Road, Ranchi', phone: '+91 90318 00901', email: 'inspacecraft@gmail.com', portal: 'studio.inspacecraft.com' },

  bhk: ['1 BHK', '2 BHK', '3 BHK', '3+ BHK'],
  stdArea: [550, 900, 1250, 1700],
  gst: 18,
  fee: 0,

  tiers: {
    b: { name: 'Essential', tag: 'For homes to be rented out', days: 45, warranty: '5 years' },
    s: { name: 'Comfort', tag: 'Most chosen', days: 50, warranty: '10 years' },
    p: { name: 'Luxury', tag: 'Best of design and style', days: 60, warranty: '15 years' }
  },

  /* Same room in each package. Replace each img with your own or AI images of that room (files go in img/). */
  roomCompare: [
    /* Same room, three packages. Photos live in img/compare/<room>-<essential|comfort|luxury>.webp */
    { key: 'living', name: 'Living room',
      notes: { b: 'Floating laminate TV unit, texture paint accent wall, plain gypsum ceiling, fabric sofa', s: 'Sage fluted panel TV wall, oak woodgrain TV unit, cove ceiling with profile lights, velvet sofa', p: 'Walnut slat wall with brass strips, marble-top TV unit, layered cove ceiling with designer pendant, marble floor' } },
    { key: 'kitchen', name: 'Kitchen',
      notes: { b: 'Matte laminate shutters, black granite top, ceramic wall tiles', s: 'Sage and high-gloss shutters, white quartz top, subway tile backsplash, under-cabinet lights, cove ceiling', p: 'Handle-less graphite cabinets, walnut finish wall units, marble-look stone top and backsplash, built-in oven and microwave' } },
    { key: 'bedroom', name: 'Master bedroom',
      notes: { b: 'Laminate headboard, storage bed, swing laminate wardrobe, plain ceiling with LED panels', s: 'Upholstered headboard, sage fluted wall, high-gloss sliding wardrobe, cove ceiling', p: 'Tall padded headboard with brass trims, walnut slat wall, lit fluted-glass wardrobe, brass pendants, marble floor' } },
    { key: 'kids', name: 'Kids room',
      notes: { b: 'Laminate bed with drawers, open study table, two-tone wardrobe with knobs', s: 'Rounded-edge bed with drawers, study with pin-up board, rainbow wall art, louvred wardrobe, cove ceiling', p: 'Upholstered bed with trundle, walnut study with lit shelves, cloud wallpaper and pendant, glass and lacquer wardrobe, wooden floor' } }
  ],

  /* Offers page. Sample offers: change titles, prices and end dates here. */
  offers: [
    { id: 'kitchen', title: 'Modular kitchen', img: 'k-modern', was: 220000, now: 179000, ends: '2026-12-31', note: 'L-shaped kitchen up to 10 ft with quartz top and soft-close drawers.' },
    { id: 'wardrobe', title: 'Sliding wardrobe', img: 'b-wardrobe', was: 95000, now: 78000, ends: '2026-12-31', note: '7 ft sliding wardrobe with loft in acrylic finish.' },
    { id: 'ceiling', title: 'False ceiling, full home', img: 'x-ceiling', was: 85000, now: 69000, ends: '2026-12-15', note: 'Gypsum ceiling with cove lighting for a 2 BHK.' },
    { id: 'tv', title: 'TV unit with fluted wall', img: 'l-tv', was: 60000, now: 48000, ends: '2026-12-15', note: 'Floating TV unit with fluted back panel, up to 8 ft.' },
    { id: 'pooja', title: 'Pooja unit', img: 'x-pooja', was: 32000, now: 26000, ends: '2026-12-31', note: 'CNC jaali pooja unit with back lighting.' },
    { id: 'kids', title: 'Kids room package', img: 'c-colorpop', was: 120000, now: 99000, ends: '2026-12-31', note: 'Bed with storage, study table and wardrobe.' }
  ],
  requestRooms: ['Living room', 'Kitchen', 'Master bedroom', 'Kids room', 'Bedroom 2', 'Pooja room', 'Full home'],
  promptIdeas: ['Warm wood and white', 'Lots of storage', 'Modern and minimal', 'Pastel kids room', 'Luxury with brass', 'Easy to clean for monsoon'],
  materials: [
    ['Carcass', ['BWR plywood (IS 303)', 'BWP ply in kitchen, BWR elsewhere', 'BWP marine ply throughout']],
    ['Shutters', ['1 mm matte laminate', 'Acrylic or high-gloss laminate', 'PU lacquer, veneer or fluted glass']],
    ['Hardware', ['Soft-close hinges, SS channels', 'Hettich or equal, tandem drawers', 'Blum or equal, lift-ups, magic corner']],
    ['Countertop', ['Granite', 'Quartz', 'Sintered stone']],
    ['False ceiling', ['Plain gypsum, LED panels', 'Gypsum with cove and profile lights', 'Multi-level, veneer inlay, COB spots']],
    ['Walls', ['Economy emulsion, texture accent', 'Premium emulsion, fluted panels', 'Luxury emulsion, veneer slats']]
  ],

  /* ---------- Colours and finishes ---------- */
  codes: { paint: 'P', shutter: 'S', wood: 'W', fabric: 'F', metal: 'M', stone_b: 'G', stone_s: 'Q', stone_p: 'SS', floor: 'FL', tile: 'T' },
  swatches: {
    paint: [
      { id: 'chalk', name: 'Chalk White', hex: '#F2F0EB' }, { id: 'warmwhite', name: 'Warm White', hex: '#F4EFE6' },
      { id: 'linen', name: 'Linen', hex: '#EDE3D3' }, { id: 'greige', name: 'Greige', hex: '#CFC6BA' },
      { id: 'sagemist', name: 'Sage Mist', hex: '#C9D1BC' }, { id: 'powder', name: 'Powder Blue', hex: '#CDDBE3' },
      { id: 'blushp', name: 'Blush Pink', hex: '#EBD3CC' }, { id: 'lavender', name: 'Lavender', hex: '#D9D2E6' },
      { id: 'mustardp', name: 'Ochre', hex: '#D4A64A' }, { id: 'terracottap', name: 'Terracotta', hex: '#C98A6E' },
      { id: 'olivep', name: 'Olive', hex: '#8E8F6A' }, { id: 'deepgreen', name: 'Deep Green', hex: '#4E6B4A' },
      { id: 'navyp', name: 'Navy', hex: '#34425E' }, { id: 'charcoalp', name: 'Charcoal', hex: '#47464A' }
    ],
    shutter: [
      { id: 'frosty', name: 'Frosty White', hex: '#F3F2EE' }, { id: 'ivory', name: 'Ivory', hex: '#EEE6D6' },
      { id: 'cashmere', name: 'Cashmere', hex: '#D8CAB6' }, { id: 'pebble', name: 'Pebble Grey', hex: '#B5B0A8' },
      { id: 'graphite', name: 'Graphite', hex: '#46484C' }, { id: 'sage', name: 'Sage', hex: '#93A384' },
      { id: 'olive', name: 'Olive', hex: '#6F7552' }, { id: 'forest', name: 'Forest', hex: '#4B6447' },
      { id: 'powderblue', name: 'Powder Blue', hex: '#A9C0CF' }, { id: 'teal', name: 'Teal', hex: '#3F6E7A' },
      { id: 'navy', name: 'Navy', hex: '#2E3C59' }, { id: 'blush', name: 'Blush', hex: '#E2BFB6' },
      { id: 'terracotta', name: 'Terracotta', hex: '#B4664A' }, { id: 'mustard', name: 'Mustard', hex: '#C9A04A' },
      { id: 'lilac', name: 'Lilac', hex: '#B9AECF' }
    ],
    wood: [
      { id: 'ash', name: 'Ash', hex: '#D9CCB8' }, { id: 'lightoak', name: 'Light Oak', hex: '#D3B48A' },
      { id: 'oak', name: 'Natural Oak', hex: '#BE935F' }, { id: 'teak', name: 'Teak', hex: '#8E5D36' },
      { id: 'walnut', name: 'Walnut', hex: '#6B4A33' }, { id: 'wenge', name: 'Wenge', hex: '#3E2D24' }
    ],
    fabric: [
      { id: 'oatmeal', name: 'Oatmeal', hex: '#D8CDBD' }, { id: 'ivoryf', name: 'Ivory', hex: '#EEE7D9' },
      { id: 'stone', name: 'Stone', hex: '#A9A196' }, { id: 'charcoal', name: 'Charcoal', hex: '#4A4A4C' },
      { id: 'sagef', name: 'Sage', hex: '#93A384' }, { id: 'tealf', name: 'Teal', hex: '#3F6E7A' },
      { id: 'navyf', name: 'Navy', hex: '#2E3C59' }, { id: 'sky', name: 'Sky', hex: '#9CC3DE' },
      { id: 'mustardf', name: 'Mustard', hex: '#C9A04A' }, { id: 'rust', name: 'Rust', hex: '#A8553A' },
      { id: 'blushf', name: 'Blush', hex: '#E2B9AE' }, { id: 'lavenderf', name: 'Lavender', hex: '#B8AED3' },
      { id: 'burgundy', name: 'Burgundy', hex: '#7A2E35' }
    ],
    metal: [
      { id: 'black', name: 'Matt Black', hex: '#202021' }, { id: 'brass', name: 'Brushed Brass', hex: '#C3A065' },
      { id: 'chrome', name: 'Chrome', hex: '#D4D7DA' }, { id: 'gunmetal', name: 'Gunmetal', hex: '#5C5F63' },
      { id: 'rosegold', name: 'Rose Gold', hex: '#C89B88' }
    ],
    stone_b: [
      { id: 'blackgalaxy', name: 'Black Galaxy granite', hex: '#5E5E64', tex: 'speckle' },
      { id: 'steelgrey', name: 'Steel Grey granite', hex: '#B9B9BD', tex: 'speckle' },
      { id: 'tanbrown', name: 'Tan Brown granite', hex: '#CC9A70', tex: 'speckle' },
      { id: 'absblack', name: 'Absolute Black granite', hex: '#46464A', tex: 'speckle' }
    ],
    stone_s: [
      { id: 'snow', name: 'Snow White quartz', hex: '#F4F3F0', tex: 'veined' },
      { id: 'carraraq', name: 'Carrara quartz', hex: '#F0EFEB', tex: 'veined' },
      { id: 'concrete', name: 'Concrete Grey quartz', hex: '#B3B1AC', tex: 'speckle' },
      { id: 'sand', name: 'Beige Sand quartz', hex: '#E3D5BE', tex: 'speckle' }
    ],
    stone_p: [
      { id: 'calacatta', name: 'Calacatta Gold', hex: '#F3EDE2', tex: 'veined' },
      { id: 'statuario', name: 'Statuario', hex: '#F5F5F3', tex: 'veined' },
      { id: 'nero', name: 'Nero Marquina', hex: '#F0F0F0', tex: 'darkvein' },
      { id: 'travertine', name: 'Travertine', hex: '#DCCAA9', tex: 'veined' }
    ],
    floor: [
      { id: 'f_lightoak', name: 'Light oak planks', hex: '#DCC096', tex: 'planks' },
      { id: 'f_oak', name: 'Natural oak planks', hex: '#C4996C', tex: 'planks' },
      { id: 'f_walnut', name: 'Walnut planks', hex: '#80593B', tex: 'planks' },
      { id: 'f_white', name: 'White marble', hex: '#F1EFEA', tex: 'marble' },
      { id: 'f_grey', name: 'Grey marble', hex: '#C9C7C3', tex: 'marble' },
      { id: 'f_beige', name: 'Beige vitrified tiles', hex: '#E0D6C4', tex: 'tiles' },
      { id: 'f_greytile', name: 'Grey vitrified tiles', hex: '#BEBCB7', tex: 'tiles' },
      { id: 'f_terracotta', name: 'Terracotta tiles', hex: '#BC7A5E', tex: 'tiles' }
    ],
    tile: [
      { id: 't_white', name: 'Glossy White', hex: '#F4F3EF' }, { id: 't_sage', name: 'Sage', hex: '#A9B79A' },
      { id: 't_blue', name: 'Pale Blue', hex: '#B9CBD7' }, { id: 't_grey', name: 'Dove Grey', hex: '#C0BCB5' },
      { id: 't_blush', name: 'Blush', hex: '#E6C8BE' }, { id: 't_green', name: 'Bottle Green', hex: '#557560' },
      { id: 't_terra', name: 'Terracotta', hex: '#C47E60' }
    ]
  },
  finishes: {
    cabinet: { b: ['matte', 'suede', 'woodgrain'], s: ['gloss', 'matteacr', 'woodgrain'], p: ['lacquer', 'pumatte', 'veneer'] },
    feature: { b: ['texture'], s: ['fluted', 'flutedwood'], p: ['slats'] },
    splash: { b: ['tile'], s: ['tile'], p: ['glass'] }
  },
  finishNames: {
    matte: { name: 'Matte laminate' }, suede: { name: 'Suede laminate' }, woodgrain: { name: 'Woodgrain laminate', wood: true },
    gloss: { name: 'High-gloss acrylic' }, matteacr: { name: 'Matte acrylic' },
    lacquer: { name: 'Gloss PU lacquer' }, pumatte: { name: 'Matte PU' }, veneer: { name: 'Natural veneer', wood: true },
    texture: { name: 'Texture paint', paint: true }, fluted: { name: 'Fluted panel' }, flutedwood: { name: 'Fluted woodgrain', wood: true },
    slats: { name: 'Veneer slats', wood: true }, tile: { name: 'Tiles' }, glass: { name: 'Back-painted glass' }
  },

  /* Elements a customer can colour, and which list each one uses */
  slots: {
    wall: { label: 'Walls', list: 'paint' },
    feature: { label: 'Feature wall', kind: 'feature' },
    arch: { label: 'Painted arch', list: 'paint' },
    sofa: { label: 'Sofa fabric', list: 'fabric' },
    storage: { label: 'TV and crockery units', kind: 'cabinet' },
    table: { label: 'Dining and coffee tables', list: 'wood' },
    curtain: { label: 'Curtains and cushions', list: 'fabric' },
    rug: { label: 'Rug', list: 'fabric' },
    floor: { label: 'Flooring (for visualising)', list: 'floor' },
    metal: { label: 'Handles and metal', list: 'metal' },
    kbase: { label: 'Base cabinets', kind: 'cabinet' },
    kwall: { label: 'Wall cabinets and loft', kind: 'cabinet' },
    counter: { label: 'Countertop', list: 'stone' },
    splash: { label: 'Backsplash', kind: 'splash' },
    wardrobe: { label: 'Wardrobe', kind: 'cabinet' },
    headboard: { label: 'Headboard fabric', list: 'fabric' },
    bedding: { label: 'Bedding', list: 'fabric' },
    kidsAccent: { label: 'Fun colour', kind: 'cabinet' }
  },
  defaults: {
    wall: 'paint:warmwhite', feature: { c: 'paint:greige', f: 'texture' }, arch: 'paint:sagemist', sofa: 'fabric:oatmeal',
    storage: { c: 'wood:oak', f: 'woodgrain' }, table: 'wood:oak', curtain: 'fabric:ivoryf', rug: 'fabric:stone',
    floor: 'floor:f_oak', metal: 'metal:black', kbase: { c: 'shutter:frosty', f: 'matte' }, kwall: { c: 'shutter:frosty', f: 'matte' },
    counter: 'stone:steelgrey', splash: { c: 'tile:t_white', f: 'tile' }, wardrobe: { c: 'shutter:frosty', f: 'matte' },
    headboard: 'fabric:stone', bedding: 'fabric:ivoryf', kidsAccent: { c: 'shutter:powderblue', f: 'matte' }
  },

  /* Rooms in the 3D designer */
  vizRooms: {
    living: { label: 'Living and dining', short: 'Living', type: 'living', slots: ['wall', 'feature', 'sofa', 'storage', 'table', 'curtain', 'rug', 'floor', 'metal'], labels: { feature: 'TV feature wall', sofa: 'Sofa and dining chairs', curtain: 'Curtains, cushions, armchair' } },
    kitchen: { label: 'Kitchen', short: 'Kitchen', type: 'kitchen', slots: ['kbase', 'kwall', 'counter', 'splash', 'wall', 'floor', 'metal'] },
    master: { label: 'Master bedroom', short: 'Master', type: 'bedroom', params: { size: 'master' }, slots: ['wall', 'feature', 'headboard', 'bedding', 'wardrobe', 'storage', 'curtain', 'rug', 'floor', 'metal'], labels: { feature: 'Headboard wall', storage: 'Bed base and side tables' } },
    bed2: { label: 'Bedroom 2', short: 'Bedroom 2', type: 'bedroom', min: 1, params: { size: 'second' }, slots: ['wall', 'feature', 'headboard', 'bedding', 'wardrobe', 'storage', 'curtain', 'rug', 'floor', 'metal'], labels: { feature: 'Headboard wall', storage: 'Bed base and side tables' } },
    kids: { label: 'Kids bedroom', short: 'Kids', type: 'kids', min: 2, slots: ['wall', 'arch', 'kidsAccent', 'wardrobe', 'bedding', 'curtain', 'rug', 'floor'], labels: { kidsAccent: 'Fun colour (bed, desk, shutters)', curtain: 'Curtains' } },
    guest: { label: 'Guest bedroom', short: 'Guest', type: 'bedroom', min: 3, params: { size: 'second' }, slots: ['wall', 'feature', 'headboard', 'bedding', 'wardrobe', 'storage', 'curtain', 'rug', 'floor', 'metal'], labels: { feature: 'Headboard wall', storage: 'Bed base and side tables' } }
  },
  viewNames: ['Wide', 'Eye level', 'Detail'],

  /* Links between BOQ lines and the colours chosen in 3D */
  boqLinks: {
    living: { tv: ['living', 'storage'], crockery: ['living', 'storage'], accent: ['living', 'feature'] },
    kitchen: { kit_cab: ['kitchen', 'kbase'], kit_top: ['kitchen', 'counter'], kit_dado: ['kitchen', 'splash'] },
    master: { wardrobe: ['master', 'wardrobe'], bed_k: ['master', 'headboard'], side: ['master', 'storage'], dresser: ['master', 'storage'], accent: ['master', 'feature'] },
    bed2: { wardrobe: ['bed2', 'wardrobe'], bed_q: ['bed2', 'headboard'], side: ['bed2', 'storage'] },
    kids: { wardrobe: ['kids', 'wardrobe'], bed_s: ['kids', 'kidsAccent'], study: ['kids', 'kidsAccent'] },
    guest: { wardrobe: ['guest', 'wardrobe'], bed_q: ['guest', 'headboard'], side: ['guest', 'storage'] }
  },

  /* ---------- Mood boards ---------- */
  alt: {
    'l-minimal': 'Minimalist living room', 'k-scandi': 'White and grey L-shaped kitchen', 'c-study': 'Kids study zone in blue and wood',
    'b-wardrobe': 'Bedroom with blush fluted wardrobe', 'k-modern': 'Sage kitchen with island', 'c-creative': 'Pink kids room with bunk bed',
    'l-lounge': 'Living room with blue L-shaped sofa', 'b-accent': 'Master bedroom with green chevron accent wall', 'c-colorpop': 'Sage kids room with study table',
    'l-openplan': 'Open-plan living room with navy sofa', 'c-bunk': 'Colourful kids room with study unit', 'hero': 'Living room with walnut slat wall',
    'k-walnut': 'Walnut and black kitchen', 'b-walkin': 'Master suite with walk-in wardrobe', 'l-heritage': 'Classic living room with arched mural',
    'k-island': 'Classic wood kitchen with island', 'b-attic': 'Attic bedroom with warm brown walls'
  },
  boards: {
    b1: {
      tier: 'b', name: 'Scandi Light', imgs: ['l-minimal', 'k-scandi', 'c-study'],
      note: 'Matte white and light-oak laminates, black handles, soft blue for the kids room.',
      pal: [['Chalk white', '#F2F0EB'], ['Pebble grey', '#B8B3AA'], ['Light oak', '#D6B58A'], ['Mist blue', '#A7BFD0']],
      look: {
        all: { wall: 'paint:chalk', feature: { c: 'paint:powder', f: 'texture' }, sofa: 'fabric:oatmeal', storage: { c: 'wood:lightoak', f: 'woodgrain' }, table: 'wood:lightoak', curtain: 'fabric:ivoryf', rug: 'fabric:stone', floor: 'floor:f_lightoak', metal: 'metal:black', kbase: { c: 'shutter:frosty', f: 'matte' }, kwall: { c: 'wood:lightoak', f: 'woodgrain' }, counter: 'stone:steelgrey', splash: { c: 'tile:t_white', f: 'tile' }, wardrobe: { c: 'shutter:frosty', f: 'matte' }, headboard: 'fabric:stone', bedding: 'fabric:ivoryf', arch: 'paint:powder', kidsAccent: { c: 'shutter:powderblue', f: 'matte' } },
        kids: { bedding: 'fabric:sky', rug: 'fabric:sky' }
      }
    },
    b2: {
      tier: 'b', name: 'Blush Pastel', imgs: ['b-wardrobe', 'k-modern', 'c-creative'],
      note: 'Blush fluted wardrobes, sage kitchen shutters, cream walls, rounded edges for kids.',
      pal: [['Blush', '#E7C6BE'], ['Cream', '#F3EADF'], ['Sage mist', '#BFC9B0'], ['Soft walnut', '#8C6B52']],
      look: {
        all: { wall: 'paint:linen', feature: { c: 'paint:blushp', f: 'texture' }, sofa: 'fabric:sagef', storage: { c: 'shutter:cashmere', f: 'suede' }, table: 'wood:ash', curtain: 'fabric:blushf', rug: 'fabric:oatmeal', floor: 'floor:f_beige', metal: 'metal:rosegold', kbase: { c: 'shutter:sage', f: 'matte' }, kwall: { c: 'shutter:ivory', f: 'matte' }, counter: 'stone:tanbrown', splash: { c: 'tile:t_blush', f: 'tile' }, wardrobe: { c: 'shutter:blush', f: 'suede' }, headboard: 'fabric:blushf', bedding: 'fabric:ivoryf', arch: 'paint:blushp', kidsAccent: { c: 'shutter:blush', f: 'matte' } },
        kids: { wall: 'paint:lavender', bedding: 'fabric:lavenderf', rug: 'fabric:blushf', curtain: 'fabric:ivoryf' }
      }
    },
    s1: {
      tier: 's', name: 'Sage & Oak', imgs: ['l-lounge', 'b-accent', 'c-colorpop'],
      note: 'Sage and oak, a fluted accent wall, brass pendant lights, cushioned seating.',
      pal: [['Sage', '#93A384'], ['Oak', '#C2965F'], ['Ivory', '#EEE7D9'], ['Teal blue', '#3F6E7A']],
      look: {
        all: { wall: 'paint:warmwhite', feature: { c: 'shutter:sage', f: 'fluted' }, sofa: 'fabric:tealf', storage: { c: 'wood:oak', f: 'woodgrain' }, table: 'wood:oak', curtain: 'fabric:sagef', rug: 'fabric:oatmeal', floor: 'floor:f_oak', metal: 'metal:brass', kbase: { c: 'shutter:sage', f: 'matteacr' }, kwall: { c: 'shutter:ivory', f: 'gloss' }, counter: 'stone:snow', splash: { c: 'tile:t_sage', f: 'tile' }, wardrobe: { c: 'shutter:ivory', f: 'gloss' }, headboard: 'fabric:sagef', bedding: 'fabric:ivoryf', arch: 'paint:sagemist', kidsAccent: { c: 'shutter:sage', f: 'matteacr' } },
        kids: { bedding: 'fabric:mustardf', rug: 'fabric:sagef' }
      }
    },
    s2: {
      tier: 's', name: 'Warm Contemporary', imgs: ['l-openplan', 'c-bunk'],
      note: 'Navy and walnut on warm greige walls, fluted wood, bold colour blocks for kids.',
      pal: [['Navy', '#2E3C59'], ['Taupe', '#A59D92'], ['Walnut', '#77543A'], ['Warm white', '#F4F2EE']],
      look: {
        all: { wall: 'paint:greige', feature: { c: 'wood:walnut', f: 'flutedwood' }, sofa: 'fabric:navyf', storage: { c: 'wood:walnut', f: 'woodgrain' }, table: 'wood:walnut', curtain: 'fabric:oatmeal', rug: 'fabric:stone', floor: 'floor:f_oak', metal: 'metal:black', kbase: { c: 'shutter:navy', f: 'gloss' }, kwall: { c: 'wood:walnut', f: 'woodgrain' }, counter: 'stone:carraraq', splash: { c: 'tile:t_white', f: 'tile' }, wardrobe: { c: 'wood:walnut', f: 'woodgrain' }, headboard: 'fabric:stone', bedding: 'fabric:ivoryf', arch: 'paint:mustardp', kidsAccent: { c: 'shutter:mustard', f: 'gloss' } },
        kids: { wall: 'paint:warmwhite', bedding: 'fabric:sky', rug: 'fabric:navyf' }
      }
    },
    p1: {
      tier: 'p', name: 'Modern Luxury', imgs: ['hero', 'k-walnut', 'b-walkin'],
      note: 'Walnut veneer slats, black and brass details, glass-front wardrobe, layered lighting.',
      pal: [['Espresso', '#3A2A22'], ['Walnut', '#6E4A32'], ['Brass', '#C2A26B'], ['Ivory marble', '#ECE6DC']],
      look: {
        all: { wall: 'paint:linen', feature: { c: 'wood:walnut', f: 'slats' }, sofa: 'fabric:ivoryf', storage: { c: 'wood:walnut', f: 'veneer' }, table: 'wood:walnut', curtain: 'fabric:stone', rug: 'fabric:charcoal', floor: 'floor:f_white', metal: 'metal:brass', kbase: { c: 'shutter:graphite', f: 'pumatte' }, kwall: { c: 'wood:walnut', f: 'veneer' }, counter: 'stone:calacatta', splash: { c: 'shutter:graphite', f: 'glass' }, wardrobe: { c: 'shutter:graphite', f: 'lacquer' }, headboard: 'fabric:stone', bedding: 'fabric:ivoryf', arch: 'paint:greige', kidsAccent: { c: 'shutter:teal', f: 'lacquer' } },
        kids: { wall: 'paint:warmwhite', bedding: 'fabric:sky', rug: 'fabric:stone' }
      }
    },
    p2: {
      tier: 'p', name: 'Classic Heritage', imgs: ['l-heritage', 'k-island', 'b-attic'],
      note: 'Teak veneer, warm brass, a burgundy and ochre palette, carved-look details.',
      pal: [['Teak', '#8A5A34'], ['Antique cream', '#EFE4CF'], ['Burgundy', '#7A2E2E'], ['Forest', '#4E6B4A']],
      look: {
        all: { wall: 'paint:linen', feature: { c: 'wood:teak', f: 'slats' }, sofa: 'fabric:ivoryf', storage: { c: 'wood:teak', f: 'veneer' }, table: 'wood:teak', curtain: 'fabric:mustardf', rug: 'fabric:burgundy', floor: 'floor:f_grey', metal: 'metal:brass', kbase: { c: 'wood:teak', f: 'veneer' }, kwall: { c: 'shutter:ivory', f: 'lacquer' }, counter: 'stone:statuario', splash: { c: 'shutter:ivory', f: 'glass' }, wardrobe: { c: 'wood:teak', f: 'veneer' }, headboard: 'fabric:burgundy', bedding: 'fabric:ivoryf', arch: 'paint:deepgreen', kidsAccent: { c: 'shutter:forest', f: 'lacquer' } },
        kids: { wall: 'paint:warmwhite', bedding: 'fabric:mustardf', rug: 'fabric:burgundy' }
      }
    }
  },

  /* ---------- Rate card (sample rates, per package) ---------- */
  items: {
    kit_cab: { name: 'Modular kitchen cabinets', unit: 'sq ft', r: [1050, 1450, 2250], spec: ['Base, wall and loft units. BWR ply, laminate', 'Base, wall and loft units. BWP ply, acrylic', 'Base, wall and loft units. Marine ply, PU lacquer'] },
    kit_top: { name: 'Kitchen countertop', unit: 'rft', r: [650, 1400, 2600], spec: ['Granite, 18 mm', 'Quartz, 15 mm', 'Sintered stone, 12 mm'] },
    kit_hw: { name: 'Kitchen hardware and accessories', unit: 'set', r: [10000, 22000, 48000], spec: ['SS baskets, cutlery tray, soft-close hinges', 'Hettich or equal: tandem drawers, bottle pull-out', 'Blum or equal: lift-ups, magic corner, tall unit'] },
    kit_dado: { name: 'Kitchen backsplash', unit: 'sq ft', r: [100, 170, 420], spec: ['Ceramic tiles', 'Designer tiles', 'Back-painted glass'] },
    wardrobe: { name: 'Wardrobe with loft', unit: 'sq ft', r: [950, 1350, 2050], spec: ['Swing shutters, laminate', 'Sliding shutters, acrylic with profile', 'PU and fluted glass, sensor lights'] },
    tv: { name: 'TV unit with back panel', unit: 'sq ft', r: [1000, 1450, 2200], spec: ['Laminate, open shelves', 'Fluted panel, floating unit', 'Veneer slats, floating unit'] },
    crockery: { name: 'Crockery unit', unit: 'sq ft', r: [1050, 1500, 2300], spec: ['Laminate, glass shutters', 'Acrylic, profile glass shutters', 'PU, fluted glass, lit shelves'] },
    shoe: { name: 'Foyer shoe unit', unit: 'sq ft', r: [900, 1300, 1950], spec: ['Laminate, louvered shutters', 'Laminate with seat', 'Veneer with mirror and seat'] },
    bed_k: { name: 'King bed with storage', unit: 'nos', r: [26000, 40000, 72000], spec: ['Laminate, box storage', 'Upholstered headboard, hydraulic lift', 'Panelled headboard, hydraulic lift'] },
    bed_q: { name: 'Queen bed with storage', unit: 'nos', r: [22000, 34000, 60000], spec: ['Laminate, box storage', 'Upholstered headboard, hydraulic lift', 'Panelled headboard, hydraulic lift'] },
    bed_s: { name: 'Single bed with storage', unit: 'nos', r: [15000, 24000, 42000], spec: ['Laminate, drawer storage', 'Rounded edges, drawers', 'Upholstered, trundle drawer'] },
    side: { name: 'Bedside table', unit: 'nos', r: [4000, 6500, 11500], spec: ['Laminate, one drawer', 'Acrylic, two drawers', 'Veneer, fluted front'] },
    dresser: { name: 'Dresser with mirror', unit: 'nos', r: [10000, 16000, 28000], spec: ['Laminate, wall mirror', 'Acrylic, lit mirror', 'Veneer, lit mirror, stool'] },
    study: { name: 'Study table with storage', unit: 'nos', r: [9000, 15000, 26000], spec: ['Laminate, open shelf', 'Laminate, pin-up board, drawers', 'Veneer, lit shelves, drawers'] },
    pooja: { name: 'Pooja unit', unit: 'nos', r: [14000, 26000, 55000], spec: ['Laminate, jaali doors', 'CNC jaali, back-lit', 'Solid-surface jaali, brass bells'] },
    ceiling: { name: 'False ceiling', unit: 'sq ft', r: [80, 105, 160], spec: ['Plain gypsum', 'Gypsum with cove and profile', 'Multi-level, veneer inlay'] },
    accent: { name: 'Accent wall', unit: 'sq ft', r: [70, 260, 620], spec: ['Texture paint', 'Fluted panels', 'Veneer slats, metal inlay'] },
    wallpaper: { name: 'Wallpaper', unit: 'roll', r: [1600, 3000, 5200], spec: ['Printed paper', 'Washable vinyl', 'Imported textured'] },
    lights: { name: 'Light points', unit: 'nos', r: [500, 900, 1800], spec: ['LED panels and downlights', 'Profile lights and spotlights', 'COB spots with dimmers'] },
    paint: { name: 'Wall and ceiling painting', unit: 'sq ft', r: [14, 20, 30], spec: ['Putty, economy emulsion', 'Putty, premium emulsion', 'Putty, luxury emulsion'] }
  },
  rateGroups: [
    ['Kitchen', ['kit_cab', 'kit_top', 'kit_hw', 'kit_dado']],
    ['Storage and furniture', ['wardrobe', 'tv', 'crockery', 'shoe', 'bed_k', 'bed_q', 'bed_s', 'side', 'dresser', 'study', 'pooja']],
    ['Ceiling, walls and lighting', ['ceiling', 'accent', 'wallpaper', 'lights', 'paint']]
  ],
  /* Standard layout per BHK: [item, qty for 1 / 2 / 3 / 3+ BHK, needs requirement, scales with carpet area] */
  rooms: [
    { key: 'foyer', name: 'Foyer', lines: [['shoe', [10, 12, 15, 18]], ['lights', [2, 2, 2, 3]]] },
    { key: 'living', name: 'Living and dining', lines: [['tv', [28, 32, 36, 42]], ['crockery', [14, 18, 22, 26], 'crockery'], ['ceiling', [120, 190, 240, 300], null, 1], ['accent', [40, 48, 56, 64], 'accent'], ['lights', [8, 10, 12, 14]]] },
    { key: 'kitchen', name: 'Kitchen', lines: [['kit_cab', [65, 80, 95, 110]], ['kit_top', [10, 12, 14, 16]], ['kit_hw', [1, 1, 1, 1]], ['kit_dado', [30, 36, 42, 48]], ['lights', [3, 4, 4, 5]]] },
    { key: 'master', name: 'Master bedroom', lines: [['wardrobe', [49, 56, 63, 70]], ['bed_k', [1, 1, 1, 1]], ['side', [2, 2, 2, 2]], ['dresser', [1, 1, 1, 1]], ['study', [1, 0, 0, 0], 'study'], ['ceiling', [90, 120, 140, 170], null, 1], ['accent', [36, 40, 44, 48], 'accent'], ['wallpaper', [3, 3, 3, 3], 'wallpaper'], ['lights', [5, 6, 6, 7]]] },
    { key: 'bed2', name: 'Bedroom 2', min: 1, lines: [['wardrobe', [0, 42, 49, 49]], ['bed_q', [0, 1, 1, 1]], ['side', [0, 1, 1, 2]], ['study', [0, 1, 0, 0], 'study'], ['ceiling', [0, 100, 120, 140], null, 1], ['wallpaper', [0, 2, 2, 2], 'wallpaper'], ['lights', [0, 4, 5, 5]]] },
    { key: 'kids', name: 'Kids bedroom', min: 2, lines: [['wardrobe', [0, 0, 42, 42]], ['bed_s', [0, 0, 1, 1]], ['study', [0, 0, 1, 1], 'study'], ['ceiling', [0, 0, 110, 120], null, 1], ['wallpaper', [0, 0, 2, 2], 'wallpaper'], ['lights', [0, 0, 4, 4]]] },
    { key: 'guest', name: 'Guest bedroom', min: 3, lines: [['wardrobe', [0, 0, 0, 42]], ['bed_q', [0, 0, 0, 1]], ['side', [0, 0, 0, 1]], ['ceiling', [0, 0, 0, 120], null, 1], ['lights', [0, 0, 0, 4]]] },
    { key: 'pooja', name: 'Pooja', req: 'pooja', lines: [['pooja', [1, 1, 1, 1]], ['lights', [1, 1, 1, 1]]] },
    { key: 'whole', name: 'Whole home', lines: [['paint', 'area']] }
  ],
  reqs: [
    { key: 'crockery', name: 'Crockery unit', img: 'k-units', where: 'Living and dining' },
    { key: 'pooja', name: 'Pooja unit', img: 'x-pooja', where: 'Pooja corner' },
    { key: 'accent', name: 'Accent walls', img: 'x-wallpaint', where: 'Living and master bedroom' },
    { key: 'wallpaper', name: 'Wallpaper', img: 'x-wallpaper', where: 'Bedrooms' },
    { key: 'study', name: 'Study table', img: 'c-studytable', where: '' }
  ],
  included: [
    { img: 'k-kitchen', name: 'Modular kitchen' }, { img: 'l-tv', name: 'TV unit' }, { img: 'x-ceiling', name: 'False ceiling' },
    { img: 'x-lights', name: 'Lights' }, { img: 'x-foyer', name: 'Foyer unit' }, { img: 'c-kidsroom', name: 'Kids bedroom', min: 2 }
  ],
  defaultReq: { crockery: true, pooja: true, accent: true, wallpaper: false, study: true },
  family: ['Couple', 'Kids', 'Parents', 'Pets', 'Work from home'],
  priorities: ['Maximum storage', 'Moisture-proof for monsoon', 'Easy to clean', 'Child-safe edges', 'Vastu-friendly', 'Smart lighting'],
  purpose: ['Move in', 'Rent out', 'Renovate'],
  possession: ['Ready now', 'Within 3 months', '3 to 6 months', 'After 6 months'],
  localities: ['Kokar', 'Morabadi', 'Bariatu', 'Lalpur', 'Harmu', 'Doranda', 'Kanke Road', 'Ashok Nagar', 'Hinoo', 'Argora', 'Other'],
  statuses: ['New lead', 'Mood board shared', 'Site visit', 'Quote sent', 'Booked'],
  pay: [[10, 'Booking'], [50, 'Design sign-off, production starts'], [35, 'Before material dispatch'], [5, 'Handover']],
  notIncluded: ['Civil, plumbing and tiling work', 'Appliances such as chimney, hob and fridge', 'Loose furniture such as sofa and dining table', 'Flooring shown in 3D is for visualising only', 'Electrical rewiring beyond the light points listed']
};
