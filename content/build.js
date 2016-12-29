yaml = require('js-yaml')
fs   = require('fs')

try {
  var list = fs.readdirSync(__dirname)
  var yamls = list.filter(function(f) {
    var extension = f.split('.')
    if(extension[extension.length - 1].toLowerCase() == 'yaml') return true
    return false
  })
  var data = { menu: [] }
  for(var i=0; i<yamls.length; i++) {
    var json = yaml.safeLoad(fs.readFileSync(__dirname+'/'+yamls[i], 'utf8'))
    data.menu.push(json)
  }
  fs.writeFileSync(__dirname+'/menudata.json', JSON.stringify(data, null, 2))
} catch (e) {
  console.log(e)
}
