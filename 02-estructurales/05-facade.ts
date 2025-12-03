/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from '../helpers/colors.ts';

class Projector {
    turnOn() {
        console.log('Proyector encendido');
    }
    
    turnOff() {
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on() {
        console.log('Sistema de sonido encendido');
    }
    
    off() {
        console.log('Sistema de sonido apagado');
    }
}

class VideoPlayer {
    on() {
        console.log('Reproductor de video encendido');
    }
    
    play( movie: string ) {
        console.log(`Reproductor de video reproduciendo %c${movie}`, COLORS.blue);
    }

    stop() {
        console.log('Reproductor de video detenido');
    }

    off() {
        console.log('Reproductor de video apagado');
    }
}

class PopcornMaker {
    poppingPopcorn() {
        console.log('Haciendo palomitas');
    }

    turnOffPoppingPopcorn() {
        console.log('Deteniendo las palomitas');
    }
}

interface HomeTheaterFacadeOptions {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {

    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popcornMaker: PopcornMaker;

    constructor({
        projector,
        soundSystem,
        videoPlayer,
        popcornMaker
    }: HomeTheaterFacadeOptions ) {
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker;
    }

    watchMovie( movie: string ): void {
        console.log(`Preparando para ver el movie %c${movie}`, COLORS.blue);
        this.popcornMaker.poppingPopcorn();
        this.projector.turnOn();
        this.soundSystem.on();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);

        console.log('%cDisfrute la pelicula', COLORS.blue);
    }

    endWatchingMovie(): void {
        console.log('%cTerminando de ver la pelicula', COLORS.blue);
        this.popcornMaker.turnOffPoppingPopcorn();
        this.projector.turnOff();
        this.soundSystem.off();
        this.videoPlayer.stop();
        this.videoPlayer.off();

        console.log('%cSistema apagado', COLORS.blue);
    }
}

function main () {

    const homeTheaterFacade = new HomeTheaterFacade({
        projector: new Projector(),
        soundSystem: new SoundSystem(),
        videoPlayer: new VideoPlayer(),
        popcornMaker: new PopcornMaker()
    });
    
    homeTheaterFacade.watchMovie('Pulp Fiction');

    homeTheaterFacade.endWatchingMovie();

}

main();
