/* How your human fails to abduct an alien!
 *    Variance in typescript.
 *
 * A < B : A is subtype of B
 *          (X is subtype of X!)
 * A = B : A is type B
 * F<A>  : Type of A after F
 *            (like an argument, or return type, or property type)
 *
 * Variance:
 *   Invariant  | A = B => F<A> = F<B>
 *   Co         | A < B => F<A> < F<B>
 *   Contra     | A < B => F<B> < F<A>
 *   Variant    | A < B => F<A> < F<B> OR  F<B> < F<A>
 *   Bivariant  | A < B => F<A> < F<B> AND F<B> < F<A>
 */

type Creature = { _creature_brand: any }
type Alien = {
  _alien_brand: any
  abduct: (human: Human) => void
} & Creature
type Earthling = { _earthling_brand: any } & Creature
type Human = {
  _human_brand: any
  name: string
} & Earthling

function callbackEarthToEarth(fn: (arg: Earthling) => Earthling) {}

const EarthToEarth = (arg: Earthling): Earthling => null!
const CreatureToCreature = (arg: Creature): Creature => null!
const HumanToHuman = (arg: Human): Human => null!
const HumanToCreature = (arg: Human): Creature => null!
const CreatureToHuman = (arg: Creature): Human => null!

callbackEarthToEarth(EarthToEarth)
callbackEarthToEarth(CreatureToCreature)
callbackEarthToEarth(HumanToHuman)
callbackEarthToEarth(HumanToCreature)
callbackEarthToEarth(CreatureToHuman)
//
const creatures: Creature[] = []
const earthlings: Earthling[] = []
const aliens: Alien[] = [<Alien>{
  _alien_brand: "alien",
  abduct: (h: Human) => console.log(`${h.name} has become green goo!`)
}]
const humans: Human[] = [<Human>{ name: "jonny" }]
//
const isItContra: Human[] = earthlings
const isItCo: Creature[] = humans
isItCo.push(aliens[0])
//
const spaceShip: Creature[] = aliens
spaceShip.push(humans[0])
aliens[1].abduct(humans[1])

