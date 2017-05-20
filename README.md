# Dense Image Captioning Interface

(1) Install Python PIP if you don't already have it.

On Mac:

    $ sudo easy_install pip

(2) Install the Python Image Library (PIL)

    $ sudo pip install pillow

(3) Make a new folder in the repo directory called `img`, and put your images into that folder.

(4) Run the Python pre-processing script, which resizes the images in the `img` folder and creates the `img_paths.json` file in the data directory.

    $ python make_img_json.py

(5) Start a simple Python web server on port 8000 (or another port of your choice).

    $ python -m SimpleHTTPServer 8000


(6) Open your browser, and go to localhost at the port you chose, e.g. http://127.0.0.1:8000

(7) Ask Ross if you have any questions about how to use the captioning interface.

