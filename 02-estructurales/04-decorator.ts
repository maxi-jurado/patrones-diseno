/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from '../helpers/colors.ts';

interface INotification {
    send(message: string): void;
}

class BasicNotification implements INotification {
    send( message: string ): void {
        console.log(`%cEnviando notificación básica: %c${message}`, COLORS.blue, COLORS.white);
    }
}

// CLASE DECORADORA
abstract class NotificationDecorator implements INotification {
    protected notification: INotification;

    constructor( notification: INotification ) {
        this.notification = notification;
    }

    send( message: string ): void {
        this.notification.send(message);
    }
}

// CREAR DIFERENTES DECORADORES
class EmailDecorator extends NotificationDecorator {

    private sendMail( message: string ) {
        console.log(`%cEnviando correo electrónico: %c${message}`, COLORS.red, COLORS.white);
    }

    override send( message: string ): void {
        super.send(message);
        this.sendMail(message);
    }
}

class SMSDecorator extends NotificationDecorator {

    private sendSMS( message: string ) {
        console.log(`%cEnviando SMS: %c${message}`, COLORS.green, COLORS.white);
    }

    override send( message: string ): void {
        super.send(message);
        this.sendSMS(message);
    }
}

function main() {

    let notification: INotification = new BasicNotification();

    notification = new EmailDecorator(notification);
    notification = new SMSDecorator(notification);

    notification.send('Alerta de sistema');

}

main();
