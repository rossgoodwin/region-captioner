import os
import json
from PIL import Image

img_paths = list()

size = 700,700

for fn in os.listdir('img'):
    fp = './img/%s' % fn


    outfile = './img/700px_%s' % fn
    if fp != outfile:
        print fn
        try:
            im = Image.open(fp)
            im.thumbnail(size, Image.ANTIALIAS)
            im.save(outfile, "JPEG")
            img_paths.append(outfile)
        except IOError:
            print "cannot create thumbnail for '%s'" % infile

with open('data/img_paths.json', 'w') as outfile:
    json.dump(img_paths, outfile)
