set :haml, { :ugly => false, :format => :html5 }

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

activate :livereload

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash, :ignore => []
  activate :relative_assets
end
