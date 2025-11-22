import { Logger } from "jsr:@deno-library/logger";


// TODO: Implementar el LoggerAdapter
interface ILoggerAdaper {
    file: string;

    writeLog: (msg: string) => void;
    writeWarning: (msg: string) => void;
    writeError: (msg: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdaper {

    public file: string;
    private logger: Logger;

    constructor(file: string) {
        this.file = file;
        this.logger = new Logger();
    }

    writeLog = (msg: string) => {
        this.logger.info(`[${this.file} Log] ${msg}`);
    }

    writeWarning = (msg: string) => {
        this.logger.warn(`[${this.file} Warning] ${msg}`);
    }

    writeError = (msg: string) => {
        this.logger.error(`[${this.file} Error] ${msg}`);
    }
}
