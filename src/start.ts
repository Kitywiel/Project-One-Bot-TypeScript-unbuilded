// import * as fs from 'fs';
// import * as path from 'path';
// import inquirer from 'inquirer';
// import { exec } from 'child_process';

// const botsPath = path.join(__dirname, 'Bots');

// /**
//  * Start a bot in its own CMD window.
//  */
// function startBot(botName: string): void {
//     const botPath = path.resolve(
//         botsPath,
//         botName,
//         'index.js'
//     );

//     if (!fs.existsSync(botPath)) {
//         console.error(`[ERROR]> Bot entry point not found: ${botPath}`);
//         return;
//     }

//     console.log(`[SYSTEM]> Starting bot: ${botName}`);

//     const command = `start "${botName}" cmd.exe /k node "${botPath}"`;

//     exec(command, (error) => {
//         if (error) {
//             console.error(`[ERROR]> Failed to start ${botName}:`, error.message);
//         }
//     });
// }

// /**
//  * Find all valid bot folders.
//  */
// function findBots(): string[] {
//     if (!fs.existsSync(botsPath)) {
//         console.error(`[ERROR]> Bots directory not found: ${botsPath}`);
//         return [];
//     }

//     return fs.readdirSync(botsPath, { withFileTypes: true })
//         .filter((entry) => entry.isDirectory())
//         .filter((entry) => {
//             const indexPath = path.join(
//                 botsPath,
//                 entry.name,
//                 'index.js'
//             );

//             return fs.existsSync(indexPath);
//         })
//         .map((entry) => entry.name)
//         .sort();
// }

// /**
//  * Main launcher.
//  */
// async function main(): Promise<void> {
//     console.clear();

//     console.log('========================================');
//     console.log('          PROJECT ONE BOT');
//     console.log('             BOT LAUNCHER');
//     console.log('========================================');
//     console.log();

//     const bots = findBots();

//     if (bots.length === 0) {
//         console.log('[ERROR]> No bots found.');
//         console.log(`[SYSTEM]> Looking in: ${botsPath}`);
//         process.exit(1);
//     }

//     console.log(`[SYSTEM]> Found ${bots.length} bot(s).`);
//     console.log();

//     const answer = await inquirer.prompt([
//         {
//             type: 'select',
//             name: 'bot',
//             message: 'Select a bot to start:',
//             choices: bots
//         }
//     ]);

//     const selectedBot = answer.bot as string;

//     startBot(selectedBot);

//     console.log();
//     console.log(`[SYSTEM]> (${selectedBot}) has been launched.`);
//     console.log('[SYSTEM]> The bot is running in a separate CMD window.');
//     main(); // Call main again to allow launching another bot
// }

// main().catch((error) => {
//     console.error('[ERROR]> Launcher failed:', error);
//     process.exit(1);
// });

import * as fs from 'fs';
import * as path from 'path';
import * as net from 'net';
import { exec } from 'child_process';
import inquirer from 'inquirer';

const botsPath = path.join(__dirname, 'Bots');

// Change this to whatever port your Web Server uses.
const WEB_SERVER_PORT = 3000;
const WEB_SERVER_HOST = '127.0.0.1';


/**
 * Check whether something is listening on the Web Server port.
 */
function isWebServerRunning(): Promise<boolean> {
    return new Promise((resolve) => {
        const socket = new net.Socket();

        socket.setTimeout(500);

        socket.once('connect', () => {
            socket.destroy();
            resolve(true);
        });

        socket.once('timeout', () => {
            socket.destroy();
            resolve(false);
        });

        socket.once('error', () => {
            socket.destroy();
            resolve(false);
        });

        socket.connect(
            WEB_SERVER_PORT,
            WEB_SERVER_HOST
        );
    });
}


/**
 * Start the shared Web Server in its own CMD window.
 */
function startWebServer(): void {
    const serverPath = path.resolve(
        __dirname,
        'Web',
        'Server.js'
    );

    if (!fs.existsSync(serverPath)) {
        console.error(
            `[ERROR]> Web Server not found: ${serverPath}`
        );
        return;
    }

    console.log('[SYSTEM]> Starting Web Server...');
    console.log(`[SYSTEM]> Port: ${WEB_SERVER_PORT}`);

    const command =
        `start "Project One Bot - Web Server" ` +
        `cmd.exe /k node "${serverPath}"`;

    exec(command, (error) => {
        if (error) {
            console.error(
                `[ERROR]> Failed to start Web Server: ${error.message}`
            );
        }
    });
}


/**
 * Start a bot in its own CMD window.
 */
function startBot(botName: string): void {
    const botPath = path.resolve(
        botsPath,
        botName,
        'index.js'
    );

    if (!fs.existsSync(botPath)) {
        console.error(
            `[ERROR]> Bot entry point not found: ${botPath}`
        );
        return;
    }

    console.log(`[SYSTEM]> Starting bot: ${botName}`);

    const command =
        `start "${botName}" ` +
        `cmd.exe /k node "${botPath}"`;

    exec(command, (error) => {
        if (error) {
            console.error(
                `[ERROR]> Failed to start ${botName}: ${error.message}`
            );
        }
    });
}


/**
 * Find all valid bots.
 */
function findBots(): string[] {
    if (!fs.existsSync(botsPath)) {
        console.error(
            `[ERROR]> Bots directory not found: ${botsPath}`
        );

        return [];
    }

    return fs.readdirSync(
        botsPath,
        { withFileTypes: true }
    )
        .filter((entry) => entry.isDirectory())
        .filter((entry) => {
            const indexPath = path.join(
                botsPath,
                entry.name,
                'index.js'
            );

            return fs.existsSync(indexPath);
        })
        .map((entry) => entry.name)
        .sort();
}


/**
 * Select a bot.
 */
async function selectBot(
    bots: string[]
): Promise<string> {
    const answer = await inquirer.prompt([
        {
            type: 'select',
            name: 'bot',
            message: 'Select a bot to start:',
            choices: bots
        }
    ]);

    return answer.bot as string;
}


/**
 * Main launcher.
 */
async function main(): Promise<void> {
    console.clear();

    console.log('========================================');
    console.log('          PROJECT ONE BOT');
    console.log('             BOT LAUNCHER');
    console.log('========================================');
    console.log();

    /*
     * Check the shared Web Server.
     *
     * This ONLY determines whether the Web Server
     * needs to be started.
     *
     * It does NOT prevent another bot from starting.
     */
    const serverRunning = await isWebServerRunning();

    if (serverRunning) {
        console.log(
            `[SYSTEM]> Web Server already running on ${WEB_SERVER_PORT}.`
        );
    } else {
        console.log(
            '[SYSTEM]> Web Server is not running.'
        );

        startWebServer();

        // Give the server a moment to start listening.
        await new Promise((resolve) =>
            setTimeout(resolve, 500)
        );
    }

    console.log();

    /*
     * Find bots.
     */
    const bots = findBots();

    if (bots.length === 0) {
        console.error(
            '[ERROR]> No bots found.'
        );

        process.exit(1);
    }

    console.log(
        `[SYSTEM]> Found ${bots.length} bot(s).`
    );

    console.log();

    /*
     * Select and start a bot.
     */
    const selectedBot = await selectBot(bots);

    console.log();
    console.log(
        `[SYSTEM]> Starting bot: ${selectedBot}`
    );

    startBot(selectedBot);

    console.log();
    console.log(
        `[SYSTEM]> ${selectedBot} launched successfully.`
    );

    console.log(
        '[SYSTEM]> This launcher can now be closed.'
    );
}


main().catch((error) => {
    console.error(
        '[ERROR]> Launcher failed:',
        error
    );

    process.exit(1);
});