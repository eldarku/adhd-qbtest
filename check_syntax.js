const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const m = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
m.forEach((s,i) => {
  if(s.includes('type="text/javascript"')) {
    const code = s.replace(/<\/?script[^>]*>/g,'');
    try {
      new Function(code);
      console.log('Script block '+i+': OK');
    } catch(e) {
      console.log('Script block '+i+': ERROR - '+e.message);
    }
  }
});
