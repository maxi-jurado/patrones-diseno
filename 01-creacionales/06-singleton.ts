import { COLORS } from '../helpers/colors.ts';
/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {

    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if ( !DragonBalls.instance ) {
            DragonBalls.instance = new DragonBalls();
            console.log('%cLas pelotas del dragon han sido creadas', COLORS.green);
        }

        return DragonBalls.instance;
    }

    collectBall(): void {
        if ( this.ballsCollected < 7 ) {
            this.ballsCollected++;
            console.log(`Pelota recolectada. Total de esferas ${this.ballsCollected}`);
            return;
        }

        console.log('Ya han sido recolectadas las 7 esferas del Dragon! Invoca a Sheng Long');
    }

    summonShengLong(): void {
        if ( this.ballsCollected === 7 ) {
            console.log('Sheng Long ha sido invocado, pide tu deseo...');
            this.ballsCollected = 0;
            return;
        }

        console.log(`Aun faltan ${ 7 - this.ballsCollected } pelotas para invocar Sheng Long`);
    }

}

function main() {

    const gokuDragonBalls = DragonBalls.getInstance();
    
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    
    gokuDragonBalls.summonShengLong();
    
    const vegetaDragonBalls = DragonBalls.getInstance();
    
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    
    gokuDragonBalls.summonShengLong();
    
    vegetaDragonBalls.summonShengLong();

}

main();
