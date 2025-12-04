/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from '../helpers/colors.ts';

interface Location {
    display( coordinates: { x: number, y: number }): void;
}

// Flyweight
class LocationIcon implements Location {
    private type: string;
    private iconImg: string;

    constructor( type: string, iconImage: string ) {
        this.type = type;
        this.iconImg = iconImage;
    }

    display( coordinates: { x: number, y: number } ) {
        console.log(
            `Coords: ${ this.type } en ${ coordinates.x }, ${ coordinates.y } con ícono %c[${ this.iconImg }]`,
            COLORS.green
        )
    }
}

// Flyweight Factory
class LocationFactory {
    private icons: Record< string, LocationIcon> = {};

    getLocationIcon( type: string ) {
        if ( !this.icons[type] ) {
            console.log(`%cCreando icono para ${ type }`, COLORS.red);
            const imgIcon = `imagen_de_${type.toLocaleLowerCase()}.png`;
            this.icons[type] = new LocationIcon(type, imgIcon);
        }

        return this.icons[type];
    }
}

class MapLocation {
    private coordinates: { x: number, y: number };
    private icon: LocationIcon;

    constructor(
        x: number,
        y: number,
        icon: LocationIcon
    ) {
        this.coordinates = { x, y };
        this.icon = icon;
    }

    display() {
        this.icon.display(this.coordinates);
    }
}

function main() {
    const factory = new LocationFactory();

    const locations = [
        new MapLocation(10, 20, factory.getLocationIcon('hospital')),
        new MapLocation(30, 40, factory.getLocationIcon('hospital')),
        new MapLocation(50, 60, factory.getLocationIcon('hospital')),

        new MapLocation(20, 80, factory.getLocationIcon('parque')),
        new MapLocation(60, 100, factory.getLocationIcon('parque')),
        
        new MapLocation(35, 45, factory.getLocationIcon('escuela')),
    ];

    locations.forEach(location => location.display());

}

main()

