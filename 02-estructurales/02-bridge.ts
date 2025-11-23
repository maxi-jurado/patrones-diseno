/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts';

interface Abililty {
    use(): void;
}

class SwordAttack implements Abililty {
    use(): void {
        console.log("Ataca con %cespada ferozmente", COLORS.red);
    }
}

class AxeAttack implements Abililty {
    use(): void {
        console.log("Ataca con %chacha brutalmente", COLORS.yellow);
    }
}

class MagicSpell implements Abililty {
    use(): void {
        console.log("Ataca con %chechizo mágico", COLORS.blue);
    }
}

class FireballSpell implements Abililty {
    use(): void {
        console.log("Ataca con %cbola de fuego", COLORS.orange);
    }
}

abstract class Character {
    protected ability: Abililty;
    
    constructor( ability: Abililty ) {
        this.ability = ability;
    }

    setAbility( ability: Abililty ): void {
        this.ability = ability;
    }

    abstract performAbility(): void;
}

class Warrior extends Character {
    override performAbility(): void {
        console.log("\nEl guerrero esta listo para luchar");
        this.ability.use();
    }
}

class Mage extends Character {
    override performAbility(): void {
        console.log("\nEl mago esta listo para castigar");
        this.ability.use();
    }
}

function main() {

    const warrior = new Warrior(new SwordAttack());
    warrior.performAbility();

    // const axeAttack = new AxeAttack();
    // warrior.setAbility(axeAttack);
    // warrior.performAbility();

    warrior.setAbility(new AxeAttack());
    warrior.performAbility();
    

    const mage = new Mage( new MagicSpell() );
    mage.performAbility();

    mage.setAbility(new FireballSpell());
    mage.performAbility();

}

main();
