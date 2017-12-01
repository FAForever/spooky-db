unitdb [![Build Status](https://travis-ci.org/spooky/unitdb.svg?branch=master)](https://travis-ci.org/spooky/unitdb)
======

Forged Alliance Forever unit database remake. Uses Angular.js + some hack scripts to extract the data from unit blueprint files.

You can see the app [here](http://spooky.github.io/unitdb).

images
------
cb260 - http://cb260.deviantart.com/

fonts
-----
Zeroes Three - http://www.larabiefonts.com/  
Muli - http://www.newtypography.co.uk/


license
-------
http://www.wtfpl.net/


contributing
------------
All contributions are welcome, though I can't guarantee to pull all of them in. If you do want to contribute,
please create a separate branch and a pull request for that. It'll be a bit easier for me to keep the repo tidy that way.  
Thanks in advance.

Running the Application on MAC OS X
-----------------------------------
Necessary packages that need to be installed beforehand:
    
> brew install pkgconfig
> brew install pixman
> brew install libjpeg
> brew install giflib 
> brew install cairo
> brew install graphicsmagick
> npm install
> bower install - will need npm V4 - otherwise issue `Cannot find module 'internal/fs'`
> grunt serve

View the program in dist directory.

Running with Docker (on Linux)
------------------------------

Prepare
```shell
git clone "https://github.com/spooky/unitdb.git"
cd unitdb
docker build -t unitdb-server .
```
Starting the server
```shell
docker run --network=host -v $(pwd):/unitdb -it unitdb-server
```

Open http://localhost:9000
