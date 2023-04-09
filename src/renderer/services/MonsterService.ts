import {
  ALIGNMENT,
  CONDITIONS,
  DAMAGE_IMMUNITIES,
  DAMAGE_IMMUNITIES_SPECIAL,
  DAMAGE_RESISTANCES,
  DAMAGE_RESISTANCES_SPECIAL,
  LANGUAGES,
  MONSTER_TYPE,
  MonsterData,
  MOVEMENT,
  PROFICIENCY_BONUS,
  SENSES,
  SIZE,
  SKILLS,
  SKILLSSAVEARRAY,
  STATBONUSMAP,
  STATS,
  STATSFULL
} from '@/main/models/MonsterModels'
import {
  AlchemyActionStepDamage,
  AlchemyAttack,
  AlchemyAttackStep,
  AlchemyCharacter,
  AlchemyDamageMod,
  AlchemyMovementMode,
  AlchemyProficiency,
  AlchemySense,
  AlchemySkill,
  AlchemyTextBlock,
  AlchemyTextBlockSection,
  AlchemyTracker
} from '@/renderer/models/alchemy'
import TurndownService from 'turndown'
import parse, { Node } from 'node-html-parser'

export function monsterParse(source: MonsterData): AlchemyCharacter {
  const res = {} as AlchemyCharacter
  const turndown = new TurndownService()
  res.name = source.name
  res.isNPC = true
  res.race = 'NPC'
  res.exp = PROFICIENCY_BONUS[source.challengeRatingId].xp
  res.description = turndown.turndown(source.characteristicsDescription ?? '')
  if (source.lairDescription) {
    res.description += '\n\n## Lair\n' + turndown.turndown(source.lairDescription)
  }
  res.proficiencyBonus = PROFICIENCY_BONUS[source.challengeRatingId].proficiencyBonus
  res.challengeRating = PROFICIENCY_BONUS[source.challengeRatingId].name
  const abilityScoreMap = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0
  }
  res.abilityScores = source.stats.map((stat) => {
    abilityScoreMap[STATS[stat.statId].toLowerCase()] = STATBONUSMAP[stat.value]
    return { name: STATS[stat.statId], value: stat.value }
  })
  const hpTracker = {
    color: 'Green',
    max: source.averageHitPoints,
    name: 'HP',
    type: 'Bar',
    value: source.averageHitPoints
  } as AlchemyTracker
  const expTracker = {
    color: 'Yellow',
    max: 355000,
    name: 'XP',
    type: 'Bar',
    value: 0
  } as AlchemyTracker
  res.trackers = [hpTracker, expTracker]
  res.hitDice = source.hitPointDice.diceString.replaceAll(' ', '')
  res.currentHp = source.averageHitPoints
  res.maxHp = source.averageHitPoints
  res.alignment = ALIGNMENT[source.alignmentId]
  res.armorClass = source.armorClass
  res.size = SIZE[source.sizeId]
  res.senses = source.senses.map((sense) => {
    return { name: SENSES[sense.senseId], distance: parseInt(sense.notes, 10) } as AlchemySense
  })
  const skillsDict = JSON.parse(JSON.stringify(SKILLSSAVEARRAY))
  source.skills.map((skill) => {
    skillsDict[skill.skillId] = {
      abilityName: SKILLS[skill.skillId].skill.charAt(0).toUpperCase(),
      name: SKILLS[skill.skillId].name,
      proficient: true,
      bonus:
        skill.value -
        res.proficiencyBonus -
        abilityScoreMap[SKILLS[skill.skillId].skill.toLowerCase()]
    } as AlchemySkill
  })
  res.skills = Object.values(skillsDict)
  res.type = MONSTER_TYPE[source.typeId]
  res.movementModes = source.movements.map((movement) => {
    if (movement.movementId === 1) res.speed = movement.speed
    return { mode: MOVEMENT[movement.movementId], distance: movement.speed } as AlchemyMovementMode
  })
  res.imageUri = source.avatarUrl
  res.proficiencies = source.savingThrows.map((sense) => {
    return { name: STATSFULL[sense.statId], type: 'save' } as AlchemyProficiency
  })
  res.proficiencies.push(
    ...source.languages.map((language) => {
      return { name: LANGUAGES[language.languageId], type: 'language' } as AlchemyProficiency
    })
  )
  res.conditionImmunities = source.conditionImmunities.map((condition) => CONDITIONS[condition])
  res.damageImmunities = source.damageAdjustments
    .filter((damage) => damage in DAMAGE_IMMUNITIES)
    .map((damage) => {
      return { damageType: DAMAGE_IMMUNITIES[damage] } as AlchemyDamageMod
    })
  source.damageAdjustments
    .filter((damage) => damage in DAMAGE_IMMUNITIES_SPECIAL)
    .forEach((damage) => {
      res.damageImmunities.push(...DAMAGE_IMMUNITIES_SPECIAL[damage])
    })
  res.damageResistances = source.damageAdjustments
    .filter((damage) => damage in DAMAGE_RESISTANCES)
    .map((damage) => {
      return { damageType: DAMAGE_RESISTANCES[damage] } as AlchemyDamageMod
    })
  source.damageAdjustments
    .filter((damage) => damage in DAMAGE_RESISTANCES_SPECIAL)
    .forEach((damage) => {
      res.damageResistances.push(...DAMAGE_RESISTANCES_SPECIAL[damage])
    })
  res.textBlocks = parseSpecialTraits(source.specialTraitsDescription)

  const actionSet = [
    { prefix: '', actions: source.actionsDescription },
    { prefix: 'Reactions - ', actions: source.reactionsDescription },
    { prefix: 'Legendary Actions - ', actions: source.legendaryActionsDescription },
    { prefix: 'Mythic Actions - ', actions: source.mythicActionsDescription },
    { prefix: 'Bonus Actions - ', actions: source.bonusActionsDescription }
  ]

  res.actions = []

  actionSet.forEach((givenSet) => {
    if (!givenSet.actions) return
    const [txtBlocks, actions] = parseActions(givenSet.actions, givenSet.prefix)
    // @ts-ignore
    res.textBlocks[0].textBlocks.push(...txtBlocks)
    res.actions.push(...actions)
  })

  return res
}

function parseSpecialTraits(raw: string): AlchemyTextBlockSection[] {
  const res = [] as AlchemyTextBlock[]
  const turndown = new TurndownService()
  // scrub the base html
  raw = raw.replace('\n', '')
  // Parse it to explore structure
  const parsed = parse(raw)
  parsed.childNodes.forEach((node) => {
    if (node.childNodes.length === 0) return
    // eslint-disable-next-line no-prototype-builtins
    if (!node.childNodes[0].hasOwnProperty('rawTagName')) return
    // @ts-ignore
    if (node.childNodes[0].rawTagName === 'em') {
      // this is what D&D beyond uses as a title for a section
      const ability = {} as AlchemyTextBlock
      ability.title = node.childNodes[0].rawText.slice(0, -1)
      node.childNodes = node.childNodes.slice(1)
      ability.body = turndown.turndown(node.rawText)
      res.push(ability)
    } else {
      // this paragraph is part of the previous section
      res[res.length - 1].body += '\n' + turndown.turndown(node.rawText)
    }
  })
  return [{ title: 'Abilities', textBlocks: res }] as AlchemyTextBlockSection[]
}

function parseActions(raw: string, prefix: string = ''): [AlchemyTextBlock[], AlchemyAttackStep[]] {
  const features = [] as AlchemyTextBlock[]
  const actions = [] as AlchemyAttackStep[]
  const turndown = new TurndownService()
  // scrub the base html
  raw = raw.replace('\n', '')
  // Parse it to explore structure
  const parsed = parse(raw)
  parsed.childNodes.forEach((node) => {
    if (node.childNodes.length === 0) return
    // eslint-disable-next-line no-prototype-builtins
    if (!node.childNodes[0].hasOwnProperty('rawTagName')) return
    // @ts-ignore
    if (node.childNodes[0].rawTagName === 'em') {
      const name = node.childNodes[0].rawText.slice(0, -1)
      // this is what D&D beyond uses as a title for a section
      if (node.childNodes[0].childNodes.length > 1) {
        if (node.childNodes[0].rawText.includes('Melee Weapon Attack')) {
          const tmpAction = parseMeleeAction(node, prefix)
          if (tmpAction) actions.push(tmpAction)
          else features.push(parseAbility(node, prefix, name))
        }
        if (node.childNodes[0].rawText.includes('Ranged Weapon Attack')) {
          const tmpAction = parseRangedAction(node, prefix)
          if (tmpAction) actions.push(tmpAction)
          else features.push(parseAbility(node, prefix, name))
        }
      } else {
        features.push(parseAbility(node, prefix, name))
      }
    } else {
      // this paragraph is part of the previous section
      if (features.length < 1) return
      features[features.length - 1].body += '\n' + turndown.turndown(node.rawText)
    }
  })
  for (let i = 0; i < actions.length; i++) {
    actions[i].sortOrder = i + 1
  }
  return [features, actions]
}

function parseAbility(node: Node, prefix: string, name: string = ''): AlchemyTextBlock {
  const ability = {} as AlchemyTextBlock
  const turndown = new TurndownService()
  ability.title = prefix + name + node.childNodes[0].rawText.slice(0, -1)
  node.childNodes = node.childNodes.slice(1)
  ability.body = turndown.turndown(node.rawText)
  return ability
}

function parseMeleeAction(node: Node, prefix: string): AlchemyAttackStep | null {
  const action = {} as AlchemyAttackStep
  action.description = node.rawText
  const meleeRegex =
    /\+(?<toHit>[\d]+)[\S\s\d]+\((?<dice1>[\d]+d[\d]+)[+\s]+(?<bonus1>[\d]+)\)[\s]+(?<type1>[\S]+)([\s\S]+\((?<dice2>[\d]+d[\d]+)\)[ ]+(?<type2>[\S]+))?/gm
  action.name = prefix + node.childNodes[0].childNodes[0].rawText.slice(0, -1)
  node.childNodes = node.childNodes.slice(1)
  const match = meleeRegex.exec(node.rawText)
  const attack = {} as AlchemyAttack
  if (match) {
    // @ts-ignore
    attack.bonus = parseInt(match.groups.toHit || '')
    attack.crit = 20
    attack.isProficient = false
    attack.isRanged = false
    attack.name = action.name
    attack.rollsAttack = true

    attack.damageRolls = [
      {
        // @ts-ignore
        bonus: parseInt(match.groups.bonus1),
        // @ts-ignore
        dice: match.groups.dice1,
        // @ts-ignore
        type: match.groups.type1
      }
    ]
    // @ts-ignore
    if (match.groups.dice2 !== undefined) {
      const dmg2 = {
        // @ts-ignore
        dice: match.groups.dice2,
        // @ts-ignore
        type: match.groups.type2
      } as AlchemyActionStepDamage
      attack.damageRolls.push(dmg2)
    }
    action.steps = [
      {
        type: 'custom-attack',
        attack
      }
    ]
    return action
  }
  return null
}

function parseRangedAction(node: Node, prefix: string): AlchemyAttackStep | null {
  const action = {} as AlchemyAttackStep
  action.description = node.rawText
  const rangedAction =
    /\+(?<toHit>[\d]+)[A-Za-z\s,.]+(?<lowRange>[\d]+)[A-Za-z ./]+(?<highRange>[\d]+)[A-Za-z .,:\d]+\((?<dice>[\dd]+)[ +]+(?<bonus>[\d]+)\)[ ]+(?<type>[A-Za-z]+)/gm
  action.name = prefix + node.childNodes[0].rawText.slice(0, -1)
  node.childNodes = node.childNodes.slice(1)
  const match = rangedAction.exec(node.rawText)
  const attack = {} as AlchemyAttack
  if (match) {
    // @ts-ignore
    attack.bonus = parseInt(match.groups.toHit || '')
    attack.crit = 20
    attack.isProficient = false
    attack.name = action.name
    attack.rollsAttack = true
    attack.isRanged = true
    // @ts-ignore
    attack.range = parseInt(match.groups.lowRange || '')
    // @ts-ignore
    attack.longRange = parseInt(match.groups.highRange || '')
    attack.damageRolls = [
      {
        // @ts-ignore
        bonus: parseInt(match.groups.bonus),
        // @ts-ignore
        dice: match.groups.dice,
        // @ts-ignore
        type: match.groups.type
      }
    ]
    action.steps = [
      {
        type: 'custom-attack',
        attack
      }
    ]
    return action
  }
  return null
}
