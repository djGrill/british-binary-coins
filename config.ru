use Rack::Static,
    urls: ["/lib", "/javascripts", "/css"],
    root: "public"

map "/" do
    run lambda { |env|
        [
            200,
        {
            'Content-Type'  => 'text/html',
            'Cache-Control' => 'public, max-age=86400'
        },
            File.open('public/index.html', File::RDONLY)
        ]
    }
end
