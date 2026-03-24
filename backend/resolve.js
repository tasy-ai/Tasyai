const dns = require('dns');
const fs = require('fs');
dns.setServers(['8.8.8.8']);

const domain = '_mongodb._tcp.tasyai.qjtfd8g.mongodb.net';
const txtDomain = 'tasyai.qjtfd8g.mongodb.net';

dns.resolveSrv(domain, (err, addresses) => {
    const out = { srv: addresses, err: err ? err.message : null };
    
    dns.resolveTxt(txtDomain, (err2, txts) => {
        out.txt = txts;
        out.err2 = err2 ? err2.message : null;
        fs.writeFileSync('resolve_out.json', JSON.stringify(out, null, 2));
    });
});
