require 'json'
require 'pry'

def add_type(json)
  if json["children"]
    json["type"] = "menu"
  else
    json["type"] = "web"
  end
  return json
end

def has_children(jsons)
  return unless jsons["children"]
  jsons["children"].each do |json|
    add_type(json)
    has_children(json)
  end
  jsons["children"]
end

json_file_path = 'dist/data.json'

# 読み込んで
json_data = open(json_file_path) do |io|
  JSON.load(io)
end

# 更新して
json_data

json_data.each do |json|
  add_type(json)
  has_children(json)
end

# 保存する
open(json_file_path, 'w') do |io|
  JSON.dump(json_data, io)
end