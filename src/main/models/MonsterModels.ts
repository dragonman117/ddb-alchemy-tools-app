import { AlchemyDamageMod } from './Alchemy'

export interface getMonsterRequest {
  id: string
}

export const STATS: { [key: number]: string } = {
  1: 'str',
  2: 'dex',
  3: 'con',
  4: 'int',
  5: 'wis',
  6: 'cha'
}
export const STATSFULL: { [key: number]: string } = {
  1: 'strength',
  2: 'dexterity',
  3: 'constitution',
  4: 'intelligence',
  5: 'wisdom',
  6: 'charisma'
}

export const MOVEMENT: { [key: number]: string } = {
  1: 'Walking',
  2: 'Burrow',
  3: 'Climb',
  4: 'Fly',
  5: 'Swim'
}

export const ALIGNMENT: { [key: number]: string } = {
  1: 'lawful good',
  2: 'neutral good',
  3: 'chaotic good',
  4: 'lawful neutral',
  5: 'neutral',
  6: 'chaotic neutral',
  7: 'lawful evil',
  8: 'neutral evil',
  9: 'chaotic evil',
  10: 'unaligned',
  11: 'any alignment',
  13: 'any evil alignment',
  14: 'any good alignment',
  15: 'any chaotic alignment',
  16: 'any lawful alignment',
  18: 'any non-good alignment',
  19: 'any non-lawful alignment',
  20: 'typically chaotic neutral',
  21: 'typically neutral good',
  22: 'typically lawful good',
  23: 'typically lawful evil',
  24: 'typically neutral evil',
  25: 'typically chaotic good',
  26: 'typically neutral',
  27: 'typically lawful evil',
  28: 'typically lawful neutral'
}

export const SIZE: { [key: number]: string } = {
  2: 'Tiny',
  3: 'Small',
  4: 'Medium',
  5: 'Large',
  6: 'Huge',
  7: 'Gargantuan',
  10: 'Medium'
}

export const MONSTER_TYPE: { [key: number]: string } = {
  1: 'Aberration',
  2: 'Beasts',
  3: 'Celestial',
  4: 'Construct',
  6: 'Dragon',
  7: 'Elemental',
  8: 'Fey',
  9: 'Fiend',
  10: 'Giant',
  11: 'Humanoid',
  13: 'Monstrosity',
  14: 'Ooze',
  15: 'Plant',
  16: 'Undead'
}

export const SENSES: { [key: number]: string } = {
  1: 'blindsight',
  2: 'darkvision',
  3: 'tremorsense',
  4: 'truesight',
  5: 'unknown'
}

export const LANGUAGES: { [key: number]: string } = {
  1: 'common',
  2: 'dwarvish',
  3: 'elvish',
  4: 'giant',
  5: 'gnomish',
  6: 'goblin',
  7: 'halfling',
  8: 'orc',
  9: 'abyssal',
  10: 'celestial',
  11: 'draconic',
  12: 'deep speech',
  13: 'infernal',
  14: 'primordial',
  15: 'sylvan',
  16: 'undercommon',
  18: 'telepathy',
  19: 'aquan',
  20: 'auran',
  21: 'ignan',
  22: 'terran',
  23: 'druidic',
  24: 'giant eagle',
  25: 'giant elk',
  26: 'giant owl',
  27: 'gnoll',
  28: 'otyugh',
  29: 'sahuagin',
  30: 'sphinx',
  31: 'winter wolf',
  32: 'worg',
  33: 'blink dog',
  34: 'yeti',
  35: 'all',
  36: 'aaracokra',
  37: 'slaad',
  38: 'bullywug',
  39: 'gith',
  40: 'grell',
  41: 'Hook Horror',
  42: 'modron',
  43: 'thri-kreen',
  44: 'troglodyte',
  45: 'umber hulk',
  46: "thieves' cant",
  47: 'grung',
  48: 'tlincalli',
  49: 'vegepygmy',
  50: 'yikaria',
  51: 'bothii',
  52: 'ixitxachitl',
  53: 'thayan',
  54: 'netherese',
  55: 'ice toad',
  56: 'olman',
  57: 'quori',
  58: 'minotaur',
  59: 'loxodon',
  60: 'kraul',
  61: 'vedalken',
  62: 'daelkyr',
  64: 'riedran',
  66: 'zemnian',
  67: 'marquesian',
  68: 'naush',
  69: 'leonin',
  70: 'grippli',
  71: 'skitterwidget',
  72: 'ziklight',
  73: 'kruthik',
  74: 'citlanés',
  75: 'djaynaian',
  76: 'godstongue',
  77: 'halri',
  78: 'maynah',
  79: "n'warian",
  80: 'quirapu',
  81: 'sensan',
  82: 'shankhi',
  83: 'tletlahtolli',
  84: 'xingyu',
  85: 'zabaani',
  86: 'dohwar',
  87: 'hadozee',
  88: 'aartuk',
  89: 'abanasinian',
  90: 'ergot',
  91: 'istarian',
  92: 'kenderspeak',
  93: 'kharolian',
  94: 'khur',
  95: 'kothian',
  96: 'nerakese',
  97: 'nordmaarian',
  98: 'ogre',
  99: 'solamnic'
}

interface CR {
  name: string
  proficiencyBonus: number
  xp: number
}

export const PROFICIENCY_BONUS: { [key: number]: CR } = {
  1: { name: '0', proficiencyBonus: 2, xp: 10 },
  2: { name: '1/8', proficiencyBonus: 2, xp: 25 },
  3: { name: '1/4', proficiencyBonus: 2, xp: 50 },
  4: { name: '1/2', proficiencyBonus: 2, xp: 100 },
  5: { name: '1', proficiencyBonus: 2, xp: 200 },
  6: { name: '2', proficiencyBonus: 2, xp: 450 },
  7: { name: '3', proficiencyBonus: 2, xp: 700 },
  8: { name: '4', proficiencyBonus: 2, xp: 1100 },
  9: { name: '5', proficiencyBonus: 3, xp: 1800 },
  10: { name: '6', proficiencyBonus: 3, xp: 2300 },
  11: { name: '7', proficiencyBonus: 3, xp: 2900 },
  12: { name: '8', proficiencyBonus: 3, xp: 3900 },
  13: { name: '9', proficiencyBonus: 4, xp: 5000 },
  14: { name: '10', proficiencyBonus: 4, xp: 5900 },
  15: { name: '11', proficiencyBonus: 4, xp: 7200 },
  16: { name: '12', proficiencyBonus: 4, xp: 8400 },
  17: { name: '13', proficiencyBonus: 5, xp: 10000 },
  18: { name: '14', proficiencyBonus: 5, xp: 11500 },
  19: { name: '15', proficiencyBonus: 5, xp: 13000 },
  20: { name: '16', proficiencyBonus: 5, xp: 15000 },
  21: { name: '17', proficiencyBonus: 6, xp: 18000 },
  22: { name: '18', proficiencyBonus: 6, xp: 20000 },
  23: { name: '19', proficiencyBonus: 6, xp: 22000 },
  24: { name: '20', proficiencyBonus: 6, xp: 25000 },
  25: { name: '21', proficiencyBonus: 7, xp: 33000 },
  26: { name: '22', proficiencyBonus: 7, xp: 41000 },
  27: { name: '23', proficiencyBonus: 7, xp: 50000 },
  29: { name: '24', proficiencyBonus: 7, xp: 62000 },
  30: { name: '25', proficiencyBonus: 8, xp: 75000 },
  31: { name: '26', proficiencyBonus: 8, xp: 90000 },
  32: { name: '27', proficiencyBonus: 8, xp: 105000 },
  33: { name: '28', proficiencyBonus: 8, xp: 120000 },
  34: { name: '29', proficiencyBonus: 9, xp: 135000 },
  35: { name: '30', proficiencyBonus: 9, xp: 155000 }
}

export const CONDITIONS: { [key: number]: string } = {
  1: 'Blinded',
  2: 'Charmed',
  3: 'Deafened',
  4: 'Exhaustion',
  5: 'Frightened',
  6: 'Grappled',
  7: 'Incapacitated',
  8: 'Invisible',
  9: 'Paralyzed',
  10: 'Petrified',
  11: 'Poisoned',
  12: 'Prone',
  13: 'Restrained',
  14: 'Stunned',
  15: 'Unconscious'
}

export const DAMAGE_RESISTANCES: { [key: number]: string } = {
  1: 'bludgeoning',
  2: 'piercing',
  3: 'slashing',
  4: 'lightning',
  5: 'thunder',
  6: 'poison',
  7: 'cold',
  8: 'radiant',
  9: 'fire',
  10: 'necrotic',
  11: 'acid',
  12: 'psychic',
  47: 'force',
  51: 'Ranged Attacks',
  52: 'Damage Dealt By Traps',
  53: 'All',
  57: 'Damage from Spells',
  62: 'All damage but Force, Radiant, and Psychic',
  65: "Damage of the type matching the animated breath's form (acid, cold, fire, lightning, or poison)",
  66: 'Psychic (granted by Ruidium Armor)',
  68: 'One of the following: acid, cold, fire, lightning, or poison'
}
export const DAMAGE_IMMUNITIES: { [key: number]: string } = {
  17: 'bludgeoning',
  18: 'piercing',
  19: 'slashing',
  20: 'lightning',
  21: 'thunder',
  22: 'poison',
  23: 'cold',
  24: 'radiant',
  25: 'fire',
  26: 'necrotic',
  27: 'acid',
  28: 'psychic',
  48: 'force',
  55: 'Bludgeoning, Piercing, and Slashing from Metal Weapons',
  60: "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks that aren't Adamantine or Silvered",
  63: 'Petrified (Aberrant Armor Only)',
  67: 'Bludgeoning, Piercing, and Slashing that is Nonmagical'
}

export const DAMAGE_IMMUNITIES_SPECIAL: { [key: number]: AlchemyDamageMod[] } = {
  29: [
    { condition: 'Nonmagical', damageType: 'Bludgeoning' },
    { condition: 'Nonmagical', damageType: 'Piercing' },
    { condition: 'Nonmagical', damageType: 'Slashing' }
  ],
  30: [
    { condition: 'Nonmagical (excludes Silvered)', damageType: 'Bludgeoning' },
    { condition: 'Nonmagical (excludes Silvered)', damageType: 'Piercing' },
    { condition: 'Nonmagical (excludes Silvered)', damageType: 'Slashing' }
  ],
  31: [
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Piercing' },
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Slashing' }
  ],
  32: [
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Bludgeoning' },
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Piercing' },
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Slashing' }
  ]
}
export const DAMAGE_RESISTANCES_SPECIAL: { [key: number]: AlchemyDamageMod[] } = {
  13: [
    { condition: 'Nonmagical', damageType: 'Bludgeoning' },
    { condition: 'Nonmagical', damageType: 'Piercing' },
    { condition: 'Nonmagical', damageType: 'Slashing' }
  ],
  14: [
    { condition: 'Nonmagical (excludes Silvered)', damageType: 'Bludgeoning' },
    { condition: 'Nonmagical (excludes Silvered)', damageType: 'Piercing' },
    { condition: 'Nonmagical (excludes Silvered)', damageType: 'Slashing' }
  ],
  16: [
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Piercing' },
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Slashing' }
  ],
  15: [
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Bludgeoning' },
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Piercing' },
    { condition: 'Nonmagical (excludes Adamantine)', damageType: 'Slashing' }
  ],
  46: [
    { condition: 'Magical', damageType: 'Bludgeoning' },
    { condition: 'Magical', damageType: 'Piercing' },
    { condition: 'Magical', damageType: 'Slashing' }
  ],
  50: [
    { condition: 'In dim light or darkness', damageType: 'Bludgeoning' },
    { condition: 'In dim light or darkness', damageType: 'Piercing' },
    { condition: 'In dim light or darkness', damageType: 'Slashing' }
  ],
  54: [{ condition: 'Nonmagical', damageType: 'Bludgeoning' }],
  56: [
    { condition: 'In dim light or darkness', damageType: 'Bludgeoning' },
    { condition: 'In dim light or darkness', damageType: 'Piercing' },
    { condition: 'In dim light or darkness', damageType: 'Slashing' }
  ],
  61: [
    { condition: 'Stoneskin', damageType: 'Bludgeoning' },
    { condition: 'Stoneskin', damageType: 'Piercing' },
    { condition: 'Stoneskin', damageType: 'Slashing' }
  ]
}

export const SKILLS = {
  2: {
    skill: 'str',
    name: 'Athletics'
  },
  3: {
    skill: 'dex',
    name: 'Acrobatics'
  },
  4: {
    skill: 'dex',
    name: 'Sleight of Hand'
  },
  5: {
    skill: 'dex',
    name: 'Stealth'
  },
  6: {
    skill: 'int',
    name: 'Arcana'
  },
  7: {
    skill: 'int',
    name: 'History'
  },
  8: {
    skill: 'int',
    name: 'Investigation'
  },
  9: {
    skill: 'int',
    name: 'Nature'
  },
  10: {
    skill: 'int',
    name: 'Religion'
  },
  11: {
    skill: 'wis',
    name: 'Animal Handling'
  },
  12: {
    skill: 'wis',
    name: 'Insight'
  },
  13: {
    skill: 'wis',
    name: 'Medicine'
  },
  14: {
    skill: 'wis',
    name: 'Perception'
  },
  15: {
    skill: 'wis',
    name: 'Survival'
  },
  16: {
    skill: 'cha',
    name: 'Deception'
  },
  17: {
    skill: 'cha',
    name: 'Intimidation'
  },
  18: {
    skill: 'cha',
    name: 'Performance'
  },
  19: {
    skill: 'cha',
    name: 'Persuasion'
  }
}

export const SKILLSSAVEARRAY = {
  3: {
    abilityName: 'dex',
    name: 'Acrobatics',
    proficient: false
  },
  11: {
    abilityName: 'wis',
    name: 'Animal Handling',
    proficient: false
  },
  6: {
    abilityName: 'int',
    name: 'Arcana',
    proficient: false
  },
  2: {
    abilityName: 'str',
    name: 'Athletics',
    proficient: false
  },
  16: {
    abilityName: 'cha',
    name: 'Deception',
    proficient: false
  },
  7: {
    abilityName: 'int',
    name: 'History',
    proficient: false
  },
  12: {
    abilityName: 'wis',
    name: 'Insight',
    proficient: false
  },
  17: {
    abilityName: 'cha',
    name: 'Intimidation',
    proficient: false
  },
  8: {
    abilityName: 'int',
    name: 'Investigation',
    proficient: false
  },
  13: {
    abilityName: 'wis',
    name: 'Medicine',
    proficient: false
  },
  9: {
    abilityName: 'int',
    name: 'Nature',
    proficient: false
  },
  14: {
    abilityName: 'wis',
    name: 'Perception',
    proficient: false
  },
  18: {
    abilityName: 'cha',
    name: 'Performance',
    proficient: false
  },
  19: {
    abilityName: 'cha',
    name: 'Persuasion',
    proficient: false
  },
  10: {
    abilityName: 'int',
    name: 'Religion',
    proficient: false
  },
  4: {
    abilityName: 'dex',
    name: 'Sleight of Hand',
    proficient: false
  },
  5: {
    abilityName: 'dex',
    name: 'Stealth',
    proficient: false
  },
  15: {
    abilityName: 'wis',
    name: 'Survival',
    proficient: false
  }
}

export const STATBONUSMAP = {
  1: -5,
  2: -4,
  3: -4,
  4: -3,
  5: -3,
  6: -2,
  7: -2,
  8: -1,
  9: -1,
  10: 0,
  11: 0,
  12: 1,
  13: 1,
  14: 2,
  15: 2,
  16: 3,
  17: 3,
  18: 4,
  19: 4,
  20: 5,
  21: 5,
  22: 6,
  23: 6,
  24: 7,
  25: 7,
  26: 8,
  27: 8,
  28: 9,
  30: 9
}

export interface MonsterData {
  collectionUserId: number
  isReleased: boolean
  url: string
  conditionImmunitiesHtml: string
  sensesHtml: string
  skillsHtml: string
  stats: Stat[]
  senses: Sense[]
  savingThrows: SavingThrow[]
  skills: Skill[]
  languages: Language[]
  hitPointDice: HitPointDice
  swarm: null
  movements: Movement[]
  homebrewStatus: number
  id: number
  entityTypeId: number
  name: string
  alignmentId: number
  sizeId: number
  typeId: number
  armorClass: number
  armorClassDescription: string
  averageHitPoints: number
  passivePerception: number
  isHomebrew: boolean
  challengeRatingId: number
  sourceId: number
  sourcePageNumber: number
  isLegendary: boolean
  isMythic: boolean
  hasLair: boolean
  avatarUrl: string
  largeAvatarUrl: string
  basicAvatarUrl: string
  version: null
  subTypes: any[]
  environments: number[]
  tags: any[]
  sources: Source[]
  damageAdjustments: number[]
  conditionImmunities: any[]
  specialTraitsDescription: string
  actionsDescription: string
  reactionsDescription: string
  legendaryActionsDescription: string
  mythicActionsDescription: string
  bonusActionsDescription: string
  characteristicsDescription: string
  lairDescription: string
  languageDescription: string
  languageNote: string
  hideCr: boolean
  isLegacy: boolean
}

export interface HitPointDice {
  diceCount: number
  diceValue: number
  diceMultiplier: number
  fixedValue: number
  diceString: string
}

export interface Language {
  languageId: number
  notes: string
}

export interface Movement {
  movementId: number
  speed: number
  notes: null
}

export interface SavingThrow {
  statId: number
  bonusModifier: null
}

export interface Sense {
  senseId: number
  notes: string
}

export interface Skill {
  skillId: number
  value: number
  additionalBonus: null
}

export interface Source {
  sourceId: number
  pageNumber: number
  sourceType: number
}

export interface Stat {
  statId: number
  name: null
  value: number
}
