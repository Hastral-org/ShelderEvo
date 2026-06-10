const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const CONFIG = {
    // Points directly to your unzipped NW.js SDK downloads folder
    nwjcPath: `C:\\Users\\Marika\\Downloads\\nwjs-sdk-v0.105.0-win-x64\\nwjc.exe`, 
    targetDir: path.join(__dirname, 'js', 'plugins', 'app')
};

// Enforces your strict engine load-order sequence
const EXPLICIT_LOAD_ORDER = [
    "cli.js",
    "CBE.js",
    "PDL.js",
    "handler_io.js",
    "handler.js",
    "metacore.js",
    "metabrain.js",
    "creature.js",
    "evolution.js",
    "battlecore.js",
    "scenes.js",
    "sheldex.js",
    "MAGPIE_casper.js",
    "MAGPIE_casper_gameInfo.js",
    "ShelderEvo_CGC.js",
    "ShelderEvo_changeEquipCGC.js"
];

function buildPipeline() {
    if (!fs.existsSync(CONFIG.nwjcPath)) {
        console.error(`[-] Build Error: nwjc.exe was not found at:\n    ${CONFIG.nwjcPath}`);
        process.exit(1);
    }

    console.log(`[*] Starting binary compilation loop for ShelderEvo...\n`);
    const manifest = [];

    EXPLICIT_LOAD_ORDER.forEach(fileName => {
        const sourceFile = path.join(CONFIG.targetDir, fileName);
        const baseName = path.basename(fileName, '.js');
        const binaryName = `${baseName}.bin`;
        const outputFile = path.join(CONFIG.targetDir, binaryName);

        if (fs.existsSync(sourceFile)) {
            console.log(`[+] Compiling: ${fileName} -> ${binaryName}`);
            try {
                // Command syntax to fuse code into raw V8 snapshot binaries
                execSync(`"${CONFIG.nwjcPath}" "${sourceFile}" "${outputFile}"`);
                manifest.push(binaryName);
                
                // Remove source code so it can't be viewed in production
                fs.unlinkSync(sourceFile);
            } catch (err) {
                console.error(`[-] Compilation crash on ${fileName}:`, err.message);
                process.exit(1);
            }
        } else {
            console.warn(`[!] Warning: ${fileName} missing from target directory. Skipping.`);
        }
    });

    // Write sequence array to file so the client engine knows how to load them
    const manifestPath = path.join(CONFIG.targetDir, 'load-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\n[+] Success! Created manifest containing ${manifest.length} files.`);
}

buildPipeline();
