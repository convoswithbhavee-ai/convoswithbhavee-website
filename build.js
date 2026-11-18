const fs=require('node:fs');
const path=require('node:path');
const out='dist';
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of ['index.html','styles.css','script.js','cms-content.js'])fs.copyFileSync(f,path.join(out,f));
if(fs.existsSync('public'))fs.cpSync('public',out,{recursive:true,force:true});
if(fs.existsSync('content'))fs.cpSync('content',path.join(out,'content'),{recursive:true,force:true});
const epDir='content/episodes';const episodes=[];
if(fs.existsSync(epDir))for(const name of fs.readdirSync(epDir).filter(f=>f.endsWith('.json')).sort()){
 try{const data=JSON.parse(fs.readFileSync(path.join(epDir,name),'utf8')); if(data&&typeof data==='object'&&!Array.isArray(data)) episodes.push(data);}
 catch(e){console.warn('Skipping invalid episode JSON',name,e.message);}
}
fs.mkdirSync(path.join(out,'content'),{recursive:true});
fs.writeFileSync(path.join(out,'content','episodes-index.json'),JSON.stringify(episodes,null,2));
console.log('Website ready in dist; episodes:',episodes.length);
