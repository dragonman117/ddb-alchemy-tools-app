export interface AlchemyCharacter {
  abilityScores: AlchemyStat[]
  armorClass: number
  alignment: string
  actions: AlchemyAttackStep[]
  challengeRating: string
  conditionImmunities: string[]
  description: string
  damageImmunities: AlchemyDamageMod[]
  damageResistances: AlchemyDamageMod[]
  classes: AlchemyClass[]
  currentHp: number
  exp: number
  hitDice: string
  imageUri: string
  initiativeBonus: number
  items: AlchemyItem[]
  isNPC: boolean
  isSpellcaster: boolean
  maxHp: number
  movementModes: AlchemyMovementMode[]
  name: string
  proficiencies: AlchemyProficiency[]
  proficiencyBonus: number
  race: string
  senses: AlchemySense[]
  skills: AlchemySkill[]
  speed: number
  size: string
  systemKey: string
  spellcastingAbility: string
  spellFilters: string[]
  // eslint-disable-next-line no-use-before-define
  spellSlots: AlchemySpellSlot[]
  spells: AlchemySpell[]
  textBlocks: AlchemyTextBlockSection[]
  type: string
}

export interface AlchemyStat {
  name: string
  value: number
}

export interface AlchemyClass {
  class: string
  level: number
}

export interface AlchemyItem {
  isEquipped: boolean
  name: string
  quantity: number
  weight: number
  description?: string
  rarity?: string
  subrarity?: string
  requiresAttunement?: boolean
  attunementPrerequisites?: string
  type?: string
  isMagic?: boolean
  spell?: AlchemySpell
  imageUri?: string
  cost?: string
}

export interface AlchemyProficiency {
  name: string
  type: string
}

export interface AlchemySense {
  name: string
  distance: number
}

export interface AlchemyDamageMod {
  damageType: string
  condition: string
}

export interface AlchemySkill {
  name: string
  abilityName: string
  proficient: boolean
  doubleProficiency?: boolean
  bonus?: number
}

export interface AlchemySpellSlot {
  max: number
  remaining: number
}

export type AlchemySpell = AlchemySrdSpell | AlchemyCustomSpell

export interface AlchemySrdSpell {
  name: string
}

export interface AlchemyCustomSpell {
  name: string
  level: number
  school: string
  canCastAtHigherLevel: boolean
  castingTime: string
  components: string[]
  duration: string
  damage?: AlchemyDamage[]
  higherLevelDescription: string
  higherLevels: AlchemySpellAtHigherLevel[]
  range: string
  rollsAttack: boolean
  savingThrow: AlchemySavingThrow
  tags: string[]
  description: string
  materials: string
  requiresConcentration?: boolean
  canBeCastAsRitual?: boolean
}

export interface AlchemySpellAtHigherLevel {
  applyAtLevels: number[]
  damage: AlchemyDamage
  type: string
}

export interface AlchemyDamage {
  bonus?: number
  dice: string
  type: string
}

export interface AlchemySavingThrow {
  abilityName: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
}

export interface AlchemyTextBlock {
  title?: string
  body?: string
}

export interface AlchemyTextBlockSection {
  title: string
  textBlocks?: AlchemyTextBlock[]
}

export interface AlchemyMovementMode {
  mode: string
  distance: number
}

export interface AlchemyAttackStep {
  steps: AlchemyActionStep[]
  name: string
  sortOrder: number
  description: string
}

export interface AlchemyActionStep {
  type: string
  journalCommand?: AlchemyJournalCommand
  diceRoll?: AlchemyDiceRoll
  attack?: AlchemyAttack
  skillCheck?: AlchemySkillCheck
}

export interface AlchemyJournalCommand {
  command: string
  args: string
}

export interface AlchemyDiceRoll {
  abilityName: string
  bonus: number
  dice: string
  type: string
}

export interface AlchemyAttack {
  ability: string
  bonus: number
  crit: number
  damageRolls: AlchemyActionStepDamage[]
  isProficient: boolean
  isRanged: boolean
  name: string
  range: number
  longRange: number
  rollsAttack: boolean
  savingThrow: AlchemySkillCheck
}

export interface AlchemyActionStepDamage {
  bonus: number
  dice: string
  type: string
}

export interface AlchemySkillCheck {
  abilityName: string
  difficultyClass: number
}

export interface AlchemySkillCheckAction {
  rollModifier: string
  skillName: string
}
