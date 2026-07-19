export type UpdateSource = {
  name: string;
  url: string;
};

export type UpdateEntry = {
  date: string;
  type: 'code-check' | 'guide-data-pass' | 'page-build' | 'roblox-page-update';
  title: string;
  summary: string;
  details: string[];
  sources: UpdateSource[];
};

export const ninetyNineNightsUpdates = {
  checkedAt: '2026-07-17',
  entries: [
    {
      date: '2026-07-17',
      type: 'code-check',
      title: 'July 17 partial code-source confirmation',
      summary:
        'PC Gamer and GamesRadar reconfirmed the two tracked active codes. Three blocked sources remain on the manual review queue, so no disputed status or Roblox statistic changed.',
      details: [
        'forestwakesup26 remains active for 15 gems and 3 random flames in both reachable sources.',
        'afterparty remains active for 15 gems in both reachable sources.',
        'PCGamesN, the Fandom Codes Wiki, and the Roblox Games API returned HTTP 403 in this command-line pass.',
        'happyhalloween appeared in reachable source text, but its expired label remains unchanged until the surrounding source section is manually reviewed.',
        'Roblox visits, favorites, player count, special-code labels, and expired-code labels were not refreshed from this partial result.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-07-15',
      type: 'code-check',
      title: 'July 15 code-source review',
      summary:
        'PC Gamer and GamesRadar reconfirmed all published code labels. No new code, reward, or redemption route was added.',
      details: [
        'forestwakesup26 remains active for 15 gems and 3 random flames in both checked sources.',
        'afterparty remains active for 15 gems in both checked sources.',
        'yay fishing remains a one-time chat-based activation in PC Gamer and GamesRadar; Quest Codes keeps its special label because an older PCGamesN check disagreed.',
        'happyhalloween remains expired in both checked sources.',
        'PCGamesN, Fandom, and the Roblox Games API were blocked in the command-line pass, so their stored source dates and Roblox metadata were not refreshed.',
        'No invented code, reward, patch detail, or game statistic was published.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-07-13',
      type: 'guide-data-pass',
      title: 'July 13 map, progression, and taming source review',
      summary:
        'Quest Codes rechecked nine manual-review datasets and corrected the Taming Flute route after the old Upgrade Station was replaced by the Tool Trader.',
      details: [
        'Map, missing kids, badges, Crafting Bench 5, Forest Gem, Forest Gem fragments, Zookeeper vs Beastmaster, and survival claims remained supported by their checked sources.',
        'The Taming Flute page now sends players to the Tool Trader workshop near camp instead of the removed Upgrade Station.',
        'Fandom and Beebom confirm that the Tool Trader sells a Taming Flute for 20 Mossy Coins and upgrades tools after their XP requirement is met.',
        'Weak secondary references that were not reopened in this pass retain their older source-check dates.',
        'No invented drop rate, tier score, hidden tame chance, badge total, or crafting cost was added.',
      ],
      sources: [
        {
          name: 'Fandom Tool Trader',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Tool_Trader',
        },
        {
          name: 'Beebom Tool Trader guide',
          url: 'https://beebom.com/99-nights-in-the-forest-tool-trader-guide/',
        },
        {
          name: 'PC Gamer missing kids guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-missing-kid-locations/',
        },
        {
          name: 'GamesRadar crafting recipes',
          url: 'https://www.gamesradar.com/games/simulation/99-nights-in-the-forest-crafting-recipes-perks-bench-upgrade/',
        },
        {
          name: 'Fandom Gem of the Forest',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Gem_of_the_Forest',
        },
        {
          name: 'PC Gamer survival tips',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
        },
      ],
    },
    {
      date: '2026-07-13',
      type: 'code-check',
      title: 'July 13 manual code-source review',
      summary:
        'PC Gamer, GamesRadar, PCGamesN, and the community wiki were manually reviewed after the automated check. Confirmed code labels stayed unchanged, source dates were refreshed, and current Roblox metadata was recorded.',
      details: [
        'PC Gamer, GamesRadar, and Fandom still list forestwakesup26 as active; PCGamesN does not list it, so the three-source confirmation remains visible.',
        'All four reviewed sources still list afterparty as active with the same 15-gem reward.',
        'PC Gamer, GamesRadar, and Fandom treat yay fishing as a one-time in-game activation, while PCGamesN lists it as expired; Quest Codes keeps the conflict visible with the special label.',
        'All four reviewed sources keep happyhalloween in expired history.',
        'The Roblox Games API reported an updated timestamp of 2026-07-11, 396,612 playing, 28,160,466,565 visits, and 8,623,998 favorites at check time.',
        'No new code, reward amount, drop rate, tier claim, crafting fact, or patch-note claim was added.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
        {
          name: 'Fandom codes page',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
        },
        {
          name: 'Roblox Games API',
          url: 'https://games.roblox.com/v1/games?universeIds=7326934954',
        },
      ],
    },
    {
      date: '2026-07-13',
      type: 'guide-data-pass',
      title: 'July 13 classes, animals, and bandages source review',
      summary:
        'Quest Codes rechecked three high-value manual-review datasets against their existing source trails and refreshed only claims that remained visible in those sources.',
      details: [
        'The PC Gamer class tier groups still matched the published Classes and Class Tier List pages.',
        'The PC Gamer animal table still matched the 11 listed animals, food requirements, flute tiers, and biome notes.',
        'PC Gamer and Beebom still supported the Bandage recipe, Tool Workshop route, revive use, and related cautions.',
        'No invented class stat, animal drop rate, hidden tame chance, or unverified crafting cost was added.',
      ],
      sources: [
        {
          name: 'PC Gamer classes guide',
          url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
        },
        {
          name: 'PC Gamer animal taming guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/',
        },
        {
          name: 'PC Gamer bandage guide',
          url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-bandages/',
        },
        {
          name: 'PC Gamer revive guide',
          url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-revive/',
        },
        {
          name: 'Beebom crafting recipes',
          url: 'https://beebom.com/99-nights-in-the-forest-crafting-recipes/',
        },
      ],
    },
    {
      date: '2026-07-12',
      type: 'code-check',
      title: 'July 12 partial source-check review',
      summary:
        'PC Gamer confirmed the tracked active code terms again. Other sources were blocked or unavailable in the command-line pass, so public rewards and status labels stayed unchanged.',
      details: [
        'forestwakesup26 and afterparty were both found on PC Gamer during the July 12 source check.',
        'PCGamesN and Fandom returned HTTP 403, GamesRadar could not be fetched, and the Roblox Games API returned HTTP 403 in this pass.',
        'happyhalloween appeared in PC Gamer source text, so its expired label still requires human review before any change.',
        'No code reward, code status, Roblox stat, guide fact, tier claim, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-07-09',
      type: 'page-build',
      title: 'July 9 Pelt Trader decision guide pass',
      summary:
        'Quest Codes added a Pelt Trader page to answer the connected Wolf Pelt, Medkit, Bandage, and trader route decisions.',
      details: [
        'The new page keeps this route decision separate from the broader codes and survival guides.',
        'Wolf Pelt, Medkit, Bandage, and Pelt Trader claims are separated so a Medkit search does not become an unsupported trader-reward claim.',
        'The page links back to Bandages, Crafting, Survival Guide, Map, Missing Kids, and Stronghold for route planning.',
        'No trader drop rate, hidden trader refresh rule, guaranteed Medkit trade, or invented reward table was added from this pass.',
      ],
      sources: [
        {
          name: 'Fandom Pelt Trader',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Pelt_Trader',
        },
        {
          name: 'Fandom Wolf Pelt',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Wolf_Pelt',
        },
        {
          name: 'Fandom Medkit',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Medkit',
        },
        {
          name: 'PC Gamer bandage guide',
          url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-bandages/',
        },
      ],
    },
    {
      date: '2026-07-09',
      type: 'guide-data-pass',
      title: 'July 9 crafting, gems, and Stronghold source-review pass',
      summary:
        'Quest Codes rechecked the stale high-priority Crafting, Gems, and Stronghold pages, refreshed confirmed source dates, and made disputed crafting material counts explicit instead of forcing one number.',
      details: [
        'Crafting sources still confirmed the core bench, route, bandage, and late-game craft structure, but Farm Plot and Log Wall material counts differed across current source trails.',
        'The Crafting page now shows the Farm Plot and Log Wall material disagreement directly so players can verify the in-game prompt before spending wood.',
        'Gems kept PC Gamer and GamesRadar as the current code-reward source trail, removed an unconfirmed active-code source from that method, and added a conservative gameplay-route section backed by Fandom Diamonds and Stronghold sources.',
        'Stronghold kept the same high-risk route guidance after rechecking Fandom Stronghold/Cultist/Diamonds and PC Gamer class context.',
        'No invented reward amount, hidden drop rate, hourly farm rate, class tier claim, or patch-note claim was added from this pass.',
      ],
      sources: [
        {
          name: 'Fandom Crafting',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Crafting',
        },
        {
          name: 'GamesRadar crafting recipes',
          url: 'https://www.gamesradar.com/games/simulation/99-nights-in-the-forest-crafting-recipes-perks-bench-upgrade/',
        },
        {
          name: 'Beebom crafting recipes',
          url: 'https://beebom.com/99-nights-in-the-forest-crafting-recipes/',
        },
        {
          name: 'Fandom Diamonds',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Diamonds',
        },
        {
          name: 'Fandom Cultist Stronghold',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Cultist_Stronghold',
        },
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-07-08',
      type: 'code-check',
      title: 'July 8 reviewed source-check pass',
      summary:
        'Quest Codes reviewed the latest admin source-check snapshot. PC Gamer and GamesRadar confirmed the tracked active code terms, PCGamesN confirmed afterparty only, and the Roblox Games API confirmed public metadata.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the July 8 admin source check.',
        'PCGamesN returned HTTP 200 and matched afterparty, but did not confirm forestwakesup26 in that pass.',
        'Fandom Codes Wiki returned HTTP 403, so it remains a manual review flag.',
        'happyhalloween and yay fishing appeared in source text again, so code status labels still need manual review before any visible status change.',
        'Roblox Games API confirmed public metadata with an updated timestamp of 2026-07-04 and 343,531 playing at check time.',
        'No code reward, code status, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
        {
          name: 'Roblox Games API',
          url: 'https://games.roblox.com/v1/games?universeIds=7326934954',
        },
      ],
    },
    {
      date: '2026-07-04',
      type: 'code-check',
      title: 'July 4 partial source-check review',
      summary:
        'Quest Codes reran the daily code source-check workflow. PC Gamer confirmed the tracked active code terms, while PCGamesN, GamesRadar, Fandom, and Roblox metadata were not confirmed by the command-line check.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer during the July 4 source check.',
        'PCGamesN, Fandom Codes Wiki, and the Roblox Games API returned HTTP 403 in this pass.',
        'GamesRadar returned a command-line fetch failure in this pass, so its July 3 confirmation remains the latest stored GamesRadar source check.',
        'happyhalloween appeared in source text again, so code status labels still need manual review before any visible status change.',
        'No code reward, code status, Roblox stat, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-07-03',
      type: 'code-check',
      title: 'July 3 partial source-check review',
      summary:
        'Quest Codes reran the daily code source-check workflow. PC Gamer and GamesRadar confirmed the tracked active code terms, while PCGamesN, Fandom, and Roblox metadata were blocked in the command-line check.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the July 3 source check.',
        'PCGamesN, Fandom Codes Wiki, and the Roblox Games API returned HTTP 403 in this pass, so they remain manual review flags.',
        'happyhalloween appeared in source text again, so code status labels still need manual review before any visible status change.',
        'No code reward, code status, Roblox stat, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-07-02',
      type: 'code-check',
      title: 'July 2 reviewed source-check pass',
      summary:
        'Quest Codes reran the daily code source-check workflow. PC Gamer and GamesRadar confirmed both tracked active code terms, PCGamesN confirmed afterparty only, and the Roblox Games API confirmed public game metadata.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the July 2 source check.',
        'PCGamesN returned HTTP 200 and matched afterparty, but did not confirm forestwakesup26 in this command-line pass.',
        'Fandom Codes Wiki returned HTTP 403, so it remains a manual review flag.',
        'happyhalloween and yay fishing appeared in source text again, so code status labels still need manual review before any visible status change.',
        'Roblox Games API confirmed the game metadata check with an updated timestamp of 2026-07-01, 393,516 playing, 27,834,841,022 visits, and 8,438,845 favorites at check time.',
        'No code reward, code status, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
        {
          name: 'Roblox Games API',
          url: 'https://games.roblox.com/v1/games?universeIds=7326934954',
        },
      ],
    },
    {
      date: '2026-07-01',
      type: 'code-check',
      title: 'July 1 partial source-check review',
      summary:
        'Quest Codes reran the daily code source-check workflow. PC Gamer and GamesRadar confirmed the tracked active code terms, while PCGamesN, Fandom, and Roblox metadata were blocked or unconfirmed by the command-line check.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the July 1 source check.',
        'PCGamesN, Fandom Codes Wiki, and the Roblox Games API returned HTTP 403 in this pass, so they remain manual review flags.',
        'happyhalloween appeared in source text again, so code status labels still need manual review before any visible status change.',
        'No code reward, code status, Roblox stat, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-07-01',
      type: 'guide-data-pass',
      title: 'July 1 bandage source-review pass',
      summary:
        'Quest Codes rechecked the Bandages page against PC Gamer and Beebom source trails, then kept the page conservative because Fandom was blocked by the command-line check.',
      details: [
        'PC Gamer still matched the practical bandage route terms around Bandage, Rabbit, Wolf Pelt, Anvil, revive, Medkit, map, campfire, and bandage context.',
        'Beebom still matched Bandage, Anvil, and Wolf terminology for the Tool Workshop / crafting context.',
        'Fandom Bandage and Fandom Crafting returned HTTP 403 in the command-line check, so their material notes remain auxiliary manual-review sources.',
        'No bandage material amount, cooldown, revive rule, drop rate, class tier, or patch claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer bandage guide',
          url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-bandages/',
        },
        {
          name: 'PC Gamer revive guide',
          url: 'https://www.pcgamer.com/games/survival-crafting/roblox-99-nights-in-the-forest-revive/',
        },
        {
          name: 'PC Gamer survival tips',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
        },
        {
          name: 'Beebom crafting recipes',
          url: 'https://beebom.com/99-nights-in-the-forest-crafting-recipes/',
        },
      ],
    },
    {
      date: '2026-06-30',
      type: 'code-check',
      title: 'June 30 partial source-check review',
      summary:
        'Quest Codes reran the source-check workflow. PC Gamer and GamesRadar confirmed the tracked active code terms, while PCGamesN, Fandom, and Roblox metadata were not confirmed by the command-line check.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 30 source check.',
        'PCGamesN, Fandom Codes Wiki, and the Roblox Games API returned blocked or unconfirmed results in this pass, so they remain manual review flags.',
        'happyhalloween appeared in a source response, so status labels still need manual review before any visible code status change.',
        'No code reward, code status, Roblox stat, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-06-30',
      type: 'guide-data-pass',
      title: 'June 30 guide source-review pass',
      summary:
        'Quest Codes rechecked the existing PC Gamer source trail for the Classes, Animals, and Survival Guide pages without changing guide facts or tier claims.',
      details: [
        'Classes and Class Tier List keep the same tier and recommendation data; only the source-reviewed date was refreshed.',
        'Animals keeps the same food, flute, biome, and class-direction notes after checking the existing taming source trail.',
        'Survival Guide keeps the same campfire, building, upgrade, navigation, defense, bandage, and flute advice after checking the existing tips source trail.',
        'No new class tier, animal requirement, hidden formula, crafting cost, drop rate, or patch claim was added from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer classes guide',
          url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
        },
        {
          name: 'PC Gamer animal taming guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/',
        },
        {
          name: 'PC Gamer tips guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
        },
      ],
    },
    {
      date: '2026-06-29',
      type: 'code-check',
      title: 'June 29 reviewed source-check pass',
      summary:
        'Quest Codes reviewed the latest source-check snapshot. PC Gamer and GamesRadar confirmed the tracked active code terms, PCGamesN confirmed afterparty only, and the Roblox Games API confirmed the public game metadata.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 29 source check.',
        'PCGamesN returned HTTP 200 and matched afterparty, but did not confirm forestwakesup26 in this pass.',
        'Fandom Codes Wiki returned HTTP 403, so it remains in the manual review queue.',
        'happyhalloween and yay fishing still require status-label review before any visible status change.',
        'Roblox Games API confirmed the game metadata check with an updated timestamp of 2026-06-27 and 492,705 playing at check time.',
        'No code reward, code status, drop rate, tier claim, crafting fact, or patch-note claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
        {
          name: 'Official Roblox game page',
          url: 'https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest',
        },
      ],
    },
    {
      date: '2026-06-24',
      type: 'code-check',
      title: 'June 24 partial source-check review',
      summary:
        'Quest Codes reran the lightweight source-check workflow. PC Gamer and GamesRadar confirmed the tracked active code terms, so the active source dates were refreshed without changing rewards or status labels.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 24 source check.',
        'PCGamesN, Fandom, and the Roblox Games API returned 403, so those sources stay in the manual review queue.',
        'happyhalloween also appeared in a source response, so status labels still need manual review before any visible code status changes.',
        'No code status, reward amount, Roblox stat, drop rate, or patch claim was changed from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-06-23',
      type: 'code-check',
      title: 'June 23 lightweight source check',
      summary:
        'Quest Codes reran the code source-check workflow and confirmed that PC Gamer and GamesRadar still include the tracked active code terms.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the June 23 source check.',
        'PCGamesN, Fandom, and the Roblox Games API returned 403 from the command-line check, so they remain manual review flags rather than automatic update signals.',
        'yay fishing stays marked as special because source status labels still require manual review.',
        'No new code, reward amount, drop rate, Roblox stat, or patch claim was added from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-06-22',
      type: 'code-check',
      title: 'June 22 source-check pass',
      summary:
        'Quest Codes ran the source-check workflow and verified that PC Gamer and GamesRadar still include the active code terms.',
      details: [
        'forestwakesup26 and afterparty were found on PC Gamer and GamesRadar during the automated source check.',
        'PCGamesN, Fandom, and the Roblox Games API returned 403 from the command-line check, so those sources remain review flags rather than automatic update signals.',
        'yay fishing stays marked as special because source status labels still require manual review.',
        'No new code, reward amount, drop rate, or patch claim was added from this pass.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
      ],
    },
    {
      date: '2026-06-21',
      type: 'code-check',
      title: 'June 21 code source refresh',
      summary:
        'Quest Codes refreshed the 99 Nights in the Forest code source trail and kept yay fishing marked as special because sources still disagree.',
      details: [
        'forestwakesup26 is now backed by PC Gamer, GamesRadar, and the community wiki in the source table.',
        'afterparty remains active across PC Gamer, PCGamesN, GamesRadar, and the community wiki.',
        'yay fishing remains special: PC Gamer, GamesRadar, and the community wiki list it as an in-game activation, while PCGamesN still lists it as expired.',
        'happyhalloween remains expired and is kept only for history.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
        {
          name: 'GamesRadar codes page',
          url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
        },
        {
          name: 'Fandom codes page',
          url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
        },
      ],
    },
    {
      date: '2026-06-20',
      type: 'code-check',
      title: 'June code source check',
      summary:
        'Quest Codes checked the current 99 Nights in the Forest code lists and separated active, expired, and conflicting code entries.',
      details: [
        'forestwakesup26 and afterparty are treated as active based on checked source pages.',
        'yay fishing remains marked as special because sources disagree on the redemption path and status.',
        'happyhalloween is kept in expired history to reduce repeat testing.',
      ],
      sources: [
        {
          name: 'PC Gamer codes page',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
        },
        {
          name: 'PCGamesN codes page',
          url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
        },
      ],
    },
    {
      date: '2026-06-20',
      type: 'guide-data-pass',
      title: 'Class, animals, and survival guide pass',
      summary:
        'The first 99 Nights guide cluster was expanded beyond codes into classes, class tier list, animals, and survival guidance.',
      details: [
        'The class and tier-list pages avoid invented stats and cite the checked guide source.',
        'The animals page separates food requirements, flute requirements, and biome notes.',
        'The survival guide focuses on campfire priorities, early looting, tools, and common mistakes.',
      ],
      sources: [
        {
          name: 'PC Gamer 99 Nights classes guide',
          url: 'https://www.pcgamer.com/roblox/99-nights-in-the-forest-classes/',
        },
        {
          name: 'PC Gamer animal taming guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-animal-taming/',
        },
        {
          name: 'PC Gamer tips guide',
          url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-tips/',
        },
      ],
    },
    {
      date: '2026-06-16',
      type: 'roblox-page-update',
      title: 'Roblox game page metadata update',
      summary:
        'The stored Roblox game data records 2026-06-16 as the latest checked game page update date.',
      details: [
        'Quest Codes records this as metadata only, not as a patch-note summary.',
        'Patch details are not inferred unless a source provides the actual update notes.',
        'The game page remains the source for Roblox place ID, universe ID, developer, and current public stats.',
      ],
      sources: [
        {
          name: 'Official Roblox game page',
          url: 'https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest',
        },
      ],
    },
  ] satisfies UpdateEntry[],
};
